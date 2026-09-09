<div align="center">

# 🎬 YT-DLP WebUI

**Modern, zero-install, portable video/audio downloader WebUI**

Powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [FFmpeg](https://ffmpeg.org/), with a sleek, responsive dark-themed UI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows%2010%20%2F%2011-blue.svg)](https://github.com)
[![Python: 3.10+](https://img.shields.io/badge/Python-3.10%2B-brightgreen.svg)](https://www.python.org/)
[![yt--dlp](https://img.shields.io/badge/yt--dlp-Latest-red.svg)](https://github.com/yt-dlp/yt-dlp)

[中文说明文档](README.md) · [Download Releases](../../releases) · [Report Issue](../../issues)

</div>

---

## ✨ Features

- 🚀 **Zero-Config Portable Edition**
  No need to install Python, Git, FFmpeg, or any dependencies. Copy the folder to any Windows machine and double-click `start.bat`.
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

1. Go to the [Releases page](../../releases/latest).
2. Download `YT-DLP-WebUI-Portable-Windows-x64.zip`.
3. Extract it anywhere on your computer.
4. **Double-click `start.bat`**. Your default browser will open `http://127.0.0.1:8080`.

> 💡 To terminate the service, run `stop.bat`.

### Method 2: Running from Source (Developers)

```bash
# 1. Clone repository
git clone https://github.com/your-username/YT-DLP-WebUI.git
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

## 📁 Directory Structure

```
YT-DLP-WebUI/
├── app.py                  # Backend Flask application and API routes
├── start.bat               # Windows startup batch script
├── stop.bat                # Windows service termination script
├── pack_portable.bat       # Script to package clean portable release
├── setup_dev.bat           # Developer setup script to fetch dependencies
├── config.example.json     # Configuration template
├── requirements.txt        # Python package dependencies
├── LICENSE                 # MIT License
├── bin/                    # Binaries (included in portable release)
│   ├── yt-dlp.exe          # yt-dlp executable
│   └── ffmpeg.exe          # FFmpeg muxer & encoder
├── python/                 # Embedded Windows Python (included in portable release)
├── static/                 # Frontend assets (CSS, JS)
├── templates/              # HTML templates
└── downloads/              # Default download directory
```

---

## 🛠️ Automated CI/CD Releases

This repository includes a GitHub Actions workflow (`.github/workflows/release.yml`):
Whenever a version tag (e.g. `v1.0.0`) is pushed, GitHub Actions automatically builds the full portable zip with the latest embedded Python, FFmpeg, and yt-dlp, and publishes it to GitHub Releases.

You can also create a release locally by running `pack_portable.bat`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Underlying core components:
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - The Unlicense
- [FFmpeg](https://ffmpeg.org/) - LGPL / GPL

---

## ⚠️ Disclaimer

This tool is intended for personal offline archiving, educational, and research purposes only. Please respect copyright laws and the terms of service of the respective platforms. The authors are not responsible for any misuse of this software.
