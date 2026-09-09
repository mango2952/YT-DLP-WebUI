#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
YT-DLP WebUI - Portable YouTube Downloader
Flask backend with SSE progress streaming
"""

import os
import re
import sys
import json
import uuid
import time
import queue
import glob
import threading
import subprocess
import socket
import webbrowser
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime
from flask import Flask, render_template, request, jsonify, Response, stream_with_context, send_file

# ── 路径配置 ─────────────────────────────────────────────────────────────────
BASE_DIR   = Path(__file__).parent.resolve()
BIN_DIR    = BASE_DIR / "bin"
YTDLP_EXE  = BIN_DIR / "yt-dlp.exe"
FFMPEG_EXE = BIN_DIR / "ffmpeg.exe"
CONFIG_FILE  = BASE_DIR / "config.json"
HISTORY_FILE = BASE_DIR / "history.json"
DOWNLOADS_DIR = BASE_DIR / "downloads"
LOGS_DIR      = BASE_DIR / "logs"

# ── 默认配置 ──────────────────────────────────────────────────────────────────
DEFAULT_CONFIG = {
    "download_path": str(DOWNLOADS_DIR),
    "proxy": "",
    "max_concurrent": 3,
    "speed_limit": "",
    "language": "zh",
    "port": 8080,
    "cookie_mode": "file",          # "file", "browser", "none"
    "browser_name": "chrome",       # "chrome", "edge", "firefox", "brave", "opera", "vivaldi"
    "cookie_file": "cookies.txt",
    "subtitle_langs": "zh-Hans,zh,en",
    "embed_subtitles": False,
    "write_subtitles": True,
}

# ── 全局状态 ──────────────────────────────────────────────────────────────────
tasks: dict[str, dict] = {}          # task_id -> task info
task_queues: dict[str, queue.Queue] = {}   # task_id -> SSE event queue
tasks_lock = threading.Lock()

# ── Flask 初始化 ──────────────────────────────────────────────────────────────
app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["JSON_AS_ASCII"] = False
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0

@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


# ══════════════════════════════════════════════════════════════════════════════
# 已知错误库（pattern -> {zh, en, type}）
# type: 'network' | 'auth' | 'geo' | 'unavailable' | 'disk' | 'format'
# ══════════════════════════════════════════════════════════════════════════════

KNOWN_ERRORS = [
    # ── 网络类 ──────────────────────────────────────────────────────────────
    {
        "patterns": [r"Unable to connect", r"Connection refused", r"Network is unreachable",
                     r"timed out", r"timeout", r"Failed to establish", r"Max retries exceeded",
                     r"RemoteDisconnected", r"ConnectionResetError"],
        "type": "network",
        "zh": "网络连接失败。请检查网络是否正常，或在设置中配置代理。",
        "en": "Network connection failed. Check your internet connection or configure a proxy in Settings.",
    },
    {
        "patterns": [r"HTTP Error 429", r"Too Many Requests", r"rate.?limit"],
        "type": "network",
        "zh": "请求频率过高（HTTP 429）。请等待几分钟后重试，或配置代理切换 IP。",
        "en": "Too many requests (HTTP 429). Wait a few minutes or use a proxy to change your IP.",
    },
    {
        "patterns": [r"SSL", r"certificate", r"CERTIFICATE_VERIFY_FAILED"],
        "type": "network",
        "zh": "SSL 证书验证失败。可能是网络代理导致的，请检查代理设置。",
        "en": "SSL certificate error. This is often caused by a proxy — check your proxy settings.",
    },
    # ── 认证/Cookie 类 ───────────────────────────────────────────────────────
    {
        "patterns": [r"Sign in to confirm your age", r"age.?restricted", r"age.?gate"],
        "type": "auth",
        "zh": "该视频有年龄限制，需要登录账号。请在设置中上传 cookies.txt 文件后重试。",
        "en": "Age-restricted video. Upload your cookies.txt in Settings and try again.",
    },
    {
        "patterns": [r"Private video", r"This video is private"],
        "type": "auth",
        "zh": "这是私密视频，需要有权限的账号。请上传对应账号的 cookies.txt 后重试。",
        "en": "Private video. Upload cookies.txt from an authorized account in Settings.",
    },
    {
        "patterns": [r"HTTP Error 403", r"Forbidden", r"requires authentication",
                     r"This video requires payment", r"members.?only"],
        "type": "auth",
        "zh": "访问被拒绝（403）。该内容可能需要会员资格或登录。请配置浏览器 Cookie 或上传 cookies.txt。",
        "en": "Access denied (403). Requires membership or login. Use browser cookies or upload cookies.txt.",
    },
    {
        "patterns": [r"could not extract cookies", r"Failed to decrypt", r"cookie database", r"Could not copy .* cookie database"],
        "type": "auth",
        "zh": "无法读取指定浏览器的 Cookie。请确保该浏览器已关闭占用，或在设置中切换其他浏览器/上传 cookies.txt。",
        "en": "Could not extract cookies from browser. Ensure the browser is closed or switch to cookie file in Settings.",
    },
    # ── 地区限制 ────────────────────────────────────────────────────────────
    {
        "patterns": [r"not available in your country", r"geo.?block", r"geo.?restrict",
                     r"This video is not available", r"available in your region"],
        "type": "geo",
        "zh": "该视频在您所在地区不可用（地区限制）。请在设置中配置代理后重试。",
        "en": "This video is geo-restricted. Configure a proxy in Settings and try again.",
    },
    # ── 视频不可用 ───────────────────────────────────────────────────────────
    {
        "patterns": [r"Video unavailable", r"This video has been removed",
                     r"has been deleted", r"account.+terminated"],
        "type": "unavailable",
        "zh": "视频不可用：可能已被删除或账号已被封禁。",
        "en": "Video unavailable: it may have been removed or the account terminated.",
    },
    {
        "patterns": [r"HTTP Error 404", r"404"],
        "type": "unavailable",
        "zh": "视频不存在（404）。请检查链接是否正确。",
        "en": "Video not found (404). Please check the URL.",
    },
    # ── 格式/FFmpeg 类 ───────────────────────────────────────────────────────
    {
        "patterns": [r"ffmpeg.*not found", r"ffmpeg is not installed", r"Postprocessing.*ffmpeg"],
        "type": "format",
        "zh": "未找到 FFmpeg。请确认 bin\\ffmpeg.exe 文件存在。",
        "en": "FFmpeg not found. Ensure bin\\ffmpeg.exe exists.",
    },
    {
        "patterns": [r"Requested format is not available", r"No video formats found"],
        "type": "format",
        "zh": "请求的视频格式不可用。请尝试选择其他质量或格式后重试。",
        "en": "Requested format not available. Try a different quality or format.",
    },
    # ── 磁盘类 ──────────────────────────────────────────────────────────────
    {
        "patterns": [r"No space left", r"disk quota", r"not enough space"],
        "type": "disk",
        "zh": "磁盘空间不足。请清理磁盘或更改下载路径后重试。",
        "en": "Insufficient disk space. Free up space or change the download path in Settings.",
    },
]


def detect_known_error(text: str) -> dict | None:
    """在 yt-dlp 输出中匹配已知错误，返回错误描述字典，未匹配返回 None"""
    for entry in KNOWN_ERRORS:
        for pattern in entry["patterns"]:
            if re.search(pattern, text, re.IGNORECASE):
                return {
                    "type": entry["type"],
                    "zh":   entry["zh"],
                    "en":   entry["en"],
                    "pattern": pattern,
                }
    return None


# ══════════════════════════════════════════════════════════════════════════════
# 日志管理器
# ══════════════════════════════════════════════════════════════════════════════

class TaskLogger:
    """为每个下载任务创建独立日志文件"""

    def __init__(self, task_id: str, urls: list[str], opts: dict):
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.path = LOGS_DIR / f"{ts}_{task_id[:8]}.log"
        self.task_id = task_id
        self._lock = threading.Lock()
        # 写入任务头信息
        header = [
            f"=" * 60,
            f"YT-DLP WebUI Task Log",
            f"Task ID   : {task_id}",
            f"Started   : {datetime.now().isoformat()}",
            f"URLs ({len(urls)}):",
        ]
        for u in urls:
            header.append(f"  - {u}")
        cookie_mode = opts.get("cookie_mode") or "file"
        if cookie_mode == "file":
            c_file = opts.get("cookie_file") or "cookies.txt"
            p_file = Path(c_file)
            if not p_file.is_absolute():
                p_file = BASE_DIR / p_file
            cookie_desc = f"file ({p_file.name})" if p_file.exists() and p_file.stat().st_size > 0 else "file (未配置或为空)"
        elif cookie_mode == "browser":
            cookie_desc = f"browser ({opts.get('browser_name') or 'chrome'})"
        else:
            cookie_desc = "none"

        header += [
            f"Options   : format={opts.get('format')} quality={opts.get('quality')}",
            f"            proxy={opts.get('proxy') or 'none'}",
            f"            cookie={cookie_desc}",
            f"=" * 60,
            "",
        ]
        self._write_lines(header)

    def _write_lines(self, lines: list[str]):
        with self._lock:
            try:
                with open(self.path, "a", encoding="utf-8") as f:
                    for line in lines:
                        f.write(line + "\n")
            except Exception:
                pass

    def write(self, line: str):
        ts = datetime.now().strftime("%H:%M:%S")
        self._write_lines([f"[{ts}] {line.rstrip()}"])

    def write_section(self, title: str):
        self._write_lines(["", f"── {title} " + "-" * max(0, 50 - len(title)), ""])

    def write_error(self, error: str):
        self._write_lines([f"[ERROR] {error}"])

    def write_known_error(self, known: dict):
        self._write_lines([
            "",
            f"[KNOWN-ERROR] type={known['type']}",
            f"[KNOWN-ERROR] matched pattern: {known['pattern']}",
            f"[KNOWN-ERROR] {known['zh']}",
            "",
        ])

    def finalize(self, status: str, completed: int, total: int):
        self._write_lines([
            "",
            f"=" * 60,
            f"Finished  : {datetime.now().isoformat()}",
            f"Status    : {status}",
            f"Completed : {completed}/{total}",
            f"=" * 60,
        ])

    def get_path(self) -> str:
        return str(self.path)

    def get_name(self) -> str:
        return self.path.name


def list_log_files() -> list[dict]:
    """返回 logs/ 目录下所有日志文件信息（最新优先）"""
    LOGS_DIR.mkdir(exist_ok=True)
    files = sorted(LOGS_DIR.glob("*.log"), key=lambda p: p.stat().st_mtime, reverse=True)
    result = []
    for f in files:
        stat = f.stat()
        result.append({
            "name":     f.name,
            "size":     stat.st_size,
            "mtime":    datetime.fromtimestamp(stat.st_mtime).isoformat(),
        })
    return result


# ══════════════════════════════════════════════════════════════════════════════
# 工具函数
# ══════════════════════════════════════════════════════════════════════════════

def load_config() -> dict:
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, encoding="utf-8") as f:
                cfg = json.load(f)
            # 合并缺失的默认值
            for k, v in DEFAULT_CONFIG.items():
                cfg.setdefault(k, v)
            return cfg
        except Exception:
            pass
    return DEFAULT_CONFIG.copy()


def save_config(cfg: dict) -> None:
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)


def load_history() -> list:
    if HISTORY_FILE.exists():
        try:
            with open(HISTORY_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def save_history(history: list) -> None:
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)


def append_history(entry: dict) -> None:
    history = load_history()
    history.insert(0, entry)
    history = history[:500]   # 最多保留 500 条
    save_history(history)


def build_ytdlp_cmd(url: str, opts: dict, cfg: dict, task_id: str) -> list[str]:
    """构建 yt-dlp 命令行"""
    download_path = opts.get("download_path") or cfg.get("download_path", str(DOWNLOADS_DIR))
    os.makedirs(download_path, exist_ok=True)

    cmd = [
        str(YTDLP_EXE),
        "--encoding", "utf-8",
        "--newline",          # 每行输出进度（便于解析）
        "--no-colors",
        "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    ]

    # FFmpeg 路径
    if FFMPEG_EXE.exists():
        cmd += ["--ffmpeg-location", str(BIN_DIR)]

    # 代理
    proxy = opts.get("proxy") or cfg.get("proxy", "")
    if proxy:
        cmd += ["--proxy", proxy]

    # 速度限制
    speed_limit = opts.get("speed_limit") or cfg.get("speed_limit", "")
    if speed_limit:
        cmd += ["--limit-rate", speed_limit]

    # Cookie 设置（优先使用文件或浏览器）
    cookie_mode = opts.get("cookie_mode") or cfg.get("cookie_mode", "file")
    if cookie_mode == "file":
        cookie_file = opts.get("cookie_file") or cfg.get("cookie_file") or "cookies.txt"
        cookie_path = Path(cookie_file)
        if not cookie_path.is_absolute():
            cookie_path = BASE_DIR / cookie_path
        if cookie_path.exists() and cookie_path.stat().st_size > 0:
            cmd += ["--cookies", str(cookie_path)]
    elif cookie_mode == "browser":
        browser_name = opts.get("browser_name") or cfg.get("browser_name", "chrome")
        cmd += ["--cookies-from-browser", browser_name]

    # 格式选择
    fmt = opts.get("format", "video")
    quality = opts.get("quality", "best")

    if fmt == "audio":
        audio_fmt = opts.get("audio_format", "mp3")
        cmd += [
            "-x",
            "--audio-format", audio_fmt,
            "--audio-quality", "0",
        ]
    else:
        video_fmt = opts.get("video_format", "mp4")
        if quality == "best":
            fmt_str = "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"
        elif quality == "audio_only":
            fmt_str = "bestaudio/best"
        else:
            fmt_str = f"bestvideo[height<={quality}][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<={quality}]+bestaudio/best[height<={quality}]"
        cmd += ["-f", fmt_str, "--merge-output-format", video_fmt]

    # 字幕
    if opts.get("download_subtitles"):
        sub_langs = opts.get("subtitle_langs") or cfg.get("subtitle_langs", "zh-Hans,zh,en")
        cmd += [
            "--write-subs",
            "--sub-langs", sub_langs,
            "--convert-subs", "srt",
        ]
        if opts.get("embed_subtitles") or cfg.get("embed_subtitles"):
            cmd += ["--embed-subs"]

    # 播放列表范围
    playlist_start = opts.get("playlist_start", "")
    playlist_end   = opts.get("playlist_end", "")
    if playlist_start:
        cmd += ["--playlist-start", str(playlist_start)]
    if playlist_end:
        cmd += ["--playlist-end", str(playlist_end)]

    # 输出模板
    output_tmpl = os.path.join(download_path, "%(title)s.%(ext)s")
    cmd += ["-o", output_tmpl]

    cmd.append(url)
    return cmd


def send_event(q: queue.Queue, event_type: str, data: dict) -> None:
    q.put({"event": event_type, "data": data})


# ══════════════════════════════════════════════════════════════════════════════
# 下载工作线程
# ══════════════════════════════════════════════════════════════════════════════

def parse_progress_line(line: str) -> dict | None:
    """解析 yt-dlp 输出行"""
    line = line.strip()
    if not line:
        return None

    # 进度行格式: [download]  xx.x% of  xx.xxMiB at  xx.xxKiB/s ETA xx:xx
    if "[download]" in line and "%" in line:
        try:
            parts = line.split()
            pct_str = next((p for p in parts if "%" in p), "0%")
            pct = float(pct_str.replace("%", ""))

            speed = ""
            eta = ""
            total = ""
            for i, p in enumerate(parts):
                if p == "at" and i + 1 < len(parts):
                    speed = parts[i + 1]
                if p == "ETA" and i + 1 < len(parts):
                    eta = parts[i + 1]
                if p == "of" and i + 1 < len(parts):
                    total = parts[i + 1]

            return {"type": "progress", "percent": pct, "speed": speed, "eta": eta, "total": total}
        except Exception:
            pass

    # 合并行
    if "[Merger]" in line or "Merging" in line:
        return {"type": "merging", "message": "正在合并音视频…"}

    # 已完成
    if "[download] 100%" in line or "has already been downloaded" in line:
        return {"type": "progress", "percent": 100, "speed": "", "eta": "00:00", "total": ""}

    # 转换
    if "[ExtractAudio]" in line or "Destination:" in line:
        return {"type": "info", "message": line}

    return {"type": "log", "message": line}


def download_worker(task_id: str, urls: list[str], opts: dict, cfg: dict) -> None:
    q = task_queues[task_id]
    logger = TaskLogger(task_id, urls, opts)

    with tasks_lock:
        tasks[task_id]["status"] = "running"
        tasks[task_id]["log_file"] = logger.get_name()

    total_urls = len(urls)
    completed = 0

    for idx, url in enumerate(urls):
        url = url.strip()
        if not url:
            continue

        logger.write_section(f"URL {idx+1}/{total_urls}: {url}")
        send_event(q, "task_info", {
            "current": idx + 1,
            "total": total_urls,
            "url": url,
            "log_file": logger.get_name(),
        })

        cmd = build_ytdlp_cmd(url, opts, cfg, task_id)
        logger.write(f"Command: {' '.join(cmd)}")
        logger.write("")

        known_error_sent = False   # 每个 URL 只发送一次已知错误
        browser_cookie_failed = False
        captured_files = []

        try:
            env = os.environ.copy()
            env["PYTHONIOENCODING"] = "utf-8"
            proc = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
                env=env,
                creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
            )

            with tasks_lock:
                tasks[task_id]["proc"] = proc

            for raw_line in proc.stdout:
                # 检查是否被取消
                with tasks_lock:
                    if tasks[task_id].get("cancelled"):
                        proc.terminate()
                        break

                logger.write(raw_line)

                if "Failed to decrypt" in raw_line or "cookie database" in raw_line or "could not extract cookies" in raw_line:
                    browser_cookie_failed = True

                # 捕获输出文件路径
                m_merger = re.search(r'\[Merger\] Merging formats into "([^"]+)"', raw_line)
                if m_merger:
                    captured_files.append(m_merger.group(1))
                m_dest = re.search(r'\[download\] Destination:\s*(.+)', raw_line)
                if m_dest:
                    captured_files.append(m_dest.group(1).strip())
                m_audio = re.search(r'\[ExtractAudio\] Destination:\s*(.+)', raw_line)
                if m_audio:
                    captured_files.append(m_audio.group(1).strip())
                m_already = re.search(r'\[download\]\s*(.+?)\s+has already been downloaded', raw_line)
                if m_already:
                    captured_files.append(m_already.group(1).strip())

                # 已知错误检测（只在错误行触发）
                if not known_error_sent and ("ERROR" in raw_line or "error" in raw_line.lower()):
                    known = detect_known_error(raw_line)
                    if known:
                        logger.write_known_error(known)
                        send_event(q, "known_error", {
                            "url_index": idx,
                            "error": known,
                            "log_file": logger.get_name(),
                        })
                        known_error_sent = True

                parsed = parse_progress_line(raw_line)
                if parsed:
                    send_event(q, "progress", {**parsed, "url_index": idx})

            proc.wait()
            ret = proc.returncode

            # 若浏览器模式提取失败，且由于 DPAPI 解密或数据库占用导致，自动降级为不使用 Cookie 重试
            if ret != 0 and opts.get("cookie_mode") == "browser" and browser_cookie_failed and not tasks[task_id].get("cancelled"):
                logger.write("")
                logger.write("[WARNING] 浏览器 Cookie 提取失败（因 Windows DPAPI 加密限制或浏览器占用）。正在尝试自动降级为不使用 Cookie 重新下载...")
                logger.write("")
                fallback_opts = opts.copy()
                fallback_opts["cookie_mode"] = "none"
                fallback_cmd = build_ytdlp_cmd(url, fallback_opts, cfg, task_id)
                logger.write(f"Command (Retry): {' '.join(fallback_cmd)}")
                logger.write("")
                proc = subprocess.Popen(
                    fallback_cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    env=env,
                    creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
                )
                with tasks_lock:
                    tasks[task_id]["proc"] = proc
                for raw_line in proc.stdout:
                    with tasks_lock:
                        if tasks[task_id].get("cancelled"):
                            proc.terminate()
                            break
                    logger.write(raw_line)
                    m_merger = re.search(r'\[Merger\] Merging formats into "([^"]+)"', raw_line)
                    if m_merger:
                        captured_files.append(m_merger.group(1))
                    m_dest = re.search(r'\[download\] Destination:\s*(.+)', raw_line)
                    if m_dest:
                        captured_files.append(m_dest.group(1).strip())
                    m_audio = re.search(r'\[ExtractAudio\] Destination:\s*(.+)', raw_line)
                    if m_audio:
                        captured_files.append(m_audio.group(1).strip())
                    m_already = re.search(r'\[download\]\s*(.+?)\s+has already been downloaded', raw_line)
                    if m_already:
                        captured_files.append(m_already.group(1).strip())
                    parsed = parse_progress_line(raw_line)
                    if parsed:
                        send_event(q, "progress", {**parsed, "url_index": idx})
                proc.wait()
                ret = proc.returncode

            # 解析最终生成的文件路径和标题
            resolved_file = None
            for fpath_str in reversed(captured_files):
                p = Path(fpath_str)
                if not p.is_absolute():
                    p = BASE_DIR / p
                if p.exists() and p.is_file():
                    resolved_file = p
                    break

            if not resolved_file and ret == 0:
                dl_dir = Path(opts.get("download_path") or cfg.get("download_path", str(DOWNLOADS_DIR)))
                if not dl_dir.is_absolute():
                    dl_dir = BASE_DIR / dl_dir
                if dl_dir.exists():
                    candidates = [
                        f for f in dl_dir.glob("*.*")
                        if not f.name.endswith((".part", ".ytdl")) and not re.search(r'\.f\d+\.[^.]+$', f.name)
                    ]
                    if candidates:
                        candidates.sort(key=lambda x: x.stat().st_mtime, reverse=True)
                        if time.time() - candidates[0].stat().st_mtime < 180:
                            resolved_file = candidates[0]

            if resolved_file:
                resolved_title = resolved_file.stem
                resolved_size = resolved_file.stat().st_size
                rel_path = str(resolved_file.relative_to(BASE_DIR) if resolved_file.is_relative_to(BASE_DIR) else resolved_file)
            else:
                rel_path = ""
                resolved_size = 0
                resolved_title = tasks[task_id].get("title") or url

            entry = {
                "id": str(uuid.uuid4()),
                "task_id": task_id,
                "url": url,
                "title": resolved_title,
                "filename": resolved_file.name if resolved_file else "",
                "file_path": rel_path,
                "file_size": resolved_size,
                "status": "success" if ret == 0 else "error",
                "format": opts.get("format", "video"),
                "quality": opts.get("quality", "best"),
                "timestamp": datetime.now().isoformat(),
                "download_path": opts.get("download_path") or cfg.get("download_path"),
                "log_file": logger.get_name(),
            }
            append_history(entry)

            if ret == 0:
                completed += 1
                logger.write(f"✓ Done: {resolved_file.name if resolved_file else url}")
                send_event(q, "url_done", {
                    "url": url,
                    "index": idx,
                    "success": True,
                    "title": resolved_title,
                    "filename": resolved_file.name if resolved_file else "",
                    "file_path": rel_path,
                    "file_size": resolved_size,
                    "log_file": logger.get_name(),
                })
            else:
                logger.write_error(f"Process exited with code {ret}")
                send_event(q, "url_done", {
                    "url": url, "index": idx, "success": False,
                    "message": f"退出码: {ret}",
                    "log_file": logger.get_name(),
                })

        except Exception as e:
            logger.write_error(str(e))
            send_event(q, "url_done", {
                "url": url, "index": idx, "success": False,
                "message": str(e),
                "log_file": logger.get_name(),
            })

    # 全部完成
    final_status = "cancelled" if tasks[task_id].get("cancelled") else ("success" if completed == total_urls else "partial")
    logger.finalize(final_status, completed, total_urls)

    with tasks_lock:
        tasks[task_id]["status"] = final_status

    send_event(q, "done", {
        "status": final_status,
        "completed": completed,
        "total": total_urls,
        "log_file": logger.get_name(),
    })
    # 哨兵：关闭 SSE 流
    q.put(None)


# ══════════════════════════════════════════════════════════════════════════════
# API 路由
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/")
def index():
    return render_template("index.html")


# ── 获取视频信息 ──────────────────────────────────────────────────────────────
@app.route("/api/info", methods=["POST"])
def api_info():
    data = request.get_json(force=True) or {}
    url = data.get("url", "").strip()
    if not url:
        return jsonify({"error": "URL 不能为空"}), 400

    cfg = load_config()
    proxy = data.get("proxy") or cfg.get("proxy", "")

    cmd = [
        str(YTDLP_EXE),
        "--dump-json",
        "--no-playlist",
        "--no-warnings",
        "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    ]
    if proxy:
        cmd += ["--proxy", proxy]
    if FFMPEG_EXE.exists():
        cmd += ["--ffmpeg-location", str(BIN_DIR)]

    cookie_file = cfg.get("cookie_file") or "cookies.txt"
    cookie_path = Path(cookie_file)
    if not cookie_path.is_absolute():
        cookie_path = BASE_DIR / cookie_path
    if cookie_path.exists() and cookie_path.stat().st_size > 0:
        cmd += ["--cookies", str(cookie_path)]

    cmd.append(url)

    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=30,
            creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
        )
        if result.returncode != 0:
            err = result.stderr or result.stdout or "未知错误"
            return jsonify({"error": err.strip()[:500]}), 400

        info = json.loads(result.stdout)
        formats = info.get("formats", [])

        # 提取可用分辨率
        resolutions = set()
        for f in formats:
            h = f.get("height")
            if h:
                resolutions.add(h)
        resolutions = sorted(resolutions, reverse=True)

        return jsonify({
            "title":      info.get("title", "未知"),
            "thumbnail":  info.get("thumbnail", ""),
            "duration":   info.get("duration", 0),
            "uploader":   info.get("uploader", ""),
            "webpage_url": info.get("webpage_url", url),
            "is_playlist": info.get("_type") == "playlist",
            "resolutions": resolutions,
        })
    except subprocess.TimeoutExpired:
        return jsonify({"error": "请求超时，请检查网络或代理设置"}), 408
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── 开始下载 ──────────────────────────────────────────────────────────────────
@app.route("/api/download", methods=["POST"])
def api_download():
    data = request.get_json(force=True) or {}
    urls_raw = data.get("urls", "")
    if isinstance(urls_raw, list):
        urls = [u.strip() for u in urls_raw if u.strip()]
    else:
        urls = [u.strip() for u in urls_raw.splitlines() if u.strip()]

    if not urls:
        return jsonify({"error": "请至少输入一个 URL"}), 400

    cfg = load_config()
    task_id = str(uuid.uuid4())
    q: queue.Queue = queue.Queue(maxsize=200)

    with tasks_lock:
        tasks[task_id] = {
            "id": task_id,
            "urls": urls,
            "status": "pending",
            "created_at": datetime.now().isoformat(),
            "proc": None,
            "cancelled": False,
        }
        task_queues[task_id] = q

    opts = {
        "format":             data.get("format", "video"),
        "quality":            data.get("quality", "best"),
        "video_format":       data.get("video_format", "mp4"),
        "audio_format":       data.get("audio_format", "mp3"),
        "download_path":      data.get("download_path") or cfg.get("download_path"),
        "proxy":              data.get("proxy") or cfg.get("proxy"),
        "speed_limit":        data.get("speed_limit") or cfg.get("speed_limit"),
        "cookie_mode":        data.get("cookie_mode") or cfg.get("cookie_mode", "file"),
        "browser_name":       data.get("browser_name") or cfg.get("browser_name", "chrome"),
        "cookie_file":        data.get("cookie_file") or cfg.get("cookie_file", "cookies.txt"),
        "download_subtitles": data.get("download_subtitles", False),
        "subtitle_langs":     data.get("subtitle_langs") or cfg.get("subtitle_langs"),
        "embed_subtitles":    data.get("embed_subtitles", False),
        "playlist_start":     data.get("playlist_start", ""),
        "playlist_end":       data.get("playlist_end", ""),
    }

    t = threading.Thread(target=download_worker, args=(task_id, urls, opts, cfg), daemon=True)
    t.start()

    return jsonify({"task_id": task_id, "url_count": len(urls)})


# ── SSE 进度流 ────────────────────────────────────────────────────────────────
@app.route("/api/progress/<task_id>")
def api_progress(task_id: str):
    if task_id not in task_queues:
        return jsonify({"error": "任务不存在"}), 404

    def generate():
        q = task_queues[task_id]
        try:
            while True:
                try:
                    msg = q.get(timeout=30)
                except queue.Empty:
                    yield "event: heartbeat\ndata: {}\n\n"
                    continue

                if msg is None:   # 哨兵，结束流
                    yield "event: end\ndata: {}\n\n"
                    break

                payload = json.dumps(msg["data"], ensure_ascii=False)
                yield f"event: {msg['event']}\ndata: {payload}\n\n"
        finally:
            pass

    resp = Response(stream_with_context(generate()), mimetype="text/event-stream")
    resp.headers["Cache-Control"] = "no-cache"
    resp.headers["X-Accel-Buffering"] = "no"
    return resp


# ── 停止任务 ──────────────────────────────────────────────────────────────────
@app.route("/api/stop/<task_id>", methods=["POST"])
def api_stop(task_id: str):
    with tasks_lock:
        task = tasks.get(task_id)
        if not task:
            return jsonify({"error": "任务不存在"}), 404
        task["cancelled"] = True
        proc = task.get("proc")
        if proc and proc.poll() is None:
            proc.terminate()
    return jsonify({"ok": True})


# ── 下载历史 ──────────────────────────────────────────────────────────────────
@app.route("/api/history", methods=["GET"])
def api_history_get():
    history = load_history()
    for item in history:
        fpath = item.get("file_path")
        if fpath:
            p = Path(fpath)
            if not p.is_absolute():
                p = BASE_DIR / p
            item["file_exists"] = p.exists() and p.is_file()
            if item["file_exists"] and not item.get("file_size"):
                try:
                    item["file_size"] = p.stat().st_size
                except Exception:
                    pass
        else:
            item["file_exists"] = False
    return jsonify(history)


@app.route("/api/history", methods=["DELETE"])
def api_history_delete():
    save_history([])
    return jsonify({"ok": True})


@app.route("/api/history/<item_id>", methods=["DELETE"])
def api_history_delete_item(item_id: str):
    history = load_history()
    history = [h for h in history if h.get("id") != item_id]
    save_history(history)
    return jsonify({"ok": True})


# ── 配置读写 ──────────────────────────────────────────────────────────────────
@app.route("/api/config", methods=["GET"])
def api_config_get():
    return jsonify(load_config())


@app.route("/api/config", methods=["POST"])
def api_config_set():
    data = request.get_json(force=True) or {}
    cfg = load_config()
    allowed = set(DEFAULT_CONFIG.keys())
    for k, v in data.items():
        if k in allowed:
            cfg[k] = v
    save_config(cfg)
    return jsonify({"ok": True})


# ── 一键更新 yt-dlp ──────────────────────────────────────────────────────────
@app.route("/api/update-ytdlp", methods=["POST"])
def api_update_ytdlp():
    def do_update():
        cmd = [str(YTDLP_EXE), "-U"]
        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True, encoding="utf-8", errors="replace",
                timeout=120,
                creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
            )
            return result.stdout + result.stderr
        except Exception as e:
            return str(e)

    result = do_update()
    return jsonify({"output": result})


# ── 任务列表 ──────────────────────────────────────────────────────────────────
@app.route("/api/tasks", methods=["GET"])
def api_tasks():
    with tasks_lock:
        safe = {
            tid: {k: v for k, v in t.items() if k != "proc"}
            for tid, t in tasks.items()
        }
    return jsonify(safe)


# ── 上传 Cookie 文件 ──────────────────────────────────────────────────────────
@app.route("/api/upload-cookie", methods=["POST"])
def api_upload_cookie():
    if "file" not in request.files:
        return jsonify({"error": "没有上传文件"}), 400
    f = request.files["file"]
    dest = BASE_DIR / "cookies.txt"
    f.save(str(dest))
    cfg = load_config()
    cfg["cookie_file"] = str(dest)
    cfg["cookie_mode"] = "file"
    save_config(cfg)
    return jsonify({"ok": True, "path": str(dest)})


# ══════════════════════════════════════════════════════════════════════════════
# Cookie 管理与 Bilibili 扫码获取 Cookie
# ══════════════════════════════════════════════════════════════════════════════

def parse_cookie_text_to_netscape(text: str, default_domain: str = ".bilibili.com") -> str:
    """将各类 Cookie 文本（Netscape 格式、控制台请求头、SESSDATA、键值对）转换为标准 Netscape 格式"""
    text = text.strip()
    if not text:
        return ""
    lines = text.splitlines()
    has_tabs = any('\t' in l for l in lines if l.strip() and not l.strip().startswith('#'))
    if has_tabs or text.startswith('# Netscape') or text.startswith('# HTTP Cookie File'):
        if not text.startswith('# Netscape'):
            text = "# Netscape HTTP Cookie File\n" + text
        return text

    cleaned = re.sub(r'^(?:Cookie|cookie):\s*', '', text, flags=re.MULTILINE)
    tokens = []
    for line in cleaned.splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = [p.strip() for p in line.split(';') if p.strip()]
        tokens.extend(parts)

    cookies = []
    expire_time = int(time.time()) + 86400 * 365  # 默认 1 年

    for token in tokens:
        if '=' in token:
            k, v = token.split('=', 1)
            k = k.strip()
            v = v.strip()
        else:
            k = "SESSDATA"
            v = token.strip()
        if not k or not v:
            continue

        if k in ("SESSDATA", "bili_jct", "DedeUserID", "DedeUserID__ckMd5", "buvid3", "buvid4", "b_nut", "sid", "CURRENT_QUALITY"):
            domains = [".bilibili.com"]
        elif k in ("SAPISID", "APISID", "HSID", "SSID", "SID", "LOGIN_INFO", "PREF", "__Secure-1PSID", "__Secure-3PSID"):
            domains = [".youtube.com", ".google.com"]
        else:
            domains = [default_domain]

        for dom in domains:
            subdom = "TRUE" if dom.startswith(".") else "FALSE"
            cookies.append((dom, subdom, "/", "FALSE", str(expire_time), k, v))

    output = [
        "# Netscape HTTP Cookie File",
        "# Created by YT-DLP WebUI",
        ""
    ]
    for c in cookies:
        output.append("\t".join(c))
    return "\n".join(output) + "\n"


def set_cookies_to_netscape(cookie_headers: list[str]) -> str:
    """将 HTTP 响应中的 Set-Cookie 头列表转换为 Netscape 格式"""
    lines = [
        "# Netscape HTTP Cookie File",
        "# Generated by YT-DLP WebUI Bilibili QR Login",
        "",
    ]
    expire_default = int(time.time()) + 86400 * 180  # 180 天
    for header in cookie_headers:
        parts = [p.strip() for p in header.split(";") if p.strip()]
        if not parts or "=" not in parts[0]:
            continue
        name, val = parts[0].split("=", 1)
        domain = ".bilibili.com"
        path = "/"
        secure = "FALSE"
        expires = str(expire_default)
        for attr in parts[1:]:
            if "=" in attr:
                ak, av = attr.split("=", 1)
                ak_lower = ak.strip().lower()
                av_clean = av.strip()
                if ak_lower == "domain":
                    domain = av_clean if av_clean.startswith(".") else f".{av_clean}"
                elif ak_lower == "path":
                    path = av_clean
            elif attr.strip().lower() == "secure":
                secure = "TRUE"
        subdomain = "TRUE" if domain.startswith(".") else "FALSE"
        lines.append("\t".join([domain, subdomain, path, secure, expires, name.strip(), val.strip()]))
    return "\n".join(lines) + "\n"


def get_cookie_status() -> dict:
    """检查 cookies.txt 的状态信息"""
    dest = BASE_DIR / "cookies.txt"
    if not dest.exists() or dest.stat().st_size == 0:
        return {
            "exists": False,
            "has_bilibili": False,
            "has_youtube": False,
            "summary": "未配置 Cookie",
            "size": 0,
            "mtime": "",
        }
    try:
        content = dest.read_text(encoding="utf-8", errors="replace")
        has_bili = "SESSDATA" in content or "bilibili.com" in content
        has_yt = "youtube.com" in content or "LOGIN_INFO" in content or "SAPISID" in content
        tags = []
        if has_bili:
            tags.append("B站(已登录)")
        if has_yt:
            tags.append("YouTube")
        summary = f"已配置 ({', '.join(tags)})" if tags else "已配置 Cookie 文件"
        stat = dest.stat()
        return {
            "exists": True,
            "has_bilibili": has_bili,
            "has_youtube": has_yt,
            "summary": summary,
            "size": stat.st_size,
            "mtime": datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M"),
        }
    except Exception as e:
        return {"exists": False, "error": str(e), "summary": "读取失败"}


@app.route("/api/cookie", methods=["GET", "POST", "DELETE", "OPTIONS"])
def api_cookie():
    if request.method == "OPTIONS":
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return resp

    if request.method == "GET":
        status = get_cookie_status()
        resp = jsonify(status)
        resp.headers["Access-Control-Allow-Origin"] = "*"
        return resp

    if request.method == "DELETE":
        dest = BASE_DIR / "cookies.txt"
        if dest.exists():
            dest.unlink()
        cfg = load_config()
        cfg["cookie_file"] = ""
        save_config(cfg)
        resp = jsonify({"ok": True, "message": "Cookie 已清空"})
        resp.headers["Access-Control-Allow-Origin"] = "*"
        return resp

    data = request.get_json(force=True, silent=True) or {}
    content = data.get("content", "").strip()
    if not content:
        return jsonify({"error": "Cookie 内容不能为空"}), 400

    netscape_content = parse_cookie_text_to_netscape(content)
    if not netscape_content:
        return jsonify({"error": "未能从输入内容中解析出有效 Cookie"}), 400

    dest = BASE_DIR / "cookies.txt"
    dest.write_text(netscape_content, encoding="utf-8")
    cfg = load_config()
    cfg["cookie_file"] = str(dest)
    cfg["cookie_mode"] = "file"
    save_config(cfg)

    status = get_cookie_status()
    resp = jsonify({"ok": True, "path": str(dest), "status": status})
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@app.route("/api/bilibili/qrcode", methods=["GET"])
def api_bilibili_qrcode():
    """获取 B 站登录二维码 URL 与 qrcode_key"""
    url = "https://passport.bilibili.com/x/passport-login/web/qrcode/generate"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") == 0:
                return jsonify({
                    "ok": True,
                    "url": data["data"]["url"],
                    "qrcode_key": data["data"]["qrcode_key"],
                })
            return jsonify({"ok": False, "error": data.get("message", "生成二维码失败")}), 500
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/api/bilibili/poll", methods=["GET"])
def api_bilibili_poll():
    """轮询 B 站二维码扫描状态"""
    qrcode_key = request.args.get("qrcode_key", "").strip()
    if not qrcode_key:
        return jsonify({"error": "缺少 qrcode_key"}), 400

    url = f"https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key={qrcode_key}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw_body = resp.read().decode("utf-8")
            data = json.loads(raw_body)
            data_inner = data.get("data", {})
            code = data_inner.get("code", -1)
            msg = data_inner.get("message", "")

            if code == 0:
                cookie_headers = resp.headers.get_all("Set-Cookie") or []
                if cookie_headers:
                    netscape_content = set_cookies_to_netscape(cookie_headers)
                    dest = BASE_DIR / "cookies.txt"
                    dest.write_text(netscape_content, encoding="utf-8")
                    cfg = load_config()
                    cfg["cookie_file"] = str(dest)
                    cfg["cookie_mode"] = "file"
                    save_config(cfg)

                return jsonify({
                    "ok": True,
                    "code": 0,
                    "message": "登录成功",
                    "status": get_cookie_status()
                })

            return jsonify({
                "ok": True,
                "code": code,
                "message": msg
            })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ── 打开文件 ──────────────────────────────────────────────────────────────────
@app.route("/api/open-file", methods=["POST"])
def api_open_file():
    data = request.get_json(force=True) or {}
    target = data.get("file") or data.get("path") or data.get("file_path")
    if not target:
        return jsonify({"ok": False, "error": "未提供文件路径"}), 400
    p = Path(target)
    if not p.is_absolute():
        p = BASE_DIR / p
    if not (p.exists() and p.is_file()):
        return jsonify({"ok": False, "error": f"文件不存在: {p.name}"}), 404
    try:
        if sys.platform == "win32":
            os.startfile(str(p))
        elif sys.platform == "darwin":
            subprocess.Popen(["open", str(p)])
        else:
            subprocess.Popen(["xdg-open", str(p)])
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ── 打开文件夹 ────────────────────────────────────────────────────────────────
@app.route("/api/open-folder", methods=["POST"])
def api_open_folder():
    data = request.get_json(force=True) or {}
    target = data.get("file") or data.get("path") or data.get("file_path")
    if not target:
        cfg = load_config()
        target = cfg.get("download_path", str(DOWNLOADS_DIR))
    p = Path(target)
    if not p.is_absolute():
        p = BASE_DIR / p
    try:
        if sys.platform == "win32":
            if p.is_file():
                subprocess.Popen(["explorer", f"/select,{str(p.resolve())}"])
                return jsonify({"ok": True})
            elif p.is_dir():
                os.startfile(str(p))
                return jsonify({"ok": True})
            elif p.parent.exists():
                os.startfile(str(p.parent))
                return jsonify({"ok": True})
            else:
                DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
                os.startfile(str(DOWNLOADS_DIR))
                return jsonify({"ok": True})
        elif sys.platform == "darwin":
            parent = p if p.is_dir() else p.parent
            subprocess.Popen(["open", str(parent)])
        else:
            parent = p if p.is_dir() else p.parent
            subprocess.Popen(["xdg-open", str(parent)])
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ── 版本信息 ──────────────────────────────────────────────────────────────────
@app.route("/api/version", methods=["GET"])
def api_version():
    try:
        result = subprocess.run(
            [str(YTDLP_EXE), "--version"],
            capture_output=True, text=True, encoding="utf-8", timeout=5,
            creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
        )
        return jsonify({"yt_dlp": result.stdout.strip(), "ffmpeg": _ffmpeg_version()})
    except Exception as e:
        return jsonify({"yt_dlp": "未知", "ffmpeg": "未知", "error": str(e)})


def _ffmpeg_version() -> str:
    try:
        r = subprocess.run(
            [str(FFMPEG_EXE), "-version"],
            capture_output=True, text=True, encoding="utf-8", timeout=5,
            creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0,
        )
        first_line = r.stdout.splitlines()[0] if r.stdout else ""
        return first_line.split("version")[1].strip().split(" ")[0] if "version" in first_line else "未知"
    except Exception:
        return "未找到"



# ── 日志 API ──────────────────────────────────────────────────────────────────

@app.route("/api/logs", methods=["GET"])
def api_logs_list():
    """列出所有日志文件"""
    return jsonify(list_log_files())


@app.route("/api/logs/<filename>", methods=["GET"])
def api_logs_view(filename: str):
    """查看日志文件内容（纯文本）"""
    # 安全校验：只允许 .log 文件名，不允许路径穿越
    if ".." in filename or "/" in filename or "\\" in filename or not filename.endswith(".log"):
        return jsonify({"error": "非法文件名"}), 400
    log_path = LOGS_DIR / filename
    if not log_path.exists():
        return jsonify({"error": "文件不存在"}), 404
    try:
        content = log_path.read_text(encoding="utf-8", errors="replace")
        if request.headers.get("Accept") == "application/json" or request.args.get("format") == "json":
            return jsonify({"ok": True, "name": filename, "content": content})
        return Response(content, mimetype="text/plain; charset=utf-8")
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/logs/<filename>/export", methods=["GET"])
def api_logs_export(filename: str):
    """下载日志文件"""
    if ".." in filename or "/" in filename or "\\" in filename or not filename.endswith(".log"):
        return jsonify({"error": "非法文件名"}), 400
    log_path = LOGS_DIR / filename
    if not log_path.exists():
        return jsonify({"error": "文件不存在"}), 404
    return send_file(str(log_path), as_attachment=True, download_name=filename, mimetype="text/plain")


@app.route("/api/logs", methods=["DELETE"])
def api_logs_delete_all():
    """清空所有日志文件"""
    LOGS_DIR.mkdir(exist_ok=True)
    deleted = 0
    for f in LOGS_DIR.glob("*.log"):
        try:
            f.unlink()
            deleted += 1
        except Exception:
            pass
    return jsonify({"ok": True, "deleted": deleted})


@app.route("/api/logs/<filename>", methods=["DELETE"])
def api_logs_delete_one(filename: str):
    """删除单个日志文件"""
    if ".." in filename or "/" in filename or "\\" in filename or not filename.endswith(".log"):
        return jsonify({"error": "非法文件名"}), 400
    log_path = LOGS_DIR / filename
    if log_path.exists():
        log_path.unlink()
    return jsonify({"ok": True})


# ══════════════════════════════════════════════════════════════════════════════
# 启动
# ══════════════════════════════════════════════════════════════════════════════


def find_free_port(preferred: int = 8080) -> int:
    for port in range(preferred, preferred + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
    return preferred


def open_browser_delayed(url: str, delay: float = 1.5) -> None:
    def _open():
        time.sleep(delay)
        webbrowser.open(url)
    threading.Thread(target=_open, daemon=True).start()


if __name__ == "__main__":
    # 确保下载目录存在
    DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)

    # 初始化配置
    if not CONFIG_FILE.exists():
        save_config(DEFAULT_CONFIG.copy())

    cfg = load_config()
    port = find_free_port(cfg.get("port", 8080))

    url = f"http://127.0.0.1:{port}"
    print(f"╔══════════════════════════════════════╗")
    print(f"║      YT-DLP WebUI 已启动             ║")
    print(f"║  访问地址: {url:<25} ║")
    print(f"║  按 Ctrl+C 停止服务                  ║")
    print(f"╚══════════════════════════════════════╝")

    open_browser_delayed(url)

    try:
        from waitress import serve
        serve(app, host="127.0.0.1", port=port, threads=8)
    except ImportError:
        app.run(host="127.0.0.1", port=port, debug=False, threaded=True)
