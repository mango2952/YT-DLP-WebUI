<div align="center">

# 🎬 YT-DLP WebUI

**现代化、免安装、解压即用的便携式视频/音频下载工具**

基于 [yt-dlp](https://github.com/yt-dlp/yt-dlp) 与 [FFmpeg](https://ffmpeg.org/) 开发，内置极速轻量 Web 界面。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows%2010%20%2F%2011-blue.svg)](https://github.com)
[![Python: 3.10+](https://img.shields.io/badge/Python-3.10%2B-brightgreen.svg)](https://www.python.org/)
[![yt--dlp](https://img.shields.io/badge/yt--dlp-Latest-red.svg)](https://github.com/yt-dlp/yt-dlp)

[English Documentation](README_EN.md) · [下载最新发布版](../../releases) · [报告问题](../../issues)

</div>

---

## ✨ 核心亮点

- 🚀 **真正解压即用（Zero-Config Portable）**
  无需在电脑上预装 Python、Git、FFmpeg 或任何依赖环境，拷贝文件夹到任何 Windows 电脑，双击 `start.bat` 即可使用。
- 🌐 **原生优先调用浏览器 Cookie（免装插件）**
  支持直接联动系统中的 **Microsoft Edge、Google Chrome、Firefox、Brave 等主流浏览器**，自动提取已登录账号 Cookie，下载 1080P/4K/8K、会员专享、年龄限制视频无需繁琐导出 `cookies.txt`！同时仍保留文件上传模式。
- 🎬 **下载完成后一键直达**
  下载完成后，任务卡片与历史记录支持直接 **「🎬 打开文件」** 调起系统默认播放器，或 **「📂 所在文件夹」** 在资源管理器中直接定位并高亮选中目标文件。
- 📋 **网页内交互式日志查看弹窗**
  内置代码风格的深色日志查看模态框（Modal）。点击任一任务或历史记录的 **「📋 查看日志」** 即可网页内实时预览，支持一键复制与导出。
- 📜 **完整历史记录中心**
  自动捕获并展示**真实视频标题**、格式标签、文件体积大小、下载时间及状态，支持单条独立删除与批量清空。
- ⚡ **多画质与音视频无损合并**
  内置 FFmpeg，支持最佳画质、4K (2160p)、2K (1440p)、1080p、720p 等分辨率，以及 MP3、M4A、FLAC、WAV、Opus 纯音频无损提取。
- 📑 **批量下载与播放列表**
  支持多链接换行粘贴批量解析下载，支持自定义指定播放列表（Playlist）的起始与结束范围。
- 🌍 **中英双语界面**
  右上角一键无缝切换简体中文与英文（English）。
- 🔄 **组件一键在线升级**
  设置面板内置「一键更新 yt-dlp」，轻松保持下载核心为官方最新版本。
- 🛡️ **智能已知错误拦截**
  遇到地区限制、网络超时、账号权限受限等问题时，界面自动以彩色提示横幅给出通俗易懂的解决方案。

---

## 📥 下载与使用

### 方式一：下载预打包便携版（推荐普通用户）

1. 进入 [Releases 页面](../../releases/latest)。
2. 下载 `YT-DLP-WebUI-Portable-Windows-x64.zip`。
3. 解压到电脑任意目录（路径尽量避免特殊字符）。
4. **双击 `start.bat`**，浏览器将自动弹出控制台页面（默认端口 `8080`，若被占用自动顺延）。

> 💡 如需退出停止服务，双击运行 `stop.bat` 即可。

### 方式二：从源码运行（开发者）

如果你习惯使用 Git 或希望自行开发扩展：

```bash
# 1. 克隆本仓库
git clone https://github.com/your-username/YT-DLP-WebUI.git
cd YT-DLP-WebUI

# 2. 安装依赖并自动补全 yt-dlp / ffmpeg 二进制（Windows）
setup_dev.bat

# 3. 启动服务
start.bat
```

或手动运行：
```bash
pip install -r requirements.txt
python app.py
```

---

## 🧭 使用指南

### 1. 视频与音频下载
1. 在首页输入框粘贴 YouTube、Bilibili、Twitter、TikTok 等平台链接（支持 1000+ 站点）。
2. 可点击 **「🔍 识别」** 按钮预先预览视频标题、封面与时长。
3. 选择下载模式：
   - **视频**：可指定最高分辨率（最佳质量/4K/1080P等）与封装格式（MP4/WebM/MKV）。
   - **仅音频**：支持提取为 MP3、M4A、FLAC、WAV、Opus。
4. 可开启「字幕下载」与「嵌入视频」选项。
5. 点击 **「⬇ 开始下载」** 即可实时观察下载速度、ETA 剩余时间和进度条。

### 2. Cookie 配置技巧
- **浏览器 Cookie（最推荐）**：
  进入「设置」→「Cookie 设置」→ 选择「🌐 优先调用浏览器 Cookie」→ 选择你日常登录所用的浏览器（如 Edge 或 Chrome）并保存。下载时即会自动共享登录状态。
- **Cookie 文件**：
  若在无界面的服务器或特定环境使用，选择「📁 使用 Cookie 文件」，上传由浏览器插件（如 *Get cookies.txt LOCALLY*）导出的 Netscape 格式 `cookies.txt`。

### 3. 网络代理设置
如果在访问部分站点时需要代理：
进入「设置」→「网络」→ 填写你的本地代理地址，例如：
- HTTP 代理：`http://127.0.0.1:7890`
- SOCKS5 代理：`socks5://127.0.0.1:1080`
点击保存后，后续下载将全部走代理加速。

---

## 📁 目录结构说明

```
YT-DLP-WebUI/
├── app.py                  # Flask 后端核心逻辑与 API
├── start.bat               # Windows 启动脚本（双击运行）
├── stop.bat                # Windows 停止后台服务脚本
├── pack_portable.bat       # 本地一键打包便携发布包脚本
├── setup_dev.bat           # 开发者源码环境一键安装脚本
├── config.example.json     # 默认配置文件范本
├── requirements.txt        # Python 依赖清单
├── LICENSE                 # MIT 开源许可证
├── bin/                    # 外部工具目录 (便携版内置)
│   ├── yt-dlp.exe          # yt-dlp 官方核心可执行文件
│   └── ffmpeg.exe          # 音视频处理与转码组件
├── python/                 # Windows 嵌入式便携 Python 运行时 (便携版内置)
├── static/                 # 前端 CSS、JavaScript、图标资源
│   ├── css/style.css
│   └── js/app.js
├── templates/              # HTML 模板
│   └── index.html
└── downloads/              # 默认视频下载存储目录
```

---

## ❓ 常见问题 (FAQ)

<details>
<summary><b>Q1: 提取浏览器 Cookie 报错 "Could not copy Chrome/Edge cookie database"？</b></summary>
这是由于浏览器正在前台全屏运行并锁定了本地 Cookie 数据库文件。请尝试将该浏览器窗口完全退出一次，或者切换为火狐浏览器 / 上传 cookies.txt 文件。
</details>

<details>
<summary><b>Q2: 为什么下载某些 1080P/4K 视频速度较慢？</b></summary>
部分平台对非会员或特定客户端进行了限速策略。建议在「设置」中配置浏览器 Cookie 联动，以及配置高速网络代理以获得最佳下载速度。
</details>

<details>
<summary><b>Q3: 如何修改默认下载保存位置？</b></summary>
在 Web 界面点击顶部「设置」→「常规」→「下载路径」，输入你希望保存的绝对路径（如 `D:\MyVideos`）或相对路径，点击底部「保存设置」即可立即生效。
</details>

---

## 🛠️ 构建与发布自动化

本项目包含完善的 GitHub Actions 持续集成流（`.github/workflows/release.yml`）：
当你向 GitHub 推送版本标签（如 `v1.0.0`）时，GitHub 自动化集群将自动拉取官方最新嵌入式 Python、FFmpeg 与 yt-dlp，自动打包出开箱即用的 `YT-DLP-WebUI-vX.X.X-Portable-Windows-x64.zip` 并发布到 GitHub Releases。

如果你希望在本地手动打包，直接双击运行 **`pack_portable.bat`** 即可在根目录下生成干净的便携压缩包。

---

## 📬 反馈与支持 (Support & Contact)

如果您在使用过程中遇到任何问题、报错，或有新的功能建议：
- **邮箱联系**：[torresgoal@163.com](mailto:torresgoal@163.com)
- **提交 Issue**：[GitHub Issues](https://github.com/mango2952/YT-DLP-WebUI/issues)

> 💡 **错误排查与日志提交**：若下载报错，请在任务卡片或历史记录中点击 **「📥 导出日志」**，将导出的 `.log` 文件发送至开发者邮箱 **[torresgoal@163.com](mailto:torresgoal@163.com)**，开发者会尽快排查修复！如果是网络/地区限制/账号权限等非软件问题，界面已内置智能彩色横幅提示解决方案。

---

## ☕ 赞助与捐赠 (Donation)

如果 **YT-DLP WebUI** 为您的日常视频下载提供了便利，欢迎请作者喝一杯咖啡 ☕ 您的每一份支持都是本项目持续迭代维护的动力！

<div align="center">
  <img src="docs/donate.jpg" width="280" alt="微信赞助二维码" />
  <br>
  <sub><b>微信扫码赞助</b></sub>
</div>

---

## 📄 开源许可证 (License)

本项目基于 [MIT License](LICENSE) 开源。

内置使用的核心组件遵循其各自的开源协议：
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - The Unlicense
- [FFmpeg](https://ffmpeg.org/) - LGPL / GPL

---

## ⚠️ 免责声明 (Disclaimer)

本项目仅供个人学习、技术研究与离线归档之目的开发。请严格遵守您所在地区的法律法规及目标平台的版权条款，严禁利用本项目进行任何形式的侵权、盗版或非法商业传播。使用者因使用本软件产生的一切纠纷和责任由使用者自行承担。
