<div align="center">

# 🎬 YT-DLP WebUI

**Modern, zero-install, portable video/audio downloader WebUI**

Powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [FFmpeg](https://ffmpeg.org/), designed and built with **Muse AI** and **Google Antigravity**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows | macOS | Linux](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue.svg)](https://github.com)
[![Python: 3.10+](https://img.shields.io/badge/Python-3.10%2B-brightgreen.svg)](https://www.python.org/)
[![yt--dlp](https://img.shields.io/badge/yt--dlp-Latest-red.svg)](https://github.com/yt-dlp/yt-dlp)
[![Built with: Muse AI + Antigravity](https://img.shields.io/badge/Built%20with-Muse%20AI%20%2B%20Antigravity-4285F4.svg)](https://antigravity.google/)

[中文说明文档](README.md) · [Download Releases](../../releases) · [Report Issue](../../issues)

</div>

---

## ✨ Features

- 🚀 **Zero-Config Portable Edition**
  No need to install Python, Git, FFmpeg, or any dependencies. Copy the folder to any computer — double-click `start.bat` on Windows, or run `./start.sh` from a terminal on macOS / Linux.
- 🌐 **Browser Cookie Integration (No Extensions Required)**
  Directly extract logged-in cookies from installed browsers (**Microsoft Edge, Google Chrome, Firefox, Brave, Opera, Vivaldi**). Download 1080P/4K, age-restricted, and member-only videos without manual `cookies.txt` exports!
- 🎬 **Instant File & Folder Access**
  After downloading, click **"🎬 Open File"** to launch the video in your default player, or **"📂 Open Folder"** to reveal and highlight the file in Windows Explorer.
- 📋 **In-Page Interactive Log Viewer Modal**
  Dark-themed code modal to inspect real-time logs for any task or history item without leaving the web page, with one-click copy and export.
- 📜 **Full Download History Hub**
  Displays real video titles, file sizes, format badges, timestamps, and status dots. Supports individual item deletion and full clearing.
- ⚡ **Lossless Merge & Multiple Formats**
  Bundled with FFmpeg for automatic audio/video muxing into MP4, WebM, MKV, or audio-only extraction to MP3, M4A, FLAC, WAV, and Opus.
- 📑 **Batch Downloads & Playlist Range**
  Paste multiple URLs (one per line) or specify custom start/end ranges for playlists.
- 🌍 **Bilingual Interface**
  Seamlessly toggle between Simplified Chinese and English with one click.
- 🔄 **One-Click Online Update**
  Keep yt-dlp up-to-date directly from the Settings panel.
- 🛡️ **Smart Known Error Detection**
  Recognizes geo-restrictions, authentication errors, and network timeouts, offering clear troubleshooting advice directly on the task card.

---

## 📥 Download & Usage

### Method 1: Portable Release (Recommended for most users)

Visit the [Releases page](../../releases/latest) to download the portable package for your platform:

| Platform | Package Name | Details | How to Run |
| :--- | :--- | :--- | :--- |
| **Windows (x64)** | `YT-DLP-WebUI-v*-Portable-Windows-x64.zip` | Bundled with embedded Python, yt-dlp, and FFmpeg. Zero configuration required. | Double-click `start.bat` (stop with `stop.bat`) |
| **macOS (Apple Silicon / arm64)** | `YT-DLP-WebUI-v*-Portable-MacOS-arm64.zip` | Bundled with yt-dlp and FFmpeg. Automatically initializes `.venv` on first launch. | Run `./start.sh` in terminal (stop with `./stop.sh`, requires `python3`) |
| **Linux (x64)** | `YT-DLP-WebUI-v*-Portable-Linux-x64.zip` | Bundled with yt-dlp and static FFmpeg. Automatically initializes `.venv` on first launch. | Run `./start.sh` in terminal (stop with `./stop.sh`, requires `python3`) |

> 💡 **Usage Steps**:
> 1. Extract the downloaded zip to any local folder.
> 2. **Start the service**:
>    - **Windows**: Double-click `start.bat`.
>    - **macOS / Linux**: Open a terminal and run `./start.sh` (requires system Python 3.9+; creates `.venv` and installs dependencies on first run).
> 3. Once started, open your browser to `http://127.0.0.1:8080`.
> 4. **Stop the service**: Double-click `stop.bat` on Windows, or run `./stop.sh` on macOS/Linux.

### Method 2: Running from Source (Developers)

```bash
# 1. Clone repository
git clone https://github.com/mango2952/YT-DLP-WebUI.git
cd YT-DLP-WebUI

# 2. Automatically setup dependencies and binaries (Windows)
setup_dev.bat

# 3. Launch WebUI
start.bat
```

Or manually:
```bash
pip install -r requirements.txt
python app.py
```

---

## 🍪 Cookie Setup

- **Browser Cookie (recommended)**: Settings → Cookie Settings → select "🌐 Browser Cookie" and choose your daily browser. Downloads automatically share its login state.
- **📱 QR Login**: on the Download tab, under Download Options → Cookie status, click "📱 Bilibili QR Login" or "📱 Xiaohongshu QR Login", then scan with the mobile app to confirm. Cookies are saved to `cookies.txt` automatically (multiple platforms coexist without overwriting each other).
  > ℹ️ Douyin / TikTok QR login is not offered (their login API is protected by anti-bot measures) — please use Browser Cookie mode instead: log in normally in your own browser and the app reads the login state automatically.

---

## 📁 Directory Structure

```
YT-DLP-WebUI/
├── app.py                  # Backend Flask application and API routes
├── start.bat               # Windows startup batch script
├── stop.bat                # Windows service termination script
├── start.sh                # macOS / Linux startup script (run ./start.sh)
├── stop.sh                 # macOS / Linux service termination script
├── pack_portable.bat       # Script to package clean portable release (Windows)
├── setup_dev.bat           # Developer setup script to fetch dependencies (Windows)
├── config.example.json     # Configuration template
├── requirements.txt        # Python package dependencies
├── LICENSE                 # MIT License
├── bin/                    # Binaries (included in portable release, platform-specific)
│   ├── yt-dlp(.exe)         # yt-dlp executable
│   └── ffmpeg(.exe)         # FFmpeg muxer & encoder
├── python/                 # Embedded Python runtime (Windows portable release only)
├── static/                 # Frontend assets (CSS, JS)
├── templates/              # HTML templates
└── downloads/              # Default download directory
```

---

## 🛠️ Automated CI/CD Releases

This repository includes a GitHub Actions workflow (`.github/workflows/release.yml`):
Whenever a version tag (e.g. `v1.3.0`) is pushed, GitHub Actions automatically builds portable zips for all three platforms (Windows x64, macOS arm64, Linux x64) with the latest yt-dlp, FFmpeg (plus embedded Python on Windows), and publishes them to GitHub Releases.

You can also create a release locally (Windows) by running `pack_portable.bat`.

---

## 📬 Feedback & Support

If you encounter issues, bugs, or have feature suggestions:
- **Email**: [torresgoal@163.com](mailto:torresgoal@163.com)
- **GitHub Issues**: [Submit an Issue](https://github.com/mango2952/YT-DLP-WebUI/issues)

> 💡 **Troubleshooting**: If a download fails, click **"📥 Export Log"** on the task card or in History, and email the `.log` file to **[torresgoal@163.com](mailto:torresgoal@163.com)**. For known issues like network timeouts or login requirements, the UI automatically displays helpful banners.

---

## ☕ Sponsor & Donate

If **YT-DLP WebUI** saves you time and makes downloading easier, consider buying the author a coffee ☕! Your support keeps this project maintained and updated.

<div align="center">
  <img src="docs/donate.jpg" width="280" alt="WeChat Pay Donation QR Code" />
  <br>
  <sub><b>WeChat Pay Donation</b></sub>
</div>

---

## 🤖 Built with Muse AI & Antigravity

This project was developed collaboratively by **Muse AI** and **Google Antigravity**:
- **Muse AI**: requirements planning, task breakdown, tech decisions, code review, testing, and release management.
- **Google Antigravity**: full-stack code implementation.
- **Zero-Dependency Portable Bundle**: Self-contained embedded Python (Windows) + FFmpeg + yt-dlp environment.
- **Native Browser Cookie Integration**: Direct extraction from Edge, Chrome, Firefox without browser extensions.
- **Glassmorphic UI & Interactive Log Modal**: Built using vanilla modern HTML/CSS/JS without heavyweight framework bloat.
- **Full-Cycle AI Pair Programming**: From feature requirements, troubleshooting, CI/CD to GitHub open-source release.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Underlying core components:
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - The Unlicense
- [FFmpeg](https://ffmpeg.org/) - LGPL / GPL

---

## ⚠️ Disclaimer

This tool is intended for personal offline archiving, educational, and research purposes only. Please respect copyright laws and the terms of service of the respective platforms. The authors are not responsible for any misuse of this software.
