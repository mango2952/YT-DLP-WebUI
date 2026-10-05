/* ═══════════════════════════════════════════════════════════════════════════
   YT-DLP WebUI — Frontend Logic
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// i18n 多语言
// ══════════════════════════════════════════════════════════════════════════════

const I18N = {
  zh: {
    appName: 'YT-DLP WebUI',
    tabDownload: '下载',
    tabHistory: '历史',
    tabSettings: '设置',
    inputTitle: '输入链接',
    inputSub: '支持 YouTube、Bilibili、Twitter 等 1000+ 平台',
    urlPlaceholder: '粘贴视频或播放列表链接，多个链接请换行输入…',
    btnFetch: '识别',
    optionsTitle: '下载选项',
    optContent: '下载内容',
    optThumbnail: '封面',
    optType: '类型',
    optVideo: '视频',
    optAudio: '仅音频',
    optAudioOnly: '音频',
    optQuality: '视频质量',
    qualBest: '最佳质量',
    optVideoFmt: '视频格式',
    optAudioFmt: '音频格式',
    optSubtitle: '字幕',
    optSubtitleLang: '字幕语言',
    optEmbedSub: '嵌入视频',
    optTurbo: '⚡ 极速模式',
    optTurboLabel: '下载加速',
    optTurboTitle: '多线程并行下载视频分片，下载更快；仅对 HLS/DASH 等分片流有效',
    optPlaylist: '播放列表范围',
    btnDownload: '开始下载',
    historyTitle: '下载历史',
    btnClearHistory: '清除历史',
    historyEmpty: '暂无下载记录',
    settingGeneral: '常规',
    settingPath: '下载路径',
    btnOpenFolder: '📂 打开',
    settingConcurrent: '并发下载数',
    settingSpeed: '速度限制',
    settingSpeedHint: '留空不限速',
    settingNetwork: '网络',
    settingProxy: '代理地址',
    settingCookie: 'Cookie 文件',
    btnUploadCookie: '📤 上传',
    btnClearCookie: '清除',
    cookieHint: '请使用浏览器插件导出 Netscape 格式的 cookies.txt',
    settingMaintain: '工具维护',
    btnUpdateYtdlp: '🔄 一键更新 yt-dlp',
    settingLogs: '📋 日志管理',
    btnClearLogs: '清空日志',
    logsEmpty: '暂无日志文件',
    logsHint: '下载出错时，将日志文件发送给开发者以便排查问题',
    btnExportLog: '📥 导出日志',
    btnViewLog: '📋 查看日志',
    btnDeleteLog: '删除',
    btnOpenFile: '🎬 打开文件',
    btnRefresh: '🔄 刷新',
    btnCopy: '📋 复制',
    btnDownloadLog: '📥 导出',
    cookieMode: 'Cookie 来源',
    cookieModeBrowser: '🌐 优先调用浏览器 Cookie (推荐)',
    cookieModeFile: '📁 使用 Cookie 文件 (cookies.txt)',
    cookieModeNone: '🚫 不使用 Cookie',
    cookieBrowserSelect: '选择浏览器',
    cookieBrowserHint: '优先直接提取浏览器中已登录的 YouTube/Bilibili Cookie，无需任何插件导出，下载高清或受限视频极方便。',
    knownErrHint: '这是已知的非软件问题，无需导出日志',
    btnSave: '💾 保存设置',
    btnStop: '停止',
    toastDownloadStarted: '下载任务已启动',
    toastSaved: '设置已保存',
    toastNoContentSelected: '请至少选择一项下载内容（封面/视频/音频/字幕）',
    toastHistoryCleared: '历史记录已清除',
    toastCookieUploaded: 'Cookie 文件已上传',
    toastCookieCleared: 'Cookie 已清除',
    toastUrlEmpty: '请先输入视频链接',
    toastUpdateDone: 'yt-dlp 更新完成',
    toastFetchError: '无法获取视频信息',
    toastLogsCleared: '日志已清空',
    toastLogDeleted: '日志已删除',
    toastFileNotFound: '文件不存在或已被移动',
    toastCopied: '已复制到剪贴板',
    toastDeleted: '记录已删除',
    statusQueued: '排队中',
    statusRunning: '下载中',
    statusSuccess: '完成',
    statusError: '失败',
    statusMerging: '合并中',
    statusCancelled: '已停止',
    statusPaused: '已暂停',
    statusPartial: '部分完成',
    btnPause: '⏸ 暂停',
    btnResume: '▶ 恢复',
    btnRetry: '🔄 重试',
    toastTaskPaused: '任务已暂停',
    toastTaskResumed: '任务已恢复并重新排队',
    toastTaskRetried: '任务已重新提交下载',
    toastPauseError: '暂停失败',
    toastResumeError: '恢复失败',
    toastRetryError: '重试失败',
    errorTypeNetwork: '🌐 网络问题',
    errorTypeAuth: '🔐 需要登录',
    errorTypeGeo: '🗺 地区限制',
    errorTypeUnavailable: '🚫 视频不可用',
    errorTypeFormat: '⚙️ 格式问题',
    errorTypeDisk: '💾 磁盘不足',
    btnDonate: '赞助',
    donateTitle: '☕ 赞助与支持',
    donateDesc: '如果您觉得 YT-DLP WebUI 对您有帮助，欢迎请作者喝一杯咖啡 ☕',
    settingAbout: '关于与支持',
    contactTitle: '意见反馈与问题排查',
    contactDesc: '若遇到下载报错，请点击任务卡片上的【导出日志】，将生成的 log 文件发送至作者邮箱：',
    aboutDevTitle: '开发工具与架构',
    aboutDevDesc: '本产品由 Muse AI 与 Google Antigravity 协作开发完成。',
    logModalHint: '如遇软件报错，可点击【导出】将日志文件发送至作者邮箱：',
    fmtPickerBtn: '🎛️ 指定格式',
    fmtPickerTitle: '两个都不选则使用全局设置；选了任意一个就进入手动模式，只下载所选格式；两个都选则合并',
    fmtDefault: '默认',
    fmtGroupVideo: '视频',
    fmtGroupAudio: '纯音频',
    fmtLoading: ' 获取中…',
    advTitle: '⚙️ 高级：逐链接指定来源格式',
    advHint: '为每个链接单独指定视频/音频来源格式。两个都不选则使用全局设置；选了任意一个就进入手动模式，只下载所选格式；两个都选则合并。',
    advVideoSelectLabel: '视频',
    advVideoSelectTitle: '视频格式',
    advAudioSelectLabel: '音频',
    advAudioSelectTitle: '音频格式',
    advFormatTooltip: '两个都不选则使用全局设置；选了任意一个就进入手动模式，只下载所选格式；两个都选则合并',
    advFetchAll: '🔍 获取全部链接的格式',
    advNoUrl: '请先在上方输入链接',
    advNoFormats: '未检测到可用格式',
    advFetchFailed: '获取失败',
    btnBiliQr: '📱 扫码获取 B站 Cookie',
    btnXhsQr: '📱 小红书扫码',
    btnQuickPaste: '📋 读剪贴板',
    btnCfgPaste: '📋 读取剪贴板',
    cookieStatusLabel: 'Cookie 状态',
    douyinTiktokCookieTip: 'ℹ️ 抖音/TikTok 请用浏览器 Cookie 模式',
    qrModalTitleBili: 'B站一键扫码获取 Cookie',
    qrModalTitleXhs: '小红书扫码获取 Cookie',
    qrModalSubtextBili: '请打开手机哔哩哔哩客户端扫一扫并确认登录。<br>无需任何浏览器插件，自动写入 cookies.txt，用于下载 1080P 60帧/4K 高清视频。',
    qrModalSubtextXhs: '请打开手机小红书客户端扫一扫并确认登录。<br>无需任何浏览器插件，自动写入 cookies.txt，用于下载无水印高清视频与图文。',
    qrStatusGenerating: '正在获取登录二维码…',
    qrStatusScanBili: '请打开手机哔哩哔哩客户端扫一扫登录',
    qrStatusScanXhs: '请打开手机小红书客户端扫一扫登录',
    qrStatusScanned: '✓ 已扫码，请在手机上确认登录…',
    qrStatusExpired: '二维码已失效，请点击刷新',
    qrExpired: '已过期',
    btnRefreshQr: '点击刷新',
    toastBiliSuccess: '🎉 B站 Cookie 同步成功！已自动保存并启用',
    toastXhsSuccess: '🎉 小红书 Cookie 同步成功！已自动保存并启用',
    cookieLoggedBili: 'B站',
    cookieLoggedXhs: '小红书',
    cookieConfigured: '已配置 Cookie',
  },
  en: {
    appName: 'YT-DLP WebUI',
    tabDownload: 'Download',
    tabHistory: 'History',
    tabSettings: 'Settings',
    inputTitle: 'Enter URL',
    inputSub: 'Supports YouTube, Bilibili, Twitter and 1000+ more',
    urlPlaceholder: 'Paste video or playlist URL(s), one per line…',
    btnFetch: 'Fetch Info',
    optionsTitle: 'Download Options',
    optContent: 'Download Content',
    optThumbnail: 'Cover / Thumbnail',
    optType: 'Type',
    optVideo: 'Video',
    optAudio: 'Audio Only',
    optAudioOnly: 'Audio',
    optQuality: 'Quality',
    qualBest: 'Best Quality',
    optVideoFmt: 'Video Format',
    optAudioFmt: 'Audio Format',
    optSubtitle: 'Subtitles',
    optSubtitleLang: 'Subtitle Language',
    optEmbedSub: 'Embed',
    optTurbo: '⚡ Turbo mode',
    optTurboLabel: 'Acceleration',
    optTurboTitle: 'Multi-threaded parallel download of video fragments for faster speed; only effective for segmented streams (HLS/DASH)',
    optPlaylist: 'Playlist Range',
    btnDownload: 'Start Download',
    historyTitle: 'Download History',
    btnClearHistory: 'Clear History',
    historyEmpty: 'No download records yet',
    settingGeneral: 'General',
    settingPath: 'Download Path',
    btnOpenFolder: '📂 Open',
    settingConcurrent: 'Concurrent Downloads',
    settingSpeed: 'Speed Limit',
    settingSpeedHint: 'Leave blank for unlimited',
    settingNetwork: 'Network',
    settingProxy: 'Proxy',
    settingCookie: 'Cookie File',
    btnUploadCookie: '📤 Upload',
    btnClearCookie: 'Clear',
    cookieHint: 'Export cookies.txt in Netscape format using a browser extension',
    settingMaintain: 'Maintenance',
    btnUpdateYtdlp: '🔄 Update yt-dlp',
    settingLogs: '📋 Log Management',
    btnClearLogs: 'Clear All Logs',
    logsEmpty: 'No log files yet',
    logsHint: 'Send log files to the developer when errors occur',
    btnExportLog: '📥 Export Log',
    btnViewLog: '📋 View Log',
    btnDeleteLog: 'Delete',
    btnOpenFile: '🎬 Open File',
    btnRefresh: '🔄 Refresh',
    btnCopy: '📋 Copy',
    btnDownloadLog: '📥 Export',
    cookieMode: 'Cookie Source',
    cookieModeBrowser: '🌐 Use Browser Cookies (Recommended)',
    cookieModeFile: '📁 Use Cookie File (cookies.txt)',
    cookieModeNone: '🚫 No Cookies',
    cookieBrowserSelect: 'Select Browser',
    cookieBrowserHint: 'Directly uses login cookies from your browser without exporting files.',
    knownErrHint: 'This is a known non-software issue — no need to export logs',
    btnSave: '💾 Save Settings',
    btnStop: 'Stop',
    toastDownloadStarted: 'Download task started',
    toastSaved: 'Settings saved',
    toastNoContentSelected: 'Please select at least one item to download (Thumbnail/Video/Audio/Subtitles)',
    toastHistoryCleared: 'History cleared',
    toastCookieUploaded: 'Cookie file uploaded',
    toastCookieCleared: 'Cookie cleared',
    toastUrlEmpty: 'Please enter a URL first',
    toastUpdateDone: 'yt-dlp updated',
    toastFetchError: 'Failed to fetch video info',
    toastLogsCleared: 'Logs cleared',
    toastLogDeleted: 'Log deleted',
    toastFileNotFound: 'File not found or moved',
    toastCopied: 'Copied to clipboard',
    toastDeleted: 'Record deleted',
    statusQueued: 'Queued',
    statusRunning: 'Downloading',
    statusSuccess: 'Done',
    statusError: 'Error',
    statusMerging: 'Merging',
    statusCancelled: 'Stopped',
    statusPaused: 'Paused',
    statusPartial: 'Partial',
    btnPause: '⏸ Pause',
    btnResume: '▶ Resume',
    btnRetry: '🔄 Retry',
    toastTaskPaused: 'Task paused',
    toastTaskResumed: 'Task resumed and re-queued',
    toastTaskRetried: 'Task retried and re-queued',
    toastPauseError: 'Failed to pause task',
    toastResumeError: 'Failed to resume task',
    toastRetryError: 'Failed to retry task',
    errorTypeNetwork: '🌐 Network Issue',
    errorTypeAuth: '🔐 Login Required',
    errorTypeGeo: '🗺 Geo-Restricted',
    errorTypeUnavailable: '🚫 Video Unavailable',
    errorTypeFormat: '⚙️ Format Issue',
    errorTypeDisk: '💾 Disk Full',
    btnDonate: 'Donate',
    donateTitle: '☕ Sponsor & Support',
    donateDesc: 'If you find YT-DLP WebUI helpful, consider buying the author a coffee ☕',
    settingAbout: 'About & Support',
    contactTitle: 'Feedback & Troubleshooting',
    contactDesc: 'If a download fails, export the log file and email to:',
    aboutDevTitle: 'Built with Antigravity',
    aboutDevDesc: 'Developed collaboratively by Muse AI and Google Antigravity.',
    logModalHint: 'If you encounter an error, export and email logs to:',
    fmtPickerBtn: '🎛️ Format',
    fmtPickerTitle: 'Leave both empty to use global settings; select either to download only that format; select both to merge',
    fmtDefault: 'Default',
    fmtGroupVideo: 'Video',
    fmtGroupAudio: 'Audio only',
    fmtLoading: ' Loading…',
    advTitle: '⚙️ Advanced: per-URL source format',
    advHint: 'Specify video and audio source formats per URL. Leave both empty to use global settings; select either to download only that format; select both to merge.',
    advVideoSelectLabel: 'Video',
    advVideoSelectTitle: 'Video format',
    advAudioSelectLabel: 'Audio',
    advAudioSelectTitle: 'Audio format',
    advFormatTooltip: 'Leave both empty to use global settings; select either to download only that format; select both to merge',
    advFetchAll: '🔍 Fetch formats for all URLs',
    advNoUrl: 'Enter URLs above first',
    advNoFormats: 'No formats detected',
    advFetchFailed: 'Fetch failed',
    btnBiliQr: '📱 Bilibili QR Login',
    btnXhsQr: '📱 Xiaohongshu QR Login',
    btnQuickPaste: '📋 Read Clipboard',
    btnCfgPaste: '📋 Read Clipboard',
    cookieStatusLabel: 'Cookie Status',
    douyinTiktokCookieTip: 'ℹ️ For Douyin / TikTok, please use Browser Cookie mode',
    qrModalTitleBili: 'Scan QR code to get Bilibili Cookie',
    qrModalTitleXhs: 'Scan QR code to get Xiaohongshu Cookie',
    qrModalSubtextBili: 'Open the Bilibili mobile app to scan and confirm login.<br>Automatically saved to cookies.txt for 1080P/4K downloads.',
    qrModalSubtextXhs: 'Open the Xiaohongshu mobile app to scan and confirm login.<br>Automatically saved to cookies.txt for HD downloads.',
    qrStatusGenerating: 'Generating QR code…',
    qrStatusScanBili: 'Please scan with the Bilibili app to log in',
    qrStatusScanXhs: 'Please scan with the Xiaohongshu app to log in',
    qrStatusScanned: '✓ Scanned! Please confirm login on your phone…',
    qrStatusExpired: 'QR code expired. Please click to refresh.',
    qrExpired: 'Expired',
    btnRefreshQr: 'Click to Refresh',
    toastBiliSuccess: '🎉 Bilibili Cookie synced! Saved and enabled automatically.',
    toastXhsSuccess: '🎉 Xiaohongshu Cookie synced! Saved and enabled automatically.',
    cookieLoggedBili: 'Bilibili',
    cookieLoggedXhs: 'Xiaohongshu',
    cookieConfigured: 'Cookie Configured',
  },
};

let currentLang = localStorage.getItem('yt-dlp-lang') || 'zh';

function t(key) {
  return (I18N[currentLang] || I18N.zh)[key] || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // skip — handled by placeholder
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
  document.querySelectorAll('.task-badge[data-status]').forEach(el => {
    const s = el.dataset.status;
    el.textContent = t('status' + s.charAt(0).toUpperCase() + s.slice(1));
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('yt-dlp-lang', currentLang);
  document.getElementById('lang-label').textContent = currentLang === 'zh' ? 'EN' : '中';
  applyI18n();
}

// ══════════════════════════════════════════════════════════════════════════════
// Toast 通知
// ══════════════════════════════════════════════════════════════════════════════

function showToast(msg, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ══════════════════════════════════════════════════════════════════════════════
// Tab 切换
// ══════════════════════════════════════════════════════════════════════════════

function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${target}`).classList.add('active');

      if (target === 'history') loadHistory();
      if (target === 'settings') { loadSettings(); loadLogs(); }
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 格式/类型切换
// ══════════════════════════════════════════════════════════════════════════════

function updateContentToggleStates() {
  const chkThumb = document.getElementById('chk-thumbnail');
  const chkVideo = document.getElementById('chk-video');
  const chkAudio = document.getElementById('chk-audio');
  const chkSub   = document.getElementById('chk-subtitle');

  if (chkThumb) document.getElementById('ct-thumbnail')?.classList.toggle('active', chkThumb.checked);
  if (chkVideo) {
    document.getElementById('ct-video')?.classList.toggle('active', chkVideo.checked);
    document.getElementById('quality-group')?.classList.toggle('hidden', !chkVideo.checked);
    document.getElementById('video-format-group')?.classList.toggle('hidden', !chkVideo.checked);
  }
  if (chkAudio) {
    document.getElementById('ct-audio')?.classList.toggle('active', chkAudio.checked);
    document.getElementById('audio-format-group')?.classList.toggle('hidden', !chkAudio.checked);
  }
  if (chkSub) {
    document.getElementById('ct-subtitle')?.classList.toggle('active', chkSub.checked);
    document.getElementById('subtitle-options-group')?.classList.toggle('hidden', !chkSub.checked);
  }
}

function initFormatToggle() {
  ['chk-thumbnail', 'chk-video', 'chk-audio', 'chk-subtitle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updateContentToggleStates);
    }
  });
  updateContentToggleStates();
}

// ══════════════════════════════════════════════════════════════════════════════
// 视频信息识别
// ══════════════════════════════════════════════════════════════════════════════

function formatOptionLabel(f) {
  const prefix = f.id ? `[${f.id}] ` : '';
  const isAudioOnly = f.vcodec === 'none' || (!f.resolution && f.acodec && f.acodec !== 'none');
  const ext = f.ext || '';
  if (isAudioOnly) {
    let lbl = `audio only ${ext}`.trim();
    if (f.format_note && f.format_note.toLowerCase() !== 'tiny') lbl += ` (${f.format_note})`;
    if (f.filesize) lbl += ` - ${formatFileSize(f.filesize)}`;
    return `${prefix}${lbl}`.trim();
  }
  let res = f.format_note || '';
  if (!res && f.resolution) {
    const h = f.resolution.split('x')[1];
    res = h ? `${h}p` : f.resolution;
  }
  let lbl = `${res ? res + ' ' : ''}${ext}`.trim();
  if (f.fps && f.fps > 30) lbl += ` ${f.fps}fps`;
  if (f.filesize) lbl += ` - ${formatFileSize(f.filesize)}`;
  return `${prefix}${lbl || f.id}`.trim();
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '';
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function updateRemoveButtonsVisibility() {
  const container = document.getElementById('url-rows-container');
  if (!container) return;
  const rows = container.querySelectorAll('.url-input-row');
  rows.forEach(r => {
    const btnRemove = r.querySelector('.btn-remove-row');
    if (btnRemove) {
      if (rows.length > 1) {
        btnRemove.classList.remove('hidden');
      } else {
        btnRemove.classList.add('hidden');
      }
    }
  });
}

function bindUrlRowEvents(row) {
  const input = row.querySelector('.url-row-input');
  const btnRemove = row.querySelector('.btn-remove-row');

  if (btnRemove) {
    btnRemove.onclick = () => {
      const container = document.getElementById('url-rows-container');
      if (container && container.querySelectorAll('.url-input-row').length > 1) {
        row.remove();
        updateRemoveButtonsVisibility();
      }
    };
  }

  if (input) {
    input.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        startDownload();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addUrlRow('');
      }
    });

    input.addEventListener('paste', e => {
      const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      if (text.includes('\n')) {
        e.preventDefault();
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return;
        input.value = lines[0];
        for (let i = 1; i < lines.length; i++) {
          addUrlRow(lines[i]);
        }
      }
    });
  }
}

function addUrlRow(initialUrl = '') {
  const container = document.getElementById('url-rows-container');
  if (!container) return null;

  const row = document.createElement('div');
  row.className = 'url-input-row';
  row.innerHTML = `
    <input
      type="text"
      class="url-row-input"
      data-i18n-placeholder="urlPlaceholder"
      placeholder="粘贴视频或播放列表链接…"
      spellcheck="false"
      value="${initialUrl ? initialUrl.replace(/"/g, '&quot;') : ''}"
    />
    <button type="button" class="btn btn-ghost btn-sm btn-remove-row" title="删除行">✕</button>
  `;

  container.appendChild(row);
  bindUrlRowEvents(row);
  updateRemoveButtonsVisibility();

  const input = row.querySelector('.url-row-input');
  if (!initialUrl && input) {
    input.focus();
  }
  return row;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function truncateMiddle(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

// 高级模式已选格式：{ url: { video: "<id或空>", audio: "<id或空>" } }，行重建后用于恢复选择
let advSelectedFormats = {};

function initAdvancedSection() {
  const toggle = document.getElementById('btn-advanced-toggle');
  const panel = document.getElementById('advanced-panel');
  const fetchAll = document.getElementById('btn-fetch-all-formats');
  if (!toggle || !panel) return;
  toggle.onclick = () => {
    const willOpen = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    toggle.classList.toggle('open', willOpen);
    if (willOpen) buildAdvancedFormatRows();
  };
  if (fetchAll) {
    fetchAll.onclick = () => fetchAllAdvancedFormats();
  }
}

function getUrlRowsList() {
  const container = document.getElementById('url-rows-container');
  const list = [];
  if (container) {
    container.querySelectorAll('.url-input-row').forEach(r => {
      const input = r.querySelector('.url-row-input');
      const u = input ? input.value.trim() : '';
      if (u) list.push(u);
    });
  }
  return list;
}

function buildAdvancedFormatRows() {
  const container = document.getElementById('advanced-format-rows');
  if (!container) return;
  container.innerHTML = '';
  const urls = getUrlRowsList();
  if (!urls.length) {
    container.innerHTML = `<p class="adv-empty">${escapeHtml(t('advNoUrl'))}</p>`;
    return;
  }
  urls.forEach(url => {
    const div = document.createElement('div');
    div.className = 'adv-format-row';
    const safeUrl = escapeHtml(url);
    const tooltipText = escapeHtml(t('advFormatTooltip'));
    const prevSel = (typeof advSelectedFormats[url] === 'object' && advSelectedFormats[url]) ? advSelectedFormats[url] : {};

    div.innerHTML = `
      <span class="adv-url-label" title="${safeUrl}">${escapeHtml(truncateMiddle(url, 38))}</span>
      <div class="adv-select-group">
        <div class="adv-select-item" title="${tooltipText}">
          <span class="adv-select-label" data-i18n="advVideoSelectLabel">${escapeHtml(t('advVideoSelectLabel'))}</span>
          <select class="adv-format-select adv-video-select opt-select" data-url="${safeUrl}" title="${tooltipText}" data-i18n-title="advFormatTooltip" aria-label="${escapeHtml(t('advVideoSelectTitle'))}">
            <option value="" data-i18n="fmtDefault">${escapeHtml(t('fmtDefault'))}</option>
            ${prevSel.video ? `<option value="${escapeHtml(prevSel.video)}" selected>[${escapeHtml(prevSel.video)}]</option>` : ''}
          </select>
        </div>
        <div class="adv-select-item" title="${tooltipText}">
          <span class="adv-select-label" data-i18n="advAudioSelectLabel">${escapeHtml(t('advAudioSelectLabel'))}</span>
          <select class="adv-format-select adv-audio-select opt-select" data-url="${safeUrl}" title="${tooltipText}" data-i18n-title="advFormatTooltip" aria-label="${escapeHtml(t('advAudioSelectTitle'))}">
            <option value="" data-i18n="fmtDefault">${escapeHtml(t('fmtDefault'))}</option>
            ${prevSel.audio ? `<option value="${escapeHtml(prevSel.audio)}" selected>[${escapeHtml(prevSel.audio)}]</option>` : ''}
          </select>
        </div>
      </div>
      <span class="adv-row-status"></span>`;

    const videoSelect = div.querySelector('.adv-video-select');
    const audioSelect = div.querySelector('.adv-audio-select');

    const updateSelected = () => {
      advSelectedFormats[url] = {
        video: videoSelect.value || '',
        audio: audioSelect.value || '',
      };
    };

    videoSelect.addEventListener('change', updateSelected);
    audioSelect.addEventListener('change', updateSelected);

    container.appendChild(div);
  });
}

async function fetchFormatsIntoSelect(rowDiv) {
  const videoSelect = rowDiv.querySelector('.adv-video-select');
  const audioSelect = rowDiv.querySelector('.adv-audio-select');
  const status = rowDiv.querySelector('.adv-row-status');
  const url = (videoSelect && videoSelect.dataset.url) || (audioSelect && audioSelect.dataset.url) || '';
  if (!videoSelect || !audioSelect || !url) return;

  videoSelect.disabled = true;
  audioSelect.disabled = true;
  if (status) status.textContent = t('fmtLoading');

  try {
    const res = await fetch('/api/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'failed');
    const formats = data.formats || [];

    videoSelect.innerHTML = '';
    const videoDefaultOpt = document.createElement('option');
    videoDefaultOpt.value = '';
    videoDefaultOpt.textContent = t('fmtDefault');
    videoDefaultOpt.setAttribute('data-i18n', 'fmtDefault');
    videoSelect.appendChild(videoDefaultOpt);

    audioSelect.innerHTML = '';
    const audioDefaultOpt = document.createElement('option');
    audioDefaultOpt.value = '';
    audioDefaultOpt.textContent = t('fmtDefault');
    audioDefaultOpt.setAttribute('data-i18n', 'fmtDefault');
    audioSelect.appendChild(audioDefaultOpt);

    if (!formats.length) {
      if (status) status.textContent = t('advNoFormats');
    } else {
      formats.forEach(f => {
        if (f.vcodec && f.vcodec !== 'none') {
          const opt = document.createElement('option');
          opt.value = f.id;
          opt.textContent = formatOptionLabel(f);
          videoSelect.appendChild(opt);
        }
        if (f.acodec && f.acodec !== 'none') {
          const opt = document.createElement('option');
          opt.value = f.id;
          opt.textContent = formatOptionLabel(f);
          audioSelect.appendChild(opt);
        }
      });

      // 恢复之前为该 URL 选过的格式
      const prevSel = (typeof advSelectedFormats[url] === 'object' && advSelectedFormats[url]) ? advSelectedFormats[url] : {};
      if (prevSel.video && videoSelect.querySelector(`option[value="${prevSel.video}"]`)) {
        videoSelect.value = prevSel.video;
      }
      if (prevSel.audio && audioSelect.querySelector(`option[value="${prevSel.audio}"]`)) {
        audioSelect.value = prevSel.audio;
      }

      if (status) status.textContent = '';
    }
  } catch (err) {
    if (status) status.textContent = t('advFetchFailed');
  } finally {
    videoSelect.disabled = false;
    audioSelect.disabled = false;
  }
}

async function fetchAllAdvancedFormats() {
  buildAdvancedFormatRows();
  const rows = document.querySelectorAll('#advanced-format-rows .adv-format-row');
  for (const r of rows) {
    await fetchFormatsIntoSelect(r);
  }
}

function getAllUrlRowsData() {
  const container = document.getElementById('url-rows-container');
  const urls = [];
  const formats = {};

  if (container) {
    const rows = container.querySelectorAll('.url-input-row');
    rows.forEach(r => {
      const input = r.querySelector('.url-row-input');
      const u = input ? input.value.trim() : '';
      if (u) urls.push(u);
    });
  } else {
    const el = document.getElementById('url-input');
    if (el && el.value.trim()) {
      urls.push(...el.value.trim().split('\n').map(s => s.trim()).filter(Boolean));
    }
  }

  // 高级模式：逐链接指定的来源格式（视频 + 音频）
  document.querySelectorAll('#advanced-format-rows .adv-format-row').forEach(row => {
    const vSel = row.querySelector('.adv-video-select');
    const aSel = row.querySelector('.adv-audio-select');
    const url = (vSel && vSel.dataset.url) || (aSel && aSel.dataset.url);
    if (url) {
      advSelectedFormats[url] = {
        video: (vSel && vSel.value) ? vSel.value : '',
        audio: (aSel && aSel.value) ? aSel.value : '',
      };
    }
  });

  for (const [url, fmt] of Object.entries(advSelectedFormats)) {
    if (fmt && (fmt.video || fmt.audio)) {
      formats[url] = {
        video: fmt.video || '',
        audio: fmt.audio || '',
      };
    }
  }

  return { urls, formats };
}

function resetUrlRows() {
  const container = document.getElementById('url-rows-container');
  if (!container) return;
  const rows = container.querySelectorAll('.url-input-row');
  rows.forEach((r, idx) => {
    if (idx === 0) {
      const input = r.querySelector('.url-row-input');
      if (input) input.value = '';
    } else {
      r.remove();
    }
  });
  updateRemoveButtonsVisibility();
  // 清空高级模式的格式选择
  advSelectedFormats = {};
  const advContainer = document.getElementById('advanced-format-rows');
  if (advContainer) advContainer.innerHTML = '';
}

async function fetchVideoInfo() {
  const { urls } = getAllUrlRowsData();
  const url = urls.length > 0 ? urls[0] : (document.getElementById('url-input')?.value || '').trim().split('\n')[0].trim();
  if (!url) { showToast(t('toastUrlEmpty'), 'error'); return; }

  const btn = document.getElementById('btn-fetch-info');
  btn.disabled = true;
  btn.textContent = '…';

  try {
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error');

    const box = document.getElementById('video-info-box');
    document.getElementById('info-title').textContent = data.title || '';
    document.getElementById('info-uploader').textContent = data.uploader ? `@${data.uploader}` : '';
    document.getElementById('info-duration').textContent = data.duration
      ? `⏱ ${formatDuration(data.duration)}`
      : '';
    const thumb = document.getElementById('info-thumbnail');
    if (data.thumbnail) { thumb.src = data.thumbnail; thumb.style.display = ''; }
    else { thumb.style.display = 'none'; }

    // 更新分辨率选项
    if (data.resolutions && data.resolutions.length) {
      const sel = document.getElementById('quality-select');
      const cur = sel.value;
      // 保留 best 选项
      while (sel.options.length > 1) sel.remove(1);
      data.resolutions.forEach(h => {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = `${h}p`;
        sel.appendChild(opt);
      });
      sel.value = cur;
    }

    box.classList.remove('hidden');
  } catch (err) {
    showToast(`${t('toastFetchError')}: ${err.message}`, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span class="btn-icon-inline">🔍</span> ${t('btnFetch')}`;
  }
}

function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
}

// ══════════════════════════════════════════════════════════════════════════════
// 下载任务
// ══════════════════════════════════════════════════════════════════════════════

const activeTasks = new Map(); // task_id -> { card, eventSource }

async function startDownload() {
  const { urls, formats } = getAllUrlRowsData();
  if (!urls.length) { showToast(t('toastUrlEmpty'), 'error'); return; }

  const dlThumbnail = document.getElementById('chk-thumbnail')?.checked || false;
  const dlVideo = document.getElementById('chk-video')?.checked || false;
  const dlAudio = document.getElementById('chk-audio')?.checked || false;
  const dlSubtitle = document.getElementById('chk-subtitle')?.checked || false;

  if (!dlThumbnail && !dlVideo && !dlAudio && !dlSubtitle) {
    showToast(t('toastNoContentSelected'), 'error');
    return;
  }

  const cookieModeSelect = document.getElementById('cfg-cookie-mode');
  const browserNameSelect = document.getElementById('cfg-browser-name');

  const payload = {
    urls: urls,
    formats: formats,
    download_thumbnail: dlThumbnail,
    download_video: dlVideo,
    download_audio: dlAudio,
    download_subtitles: dlSubtitle,
    quality: document.getElementById('quality-select')?.value || 'best',
    video_format: document.getElementById('video-format-select')?.value || 'mp4',
    audio_format: document.getElementById('audio-format-select')?.value || 'mp3',
    subtitle_langs: document.getElementById('subtitle-langs')?.value || 'zh-Hans,zh,en',
    embed_subtitles: document.getElementById('chk-embed-sub')?.checked || false,
    turbo_mode: document.getElementById('chk-turbo')?.checked || false,
    playlist_start: document.getElementById('pl-start')?.value || '',
    playlist_end:   document.getElementById('pl-end')?.value || '',
    cookie_mode: cookieModeSelect ? cookieModeSelect.value : 'file',
    browser_name: browserNameSelect ? browserNameSelect.value : 'chrome',
  };

  try {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error');

    showToast(t('toastDownloadStarted'), 'success');
    createTaskCard(data.task_id, urls, data.status || 'queued');
    resetUrlRows();
    document.getElementById('video-info-box').classList.add('hidden');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function formatDownloadSpeed(speed) {
  if (speed === null || speed === undefined || speed === '' || speed === '—') {
    return '—';
  }
  let bytes = Number(speed);
  if (isNaN(bytes)) {
    const s = String(speed).trim();
    if (!s || s === '—') return '—';
    const m = s.match(/^([\d.]+)\s*([KMGTkmgt]?i?[Bb])\/s$/);
    if (m) {
      const val = parseFloat(m[1]);
      const unit = m[2].toUpperCase();
      const mult = {
        'B': 1,
        'KB': 1000, 'KIB': 1024,
        'MB': 1000*1000, 'MIB': 1024*1024,
        'GB': 1000*1000*1000, 'GIB': 1024*1024*1024,
      }[unit] || 1;
      bytes = val * mult;
    } else {
      const parsed = parseFloat(s);
      if (isNaN(parsed)) return '—';
      bytes = parsed;
    }
  }
  if (bytes <= 0) return '—';
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB/s`;
  }
  return `${Math.round(bytes)} B/s`;
}

function formatDownloadEta(eta) {
  if (eta === null || eta === undefined || eta === '' || eta === '—') {
    return '—';
  }
  let sec = Number(eta);
  if (isNaN(sec)) {
    const s = String(eta).trim().replace(/^ETA\s*/i, '');
    if (!s || s === '—') return '—';
    if (s.includes(':')) {
      const parts = s.split(':').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        sec = parts[0] * 60 + parts[1];
      } else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else {
        return s;
      }
    } else {
      sec = parseFloat(s);
      if (isNaN(sec)) return '—';
    }
  }
  sec = Math.round(sec);
  if (sec < 0) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ── 任务卡片 ──────────────────────────────────────────────────────────────────
function createTaskCard(taskId, urls, initialStatus = 'queued') {
  const tpl = document.getElementById('task-card-tpl');
  const clone = tpl.content.cloneNode(true);
  const card = clone.querySelector('.task-card');
  card.dataset.taskId = taskId;
  card.taskUrls = Array.isArray(urls) ? urls : [urls];

  const badge = card.querySelector('.task-badge');
  badge.dataset.status = initialStatus;
  badge.classList.add(initialStatus);
  badge.textContent = t('status' + initialStatus.charAt(0).toUpperCase() + initialStatus.slice(1));

  const titleEl = card.querySelector('.task-title');
  const urlsList = card.taskUrls;
  titleEl.textContent = urlsList.length === 1 ? urlsList[0] : `${urlsList.length} 个链接`;

  const stopBtn = card.querySelector('.task-stop-btn');
  stopBtn.textContent = t('btnStop');
  stopBtn.addEventListener('click', () => stopTask(taskId, card));

  const pauseBtn = card.querySelector('.task-pause-btn');
  if (pauseBtn) {
    pauseBtn.textContent = t('btnPause');
    pauseBtn.addEventListener('click', () => pauseTask(taskId, card));
  }

  const resumeBtn = card.querySelector('.task-resume-btn');
  if (resumeBtn) {
    resumeBtn.textContent = t('btnResume');
    resumeBtn.addEventListener('click', () => resumeTask(taskId, card));
  }

  const retryBtn = card.querySelector('.task-retry-btn');
  if (retryBtn) {
    retryBtn.textContent = t('btnRetry');
    retryBtn.addEventListener('click', () => retryTask(taskId, card));
  }

  const exportBtn = card.querySelector('.task-export-btn');
  exportBtn.textContent = t('btnExportLog');
  exportBtn.addEventListener('click', () => {
    const logFile = card.dataset.logFile;
    if (logFile) exportLog(logFile);
  });

  const openFileBtn = card.querySelector('.task-open-file-btn');
  if (openFileBtn) {
    openFileBtn.addEventListener('click', () => {
      if (card.dataset.filePath) openFile(card.dataset.filePath);
    });
  }

  const openFolderBtn = card.querySelector('.task-open-folder-btn');
  if (openFolderBtn) {
    openFolderBtn.addEventListener('click', () => {
      openFolder(card.dataset.filePath || 'downloads');
    });
  }

  const viewLogBtn = card.querySelector('.task-view-log-btn');
  if (viewLogBtn) {
    viewLogBtn.addEventListener('click', () => {
      if (card.dataset.logFile) viewLogModal(card.dataset.logFile);
    });
  }

  const container = document.getElementById('tasks-container');
  container.prepend(card);

  // 开始 SSE 监听
  startSSE(taskId, card);
}

function startSSE(taskId, card) {
  const es = new EventSource(`/api/progress/${taskId}`);
  activeTasks.set(taskId, { card, es });

  const fill          = card.querySelector('.progress-bar-fill');
  const badge         = card.querySelector('.task-badge');
  const pct           = card.querySelector('.stat-pct');
  const speed         = card.querySelector('.stat-speed');
  const eta           = card.querySelector('.stat-eta');
  const total         = card.querySelector('.stat-total');
  const log           = card.querySelector('.task-log');
  const title         = card.querySelector('.task-title');
  const exportBtn     = card.querySelector('.task-export-btn');
  const openFileBtn   = card.querySelector('.task-open-file-btn');
  const openFolderBtn = card.querySelector('.task-open-folder-btn');
  const viewLogBtn    = card.querySelector('.task-view-log-btn');
  const stopBtn       = card.querySelector('.task-stop-btn');
  const pauseBtn      = card.querySelector('.task-pause-btn');
  const resumeBtn     = card.querySelector('.task-resume-btn');
  const retryBtn      = card.querySelector('.task-retry-btn');
  const errBanner     = card.querySelector('.known-error-banner');
  const errMsg        = card.querySelector('.known-error-msg');
  const errHint       = card.querySelector('.known-error-hint');
  const errIcon       = card.querySelector('.known-error-icon');

  if (speed) speed.textContent = '—';
  if (eta) eta.textContent = '—';

  function setStatus(status) {
    badge.className = 'task-badge';
    badge.dataset.status = status;
    badge.classList.add(status);
    badge.textContent = t('status' + status.charAt(0).toUpperCase() + status.slice(1));

    if (status !== 'running') {
      if (speed) speed.textContent = '—';
      if (eta) eta.textContent = '—';
    }

    if (status === 'running') {
      if (pauseBtn) pauseBtn.classList.remove('hidden');
      if (resumeBtn) resumeBtn.classList.add('hidden');
      if (retryBtn) retryBtn.classList.add('hidden');
      if (stopBtn) stopBtn.style.display = '';
    } else if (status === 'paused') {
      if (pauseBtn) pauseBtn.classList.add('hidden');
      if (resumeBtn) resumeBtn.classList.remove('hidden');
      if (retryBtn) retryBtn.classList.add('hidden');
      if (stopBtn) stopBtn.style.display = 'none';
    } else if (status === 'error' || status === 'partial') {
      if (pauseBtn) pauseBtn.classList.add('hidden');
      if (resumeBtn) resumeBtn.classList.add('hidden');
      if (retryBtn) retryBtn.classList.remove('hidden');
      if (stopBtn) stopBtn.style.display = 'none';
    } else if (status === 'queued') {
      if (pauseBtn) pauseBtn.classList.add('hidden');
      if (resumeBtn) resumeBtn.classList.add('hidden');
      if (retryBtn) retryBtn.classList.add('hidden');
      if (stopBtn) stopBtn.style.display = '';
    } else {
      if (pauseBtn) pauseBtn.classList.add('hidden');
      if (resumeBtn) resumeBtn.classList.add('hidden');
      if (retryBtn) retryBtn.classList.add('hidden');
      if (stopBtn) stopBtn.style.display = 'none';
    }
  }

  es.addEventListener('status', e => {
    try {
      const d = JSON.parse(e.data);
      if (d.status) setStatus(d.status);
    } catch (_) {}
  });

  es.addEventListener('task_info', e => {
    setStatus('running');
    const d = JSON.parse(e.data);
    title.textContent = d.url;
    if (d.log_file) card.dataset.logFile = d.log_file;
  });

  es.addEventListener('task_update', e => {
    try {
      const d = JSON.parse(e.data);
      if (typeof d.percent === 'number') {
        fill.style.width = `${d.percent}%`;
        pct.textContent = `${d.percent.toFixed(1)}%`;
      }
      if (speed) speed.textContent = formatDownloadSpeed(d.speed);
      if (eta) eta.textContent = formatDownloadEta(d.eta);
    } catch (_) {}
  });

  // 已知错误事件 ── 直接显示横幅，不需要导出日志
  es.addEventListener('known_error', e => {
    const d = JSON.parse(e.data);
    const err = d.error;
    const typeKey = 'errorType' + err.type.charAt(0).toUpperCase() + err.type.slice(1);
    const icons = { network: '🌐', auth: '🔐', geo: '🗺', unavailable: '🚫', format: '⚙️', disk: '💾' };
    errIcon.textContent = icons[err.type] || '⚠️';
    errMsg.textContent = `${t(typeKey)}：${currentLang === 'zh' ? err.zh : err.en}`;
    errHint.textContent = t('knownErrHint');
    errBanner.className = `known-error-banner type-${err.type}`;
    if (d.log_file) card.dataset.logFile = d.log_file;
    if (viewLogBtn && d.log_file) viewLogBtn.classList.remove('hidden');
  });

  es.addEventListener('progress', e => {
    const d = JSON.parse(e.data);
    if (d.type === 'merging') {
      setStatus('merging');
      log.textContent = d.message || '';
      if (speed) speed.textContent = '—';
      if (eta) eta.textContent = '—';
      return;
    }
    if (d.type === 'progress' && typeof d.percent === 'number') {
      fill.style.width = `${d.percent}%`;
      pct.textContent = `${d.percent.toFixed(1)}%`;
      const spdVal = d.speed_bytes !== undefined ? d.speed_bytes : d.speed;
      const etaVal = d.eta_seconds !== undefined ? d.eta_seconds : d.eta;
      if (speed) speed.textContent = formatDownloadSpeed(spdVal);
      if (eta) eta.textContent   = formatDownloadEta(etaVal);
      total.textContent = d.total || '';
    }
    if (d.type === 'log' || d.type === 'info') {
      log.textContent = d.message || '';
    }
  });

  es.addEventListener('url_done', e => {
    const d = JSON.parse(e.data);
    if (speed) speed.textContent = '—';
    if (eta) eta.textContent = '—';
    if (d.log_file) card.dataset.logFile = d.log_file;
    if (d.file_path) card.dataset.filePath = d.file_path;
    if (d.title) title.textContent = d.title;

    if (d.success) {
      log.textContent = `✓ ${d.title || d.filename || d.url}`;
      fill.style.width = '100%';
      fill.classList.add('done');

      // 显示操作按钮
      if (openFileBtn && d.file_path) openFileBtn.classList.remove('hidden');
      if (openFolderBtn) openFolderBtn.classList.remove('hidden');
      if (viewLogBtn && d.log_file) viewLogBtn.classList.remove('hidden');
    } else {
      log.textContent = `✗ ${d.message || d.url}`;
      fill.classList.add('error');
      exportBtn.classList.remove('hidden');
      if (viewLogBtn && d.log_file) viewLogBtn.classList.remove('hidden');
    }
  });

  es.addEventListener('done', e => {
    const d = JSON.parse(e.data);
    if (speed) speed.textContent = '—';
    if (eta) eta.textContent = '—';
    if (d.log_file) card.dataset.logFile = d.log_file;
    const s = d.status === 'success' ? 'success'
            : d.status === 'cancelled' ? 'cancelled'
            : d.status === 'paused' ? 'paused'
            : d.status === 'partial' ? 'partial'
            : 'error';
    setStatus(s);
    if (s === 'success') {
      fill.style.width = '100%';
      // 成功完成后后台刷新历史记录
      loadHistory();
    } else if (s === 'error' || s === 'partial') {
      const hasKnownError = !errBanner.classList.contains('hidden');
      if (!hasKnownError && card.dataset.logFile) {
        exportBtn.classList.remove('hidden');
      }
      if (viewLogBtn && card.dataset.logFile) {
        viewLogBtn.classList.remove('hidden');
      }
      loadHistory();
    } else if (s === 'paused') {
      log.textContent = currentLang === 'zh' ? '已暂停下载' : 'Download paused';
    }
    card.querySelector('.task-stop-btn').style.display = 'none';
    es.close();
    activeTasks.delete(taskId);
  });

  es.addEventListener('end', () => {
    es.close();
    activeTasks.delete(taskId);
  });

  es.addEventListener('heartbeat', () => {}); // keep-alive

  es.onerror = () => {
    es.close();
    activeTasks.delete(taskId);
  };
}

async function openFile(filePath) {
  try {
    const res = await fetch('/api/open-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: filePath }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      showToast(`正在打开文件: ${data.path || filePath}`, 'info');
    } else {
      showToast(data.error || t('toastFileNotFound'), 'error');
    }
  } catch (e) {
    showToast(`无法连接后端服务，请确认 start.bat 是否正在运行: ${e.message}`, 'error');
  }
}

async function openFolder(target) {
  try {
    const res = await fetch('/api/open-folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: target }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      showToast(`已在资源管理器中打开所在文件夹: ${data.path}`, 'success');
    } else {
      showToast(data.error || '无法打开文件夹', 'error');
    }
  } catch (e) {
    showToast(`无法连接后端服务，请确认 start.bat 是否正在运行: ${e.message}`, 'error');
  }
}

async function stopTask(taskId, card) {
  try {
    await fetch(`/api/stop/${taskId}`, { method: 'POST' });
    const badge = card.querySelector('.task-badge');
    badge.className = 'task-badge cancelled';
    badge.textContent = t('statusCancelled');
    card.querySelector('.task-stop-btn').style.display = 'none';
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function pauseTask(taskId, card) {
  try {
    const res = await fetch(`/api/pause/${taskId}`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to pause');
    showToast(t('toastTaskPaused'), 'info');
    const badge = card.querySelector('.task-badge');
    if (badge) {
      badge.className = 'task-badge paused';
      badge.dataset.status = 'paused';
      badge.textContent = t('statusPaused');
    }
    const pauseBtn = card.querySelector('.task-pause-btn');
    const resumeBtn = card.querySelector('.task-resume-btn');
    const stopBtn = card.querySelector('.task-stop-btn');
    if (pauseBtn) pauseBtn.classList.add('hidden');
    if (resumeBtn) resumeBtn.classList.remove('hidden');
    if (stopBtn) stopBtn.style.display = 'none';
  } catch (err) {
    showToast(`${t('toastPauseError')}: ${err.message}`, 'error');
  }
}

async function resumeTask(taskId, card) {
  try {
    const res = await fetch(`/api/resume/${taskId}`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to resume');
    showToast(t('toastTaskResumed'), 'success');

    const resumeBtn = card.querySelector('.task-resume-btn');
    if (resumeBtn) resumeBtn.classList.add('hidden');
    const badge = card.querySelector('.task-badge');
    if (badge) {
      badge.className = 'task-badge cancelled';
      badge.dataset.status = 'cancelled';
      badge.textContent = t('statusCancelled');
    }

    const urls = card.taskUrls || [card.querySelector('.task-title')?.textContent || ''];
    createTaskCard(data.task_id, urls, data.status || 'queued');
  } catch (err) {
    showToast(`${t('toastResumeError')}: ${err.message}`, 'error');
  }
}

async function retryTask(taskId, cardOrUrls) {
  try {
    const res = await fetch(`/api/retry/${encodeURIComponent(taskId)}`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to retry');
    showToast(t('toastTaskRetried'), 'success');

    let urls = [];
    if (Array.isArray(cardOrUrls)) {
      urls = cardOrUrls;
    } else if (cardOrUrls && cardOrUrls.taskUrls) {
      urls = cardOrUrls.taskUrls;
    } else if (cardOrUrls && cardOrUrls.querySelector) {
      urls = [cardOrUrls.querySelector('.task-title')?.textContent || ''];
    }
    if (!urls || !urls.length) urls = ['...'];

    const downloadTabBtn = document.querySelector('.nav-tab[data-tab="download"]');
    if (downloadTabBtn && !downloadTabBtn.classList.contains('active')) {
      downloadTabBtn.click();
    }

    createTaskCard(data.task_id, urls, data.status || 'queued');
  } catch (err) {
    showToast(`${t('toastRetryError')}: ${err.message}`, 'error');
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 历史记录
// ══════════════════════════════════════════════════════════════════════════════

async function loadHistory() {
  const container = document.getElementById('history-list');
  try {
    const res = await fetch('/api/history');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    container.innerHTML = '';

    if (!list || !list.length) {
      container.innerHTML = `<div class="empty-state">${t('historyEmpty')}</div>`;
      return;
    }

    const tpl = document.getElementById('history-row-tpl');
    list.forEach(item => {
      const clone = tpl.content.cloneNode(true);
      const card = clone.querySelector('.history-card');
      card.dataset.historyId = item.id;

      const dot = card.querySelector('.hist-status-dot');
      dot.classList.add(item.status || 'success');

      const titleEl = card.querySelector('.hist-title');
      const displayTitle = item.title || item.filename || item.url;
      titleEl.textContent = displayTitle;
      titleEl.title = displayTitle;

      const urlEl = card.querySelector('.hist-url');
      urlEl.textContent = item.url;
      urlEl.title = item.url;

      const fmt = item.format === 'audio' ? (item.audio_format || 'mp3') : (item.video_format || 'mp4');
      card.querySelector('.hist-badge-fmt').textContent = fmt.toUpperCase();

      const sizeEl = card.querySelector('.hist-size');
      if (item.file_size) {
        const mb = (item.file_size / (1024 * 1024)).toFixed(1);
        sizeEl.textContent = `${mb} MB`;
      } else {
        sizeEl.textContent = '';
      }

      card.querySelector('.hist-time').textContent = formatTime(item.timestamp);

      // 操作按钮
      const btnRetry = card.querySelector('.hist-btn-retry');
      const btnOpenFile = card.querySelector('.hist-btn-open-file');
      const btnOpenFolder = card.querySelector('.hist-btn-open-folder');
      const btnViewLog = card.querySelector('.hist-btn-view-log');
      const btnDelete = card.querySelector('.hist-btn-delete');

      if (btnRetry) {
        btnRetry.textContent = t('btnRetry');
        if (item.status === 'error' || item.status === 'partial') {
          btnRetry.classList.remove('hidden');
          btnRetry.onclick = () => retryTask(item.task_id || item.id, [item.url]);
        } else {
          btnRetry.classList.add('hidden');
        }
      }

      const filePath = item.file_path || (item.filename ? `downloads/${item.filename}` : '');
      if (item.status === 'success' && item.file_exists !== false && filePath) {
        btnOpenFile.classList.remove('hidden');
        btnOpenFile.onclick = () => openFile(filePath);
      } else {
        btnOpenFile.classList.add('hidden');
      }

      btnOpenFolder.onclick = () => openFolder(filePath || item.download_path || 'downloads');

      if (item.log_file) {
        btnViewLog.onclick = () => viewLogModal(item.log_file);
      } else {
        btnViewLog.classList.add('hidden');
      }

      btnDelete.onclick = () => deleteHistoryItem(item.id, card);

      container.appendChild(card);
    });
  } catch (e) {
    console.error('Failed to load history:', e);
    container.innerHTML = `<div class="empty-state" style="color:var(--error)">加载历史记录失败: ${e.message}</div>`;
  }
}

async function deleteHistoryItem(id, cardEl) {
  try {
    const res = await fetch(`/api/history/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok) {
      cardEl.remove();
      showToast(t('toastDeleted'), 'success');
      const container = document.getElementById('history-list');
      if (!container.querySelector('.history-card')) {
        container.innerHTML = `<div class="empty-state">${t('historyEmpty')}</div>`;
      }
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

async function clearHistory() {
  if (!confirm(currentLang === 'zh' ? '确定要清除所有历史记录吗？' : 'Clear all history?')) return;
  await fetch('/api/history', { method: 'DELETE' });
  showToast(t('toastHistoryCleared'), 'success');
  loadHistory();
}

function formatTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  } catch { return iso; }
}

// ══════════════════════════════════════════════════════════════════════════════
// 日志管理 & 日志查看模态框
// ══════════════════════════════════════════════════════════════════════════════

let currentModalLog = '';

async function viewLogModal(filename) {
  const modal = document.getElementById('log-modal');
  const title = document.getElementById('log-modal-title');
  const content = document.getElementById('log-modal-content');

  currentModalLog = filename;
  title.textContent = filename;
  content.textContent = currentLang === 'zh' ? '正在加载日志…' : 'Loading log…';
  modal.classList.remove('hidden');

  try {
    const res = await fetch(`/api/logs/${encodeURIComponent(filename)}?format=json`, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    content.textContent = data.content || data.error || '(日志为空)';
  } catch (e) {
    content.textContent = `加载日志失败: ${e.message}`;
  }
}

function closeLogModal() {
  const modal = document.getElementById('log-modal');
  if (modal) modal.classList.add('hidden');
}

function openDonateModal() {
  const modal = document.getElementById('donate-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeDonateModal() {
  const modal = document.getElementById('donate-modal');
  if (modal) modal.classList.add('hidden');
}

function copyModalLog() {
  const content = document.getElementById('log-modal-content').textContent;
  if (!content) return;
  navigator.clipboard.writeText(content).then(() => {
    showToast(t('toastCopied'), 'success');
  }).catch(() => {
    showToast('复制失败', 'error');
  });
}

function downloadModalLog() {
  if (currentModalLog) {
    exportLog(currentModalLog);
  }
}

async function loadLogs() {
  try {
    const res = await fetch('/api/logs');
    const list = await res.json();
    const container = document.getElementById('log-file-list');
    container.innerHTML = '';

    if (!list.length) {
      container.innerHTML = `<div class="empty-state">${t('logsEmpty')}</div>`;
      return;
    }

    list.forEach(file => {
      const row = document.createElement('div');
      row.className = 'log-file-row';

      const sizeKB = (file.size / 1024).toFixed(1);
      const mtime = formatTime(file.mtime);

      row.innerHTML = `
        <span class="log-file-name" title="${file.name}">${file.name}</span>
        <span class="log-file-size">${sizeKB} KB · ${mtime}</span>
        <div class="log-file-actions">
          <button class="btn btn-ghost btn-xs" onclick="viewLogModal('${file.name}')">${t('btnViewLog')}</button>
          <button class="btn btn-ghost btn-xs" onclick="exportLog('${file.name}')">${t('btnDownloadLog')}</button>
          <button class="btn btn-ghost btn-xs" onclick="deleteLog('${file.name}', this)">${t('btnDeleteLog')}</button>
        </div>
      `;
      container.appendChild(row);
    });
  } catch (e) {
    console.error(e);
  }
}

function exportLog(filename) {
  const a = document.createElement('a');
  a.href = `/api/logs/${encodeURIComponent(filename)}/export`;
  a.download = filename;
  a.click();
}

async function deleteLog(filename, btn) {
  try {
    await fetch(`/api/logs/${encodeURIComponent(filename)}`, { method: 'DELETE' });
    showToast(t('toastLogDeleted'), 'success');
    loadLogs();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

async function clearAllLogs() {
  if (!confirm(currentLang === 'zh' ? '确定要清空所有日志吗？' : 'Clear all logs?')) return;
  await fetch('/api/logs', { method: 'DELETE' });
  showToast(t('toastLogsCleared'), 'success');
  loadLogs();
}

// ══════════════════════════════════════════════════════════════════════════════
// 设置
// ══════════════════════════════════════════════════════════════════════════════

function updateCookieVisibility(mode) {
  const rowBrowser = document.getElementById('row-cookie-browser');
  const rowFile = document.getElementById('row-cookie-file');
  if (rowBrowser) rowBrowser.classList.toggle('hidden', mode !== 'browser');
  if (rowFile) rowFile.classList.toggle('hidden', mode !== 'file');
}

async function loadSettings() {
  try {
    const res = await fetch('/api/config');
    const cfg = await res.json();
    document.getElementById('cfg-path').value       = cfg.download_path || '';
    document.getElementById('cfg-concurrent').value = cfg.max_concurrent || 3;
    document.getElementById('cfg-speed').value      = cfg.speed_limit || '';
    document.getElementById('cfg-proxy').value      = cfg.proxy || '';

    const mode = cfg.cookie_mode || 'file';
    const modeSelect = document.getElementById('cfg-cookie-mode');
    if (modeSelect) {
      modeSelect.value = mode;
      updateCookieVisibility(mode);
    }
    const browserSelect = document.getElementById('cfg-browser-name');
    if (browserSelect) {
      browserSelect.value = cfg.browser_name || 'chrome';
    }
    const chkTurbo = document.getElementById('chk-turbo');
    if (chkTurbo && cfg.turbo_mode !== undefined) {
      chkTurbo.checked = Boolean(cfg.turbo_mode);
    }
    refreshCookieStatus();
  } catch (e) {
    console.error(e);
  }
}

async function saveSettings() {
  const cookieModeSelect = document.getElementById('cfg-cookie-mode');
  const browserNameSelect = document.getElementById('cfg-browser-name');

  const cfg = {
    download_path:  document.getElementById('cfg-path').value.trim(),
    max_concurrent: parseInt(document.getElementById('cfg-concurrent').value) || 3,
    speed_limit:    document.getElementById('cfg-speed').value.trim(),
    proxy:          document.getElementById('cfg-proxy').value.trim(),
    cookie_mode:    cookieModeSelect ? cookieModeSelect.value : 'file',
    browser_name:   browserNameSelect ? browserNameSelect.value : 'chrome',
    language:       currentLang,
    turbo_mode:     document.getElementById('chk-turbo')?.checked || false,
  };
  await fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cfg),
  });
  showToast(t('toastSaved'), 'success');
  flashStatus('save-status', t('toastSaved'));
}

function flashStatus(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = `✓ ${msg}`;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 3000);
}

// ══════════════════════════════════════════════════════════════════════════════
// Cookie 状态与 Bilibili 扫码获取
// ══════════════════════════════════════════════════════════════════════════════

let platformQrPollTimer = null;
let platformQrCodeObj = null;
let currentQrPlatform = 'bilibili';

async function refreshCookieStatus() {
  try {
    const res = await fetch('/api/cookie');
    const data = await res.json();

    const mainBadge = document.getElementById('main-cookie-badge');
    const cfgBadge  = document.getElementById('cfg-cookie-badge');
    const cfgDetail = document.getElementById('cfg-cookie-details');

    if (data.exists) {
      const logged = [];
      if (data.has_bilibili) logged.push(t('cookieLoggedBili'));
      if (data.has_xiaohongshu) logged.push(t('cookieLoggedXhs'));
      if (data.has_youtube) logged.push('YouTube');
      const text = logged.length ? `✓ ${currentLang === 'zh' ? '已登录 ' : 'Logged in: '}${logged.join('+')}` : t('cookieConfigured');
      if (mainBadge) {
        mainBadge.textContent = text;
        mainBadge.className = 'cookie-status-badge configured';
      }
      if (cfgBadge) {
        cfgBadge.textContent = text;
        cfgBadge.className = 'cookie-status-badge configured';
      }
      if (cfgDetail) {
        cfgDetail.textContent = `${data.summary} (${formatBytes(data.size)}) - ${data.mtime || ''}`;
      }
    } else {
      if (mainBadge) {
        mainBadge.textContent = currentLang === 'zh' ? '未配置' : 'Not configured';
        mainBadge.className = 'cookie-status-badge unconfigured';
      }
      if (cfgBadge) {
        cfgBadge.textContent = currentLang === 'zh' ? '未配置' : 'Not configured';
        cfgBadge.className = 'cookie-status-badge unconfigured';
      }
      if (cfgDetail) {
        cfgDetail.textContent = currentLang === 'zh' ? '尚未添加 Cookie（下载 1080P 60帧/4K 或受限视频需登录）' : 'No cookies added yet (required for 1080P/4K or restricted videos)';
      }
    }
  } catch (err) {
    console.error('refreshCookieStatus error:', err);
  }
}

async function openPlatformQrModal(platform = 'bilibili') {
  currentQrPlatform = platform;
  const modal = document.getElementById('bili-qr-modal');
  const titleEl = document.getElementById('qr-modal-title');
  const subtextEl = document.getElementById('bili-qr-subtext');
  const canvasEl = document.getElementById('bili-qr-canvas');
  const overlay = document.getElementById('bili-qr-overlay');
  const msgEl = document.getElementById('bili-qr-msg');

  if (!modal) return;
  modal.classList.remove('hidden');
  if (overlay) overlay.classList.add('hidden');

  if (platform === 'xiaohongshu') {
    if (titleEl) titleEl.textContent = t('qrModalTitleXhs');
    if (subtextEl) subtextEl.innerHTML = t('qrModalSubtextXhs');
  } else {
    if (titleEl) titleEl.textContent = t('qrModalTitleBili');
    if (subtextEl) subtextEl.innerHTML = t('qrModalSubtextBili');
  }

  if (msgEl) msgEl.textContent = t('qrStatusGenerating');
  if (canvasEl) canvasEl.innerHTML = '';

  if (platformQrPollTimer) {
    clearInterval(platformQrPollTimer);
    platformQrPollTimer = null;
  }

  try {
    const qrcodeEndpoint = platform === 'xiaohongshu' ? '/api/xiaohongshu/qrcode' : '/api/bilibili/qrcode';
    const res = await fetch(qrcodeEndpoint);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || t('advFetchFailed'));

    canvasEl.innerHTML = '';
    platformQrCodeObj = new QRCode(canvasEl, {
      text: data.url,
      width: 180,
      height: 180,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });

    if (msgEl) {
      msgEl.textContent = platform === 'xiaohongshu' ? t('qrStatusScanXhs') : t('qrStatusScanBili');
    }

    const pollUrl = platform === 'xiaohongshu'
      ? `/api/xiaohongshu/poll?qr_id=${encodeURIComponent(data.qr_id)}&code=${encodeURIComponent(data.code)}`
      : `/api/bilibili/poll?qrcode_key=${encodeURIComponent(data.qrcode_key)}`;

    platformQrPollTimer = setInterval(async () => {
      try {
        const pollRes = await fetch(pollUrl);
        const pollData = await pollRes.json();

        if (pollData.code === 0) {
          clearInterval(platformQrPollTimer);
          platformQrPollTimer = null;
          closePlatformQrModal();
          const toastMsg = platform === 'xiaohongshu' ? t('toastXhsSuccess') : t('toastBiliSuccess');
          showToast(toastMsg, 'success');
          refreshCookieStatus();
        } else if (pollData.code === 86090) {
          if (msgEl) msgEl.textContent = t('qrStatusScanned');
        } else if (pollData.code === 86038) {
          clearInterval(platformQrPollTimer);
          platformQrPollTimer = null;
          if (overlay) overlay.classList.remove('hidden');
          if (msgEl) msgEl.textContent = t('qrStatusExpired');
        }
      } catch (e) {
        console.error('Poll error:', e);
      }
    }, 1500);

  } catch (err) {
    if (msgEl) msgEl.textContent = `${t('advFetchFailed')}: ${err.message}`;
  }
}

function closePlatformQrModal() {
  const modal = document.getElementById('bili-qr-modal');
  if (modal) modal.classList.add('hidden');
  if (platformQrPollTimer) {
    clearInterval(platformQrPollTimer);
    platformQrPollTimer = null;
  }
}

// 兼容别名
function openBiliQrModal() {
  openPlatformQrModal('bilibili');
}

function closeBiliQrModal() {
  closePlatformQrModal();
}

async function readClipboardCookie() {
  try {
    let text = '';
    if (navigator.clipboard && navigator.clipboard.readText) {
      text = await navigator.clipboard.readText();
    }
    if (!text || !text.trim()) {
      showToast('剪贴板为空，请先复制 Cookie 或 SESSDATA 后点击', 'error');
      const txtArea = document.getElementById('cfg-cookie-text');
      if (txtArea) txtArea.focus();
      return;
    }

    const res = await fetch('/api/cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text.trim() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '保存失败');

    showToast('✓ 剪贴板 Cookie 已成功保存并启用！', 'success');
    refreshCookieStatus();
  } catch (err) {
    showToast(`读取剪贴板失败: ${err.message}`, 'error');
    const txtArea = document.getElementById('cfg-cookie-text');
    if (txtArea) txtArea.focus();
  }
}

async function savePastedCookie() {
  const txtArea = document.getElementById('cfg-cookie-text');
  const content = txtArea ? txtArea.value.trim() : '';
  if (!content) {
    showToast('请输入或粘贴 Cookie 内容', 'error');
    return;
  }

  try {
    const res = await fetch('/api/cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '保存失败');

    showToast('✓ Cookie 保存成功并已启用！', 'success');
    if (txtArea) txtArea.value = '';
    refreshCookieStatus();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Cookie 上传
async function uploadCookie(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload-cookie', { method: 'POST', body: fd });
  const data = await res.json();
  if (data.ok) {
    showToast(t('toastCookieUploaded'), 'success');
    refreshCookieStatus();
  } else {
    showToast(data.error || 'Error', 'error');
  }
}

async function clearCookie() {
  try {
    await fetch('/api/cookie', { method: 'DELETE' });
    showToast(t('toastCookieCleared'), 'success');
    refreshCookieStatus();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// 一键更新 yt-dlp
async function updateYtdlp() {
  const btn = document.getElementById('btn-update-ytdlp');
  const outputEl = document.getElementById('update-output');
  const statusEl = document.getElementById('update-status');

  btn.disabled = true;
  btn.textContent = currentLang === 'zh' ? '正在更新…' : 'Updating…';
  outputEl.classList.add('hidden');
  statusEl.textContent = '';

  try {
    const res = await fetch('/api/update-ytdlp', { method: 'POST' });
    const data = await res.json();
    outputEl.textContent = data.output || '';
    outputEl.classList.remove('hidden');
    showToast(t('toastUpdateDone'), 'success');
    flashStatus('update-status', t('toastUpdateDone'));
    // 刷新版本显示
    loadVersion();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span class="btn-icon-inline">🔄</span> ${t('btnUpdateYtdlp')}`;
  }
}

// 打开下载文件夹（通过后端）
async function openDownloadFolder() {
  const path = document.getElementById('cfg-path').value || 'downloads';
  openFolder(path);
}

// ══════════════════════════════════════════════════════════════════════════════
// 版本信息
// ══════════════════════════════════════════════════════════════════════════════

async function loadVersion() {
  try {
    const res = await fetch('/api/version');
    const data = await res.json();
    const badge = document.getElementById('version-badge');
    if (badge) {
      badge.title = `YT-DLP WebUI v${data.app || '1.3.2'} | yt-dlp ${data.yt_dlp} | ffmpeg ${data.ffmpeg}`;
    }
    document.getElementById('version-text').textContent = `v${data.app || '1.3.2'}`;
  } catch (e) { /* ignore */ }
}

// ══════════════════════════════════════════════════════════════════════════════
// 初始化
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 语言初始化
  document.getElementById('lang-label').textContent = currentLang === 'zh' ? 'EN' : '中';
  applyI18n();

  // 事件绑定
  initTabs();
  initFormatToggle();
  initAdvancedSection();

  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('btn-fetch-info').addEventListener('click', fetchVideoInfo);
  document.getElementById('btn-download').addEventListener('click', startDownload);
  document.getElementById('btn-clear-history').addEventListener('click', clearHistory);
  document.getElementById('btn-save-settings').addEventListener('click', saveSettings);
  document.getElementById('btn-update-ytdlp').addEventListener('click', updateYtdlp);
  document.getElementById('btn-clear-cookie').addEventListener('click', clearCookie);
  document.getElementById('btn-open-folder').addEventListener('click', openDownloadFolder);
  document.getElementById('btn-clear-logs').addEventListener('click', clearAllLogs);

  // 刷新历史按钮
  const btnRefreshHist = document.getElementById('btn-refresh-history');
  if (btnRefreshHist) {
    btnRefreshHist.addEventListener('click', () => {
      loadHistory();
      showToast(t('btnRefresh'), 'info', 1500);
    });
  }

  // Cookie 模式切换
  const cookieModeSelect = document.getElementById('cfg-cookie-mode');
  if (cookieModeSelect) {
    cookieModeSelect.addEventListener('change', e => updateCookieVisibility(e.target.value));
  }

  // 日志模态框关闭与复制
  const btnCloseModal = document.getElementById('btn-close-modal-log');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeLogModal);

  const btnCopyModal = document.getElementById('btn-copy-modal-log');
  if (btnCopyModal) btnCopyModal.addEventListener('click', copyModalLog);

  const btnDownloadModal = document.getElementById('btn-download-modal-log');
  if (btnDownloadModal) btnDownloadModal.addEventListener('click', downloadModalLog);

  const modalBackdrop = document.getElementById('log-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) closeLogModal();
    });
  }

  // 赞助模态框绑定
  const btnHeaderDonate = document.getElementById('btn-header-donate');
  if (btnHeaderDonate) btnHeaderDonate.addEventListener('click', openDonateModal);

  const btnSettingsDonate = document.getElementById('btn-settings-donate');
  if (btnSettingsDonate) btnSettingsDonate.addEventListener('click', openDonateModal);

  const btnCloseDonate = document.getElementById('btn-close-donate');
  if (btnCloseDonate) btnCloseDonate.addEventListener('click', closeDonateModal);

  const modalDonateBackdrop = document.getElementById('donate-modal');
  if (modalDonateBackdrop) {
    modalDonateBackdrop.addEventListener('click', e => {
      if (e.target === modalDonateBackdrop) closeDonateModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLogModal();
      closePlatformQrModal();
      closeDonateModal();
    }
  });

  // 平台扫码与 Cookie 按钮绑定
  const btnQuickBiliQr = document.getElementById('btn-quick-bili-qr');
  if (btnQuickBiliQr) btnQuickBiliQr.addEventListener('click', () => openPlatformQrModal('bilibili'));

  const btnQuickXhsQr = document.getElementById('btn-quick-xhs-qr');
  if (btnQuickXhsQr) btnQuickXhsQr.addEventListener('click', () => openPlatformQrModal('xiaohongshu'));

  const btnCfgBiliQr = document.getElementById('btn-cfg-bili-qr');
  if (btnCfgBiliQr) btnCfgBiliQr.addEventListener('click', () => openPlatformQrModal('bilibili'));

  const btnCfgXhsQr = document.getElementById('btn-cfg-xhs-qr');
  if (btnCfgXhsQr) btnCfgXhsQr.addEventListener('click', () => openPlatformQrModal('xiaohongshu'));

  const btnCloseBiliQr = document.getElementById('btn-close-bili-qr');
  if (btnCloseBiliQr) btnCloseBiliQr.addEventListener('click', closePlatformQrModal);

  const btnRefreshBiliQr = document.getElementById('btn-refresh-bili-qr');
  if (btnRefreshBiliQr) btnRefreshBiliQr.addEventListener('click', () => openPlatformQrModal(currentQrPlatform));

  const modalBiliQr = document.getElementById('bili-qr-modal');
  if (modalBiliQr) {
    modalBiliQr.addEventListener('click', e => {
      if (e.target === modalBiliQr) closePlatformQrModal();
    });
  }

  const btnQuickClip = document.getElementById('btn-quick-paste-clip');
  if (btnQuickClip) btnQuickClip.addEventListener('click', readClipboardCookie);

  const btnCfgClip = document.getElementById('btn-cfg-paste-clip');
  if (btnCfgClip) btnCfgClip.addEventListener('click', readClipboardCookie);

  const btnSaveCookieText = document.getElementById('btn-save-cookie-text');
  if (btnSaveCookieText) btnSaveCookieText.addEventListener('click', savePastedCookie);

  const btnClearCookie = document.getElementById('btn-clear-cookie');
  if (btnClearCookie) btnClearCookie.addEventListener('click', clearCookie);

  const cookieFileInput = document.getElementById('cookie-file-input');
  if (cookieFileInput) {
    cookieFileInput.addEventListener('change', e => {
      const f = e.target.files[0];
      if (f) uploadCookie(f);
    });
  }

  // URL 输入行事件初始化
  const firstRow = document.querySelector('.url-input-row');
  if (firstRow) {
    bindUrlRowEvents(firstRow);
    updateRemoveButtonsVisibility();
  }

  const btnAddUrlRow = document.getElementById('btn-add-url-row');
  if (btnAddUrlRow) {
    btnAddUrlRow.addEventListener('click', () => addUrlRow(''));
  }

  // 初始加载
  loadVersion();
  loadHistory();
  loadSettings();
  refreshCookieStatus();

  // 粘贴即识别
  const firstInput = document.getElementById('url-input');
  if (firstInput) {
    firstInput.addEventListener('paste', () => {
      setTimeout(() => {
        const val = firstInput.value.trim();
        if (val && !val.includes('\n')) {
          setTimeout(fetchVideoInfo, 300);
        }
      }, 50);
    });
  }
});
