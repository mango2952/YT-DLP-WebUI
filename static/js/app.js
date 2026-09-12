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
    optType: '类型',
    optVideo: '视频',
    optAudio: '仅音频',
    optQuality: '视频质量',
    qualBest: '最佳质量',
    optVideoFmt: '视频格式',
    optAudioFmt: '音频格式',
    optSubtitle: '字幕',
    optEmbedSub: '嵌入视频',
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
    statusRunning: '下载中',
    statusSuccess: '完成',
    statusError: '失败',
    statusMerging: '合并中',
    statusCancelled: '已停止',
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
    aboutDevDesc: '本产品全栈架构、功能实现与 Web 界面均基于 Google Antigravity 智能编程开发完成。',
    logModalHint: '如遇软件报错，可点击【导出】将日志文件发送至作者邮箱：',
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
    optType: 'Type',
    optVideo: 'Video',
    optAudio: 'Audio Only',
    optQuality: 'Quality',
    qualBest: 'Best Quality',
    optVideoFmt: 'Video Format',
    optAudioFmt: 'Audio Format',
    optSubtitle: 'Subtitles',
    optEmbedSub: 'Embed',
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
    statusRunning: 'Downloading',
    statusSuccess: 'Done',
    statusError: 'Error',
    statusMerging: 'Merging',
    statusCancelled: 'Stopped',
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
    aboutDevDesc: 'This project was architected, designed and implemented using Google Antigravity.',
    logModalHint: 'If you encounter an error, export and email logs to:',
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

let selectedFormat = 'video';

function initFormatToggle() {
  document.querySelectorAll('#format-seg .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#format-seg .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFormat = btn.dataset.value;
      const isAudio = selectedFormat === 'audio';
      document.getElementById('quality-group').classList.toggle('hidden', isAudio);
      document.getElementById('video-format-group').classList.toggle('hidden', isAudio);
      document.getElementById('audio-format-group').classList.toggle('hidden', !isAudio);
    });
  });

  // Subtitle toggle
  const chkSub = document.getElementById('chk-subtitle');
  chkSub.addEventListener('change', () => {
    document.getElementById('subtitle-langs-wrap').classList.toggle('hidden', !chkSub.checked);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 视频信息识别
// ══════════════════════════════════════════════════════════════════════════════

async function fetchVideoInfo() {
  const urlInput = document.getElementById('url-input');
  const url = urlInput.value.trim().split('\n')[0].trim();
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
  const urlsRaw = document.getElementById('url-input').value.trim();
  if (!urlsRaw) { showToast(t('toastUrlEmpty'), 'error'); return; }

  const cookieModeSelect = document.getElementById('cfg-cookie-mode');
  const browserNameSelect = document.getElementById('cfg-browser-name');

  const payload = {
    urls: urlsRaw,
    format:  selectedFormat,
    quality: document.getElementById('quality-select').value,
    video_format: document.getElementById('video-format-select').value,
    audio_format: document.getElementById('audio-format-select').value,
    download_subtitles: document.getElementById('chk-subtitle').checked,
    subtitle_langs: document.getElementById('subtitle-langs').value,
    embed_subtitles: document.getElementById('chk-embed-sub').checked,
    playlist_start: document.getElementById('pl-start').value,
    playlist_end:   document.getElementById('pl-end').value,
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
    createTaskCard(data.task_id, urlsRaw.split('\n').filter(Boolean));
    document.getElementById('url-input').value = '';
    document.getElementById('video-info-box').classList.add('hidden');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ── 任务卡片 ──────────────────────────────────────────────────────────────────
function createTaskCard(taskId, urls) {
  const tpl = document.getElementById('task-card-tpl');
  const clone = tpl.content.cloneNode(true);
  const card = clone.querySelector('.task-card');
  card.dataset.taskId = taskId;

  const badge = card.querySelector('.task-badge');
  badge.classList.add('running');
  badge.textContent = t('statusRunning');

  const titleEl = card.querySelector('.task-title');
  titleEl.textContent = urls.length === 1 ? urls[0] : `${urls.length} 个链接`;

  const stopBtn = card.querySelector('.task-stop-btn');
  stopBtn.textContent = t('btnStop');
  stopBtn.addEventListener('click', () => stopTask(taskId, card));

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
  const errBanner     = card.querySelector('.known-error-banner');
  const errMsg        = card.querySelector('.known-error-msg');
  const errHint       = card.querySelector('.known-error-hint');
  const errIcon       = card.querySelector('.known-error-icon');

  function setStatus(status) {
    badge.className = 'task-badge';
    badge.classList.add(status);
    badge.textContent = t('status' + status.charAt(0).toUpperCase() + status.slice(1));
  }

  es.addEventListener('task_info', e => {
    const d = JSON.parse(e.data);
    title.textContent = d.url;
    if (d.log_file) card.dataset.logFile = d.log_file;
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
      return;
    }
    if (d.type === 'progress' && typeof d.percent === 'number') {
      fill.style.width = `${d.percent}%`;
      pct.textContent = `${d.percent.toFixed(1)}%`;
      speed.textContent = d.speed || '';
      eta.textContent   = d.eta ? `ETA ${d.eta}` : '';
      total.textContent = d.total || '';
    }
    if (d.type === 'log' || d.type === 'info') {
      log.textContent = d.message || '';
    }
  });

  es.addEventListener('url_done', e => {
    const d = JSON.parse(e.data);
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
    if (d.log_file) card.dataset.logFile = d.log_file;
    const s = d.status === 'success' ? 'success' : d.status === 'cancelled' ? 'cancelled' : 'error';
    setStatus(s);
    if (s === 'success') {
      fill.style.width = '100%';
      // 成功完成后后台刷新历史记录
      loadHistory();
    } else if (s === 'error') {
      const hasKnownError = !errBanner.classList.contains('hidden');
      if (!hasKnownError && card.dataset.logFile) {
        exportBtn.classList.remove('hidden');
      }
      if (viewLogBtn && card.dataset.logFile) {
        viewLogBtn.classList.remove('hidden');
      }
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
      const btnOpenFile = card.querySelector('.hist-btn-open-file');
      const btnOpenFolder = card.querySelector('.hist-btn-open-folder');
      const btnViewLog = card.querySelector('.hist-btn-view-log');
      const btnDelete = card.querySelector('.hist-btn-delete');

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

let biliQrPollTimer = null;
let biliQrCodeObj = null;

async function refreshCookieStatus() {
  try {
    const res = await fetch('/api/cookie');
    const data = await res.json();

    const mainBadge = document.getElementById('main-cookie-badge');
    const cfgBadge  = document.getElementById('cfg-cookie-badge');
    const cfgDetail = document.getElementById('cfg-cookie-details');

    if (data.exists) {
      const text = data.has_bilibili ? '✓ 已登录 B站' : '✓ 已配置 Cookie';
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
        mainBadge.textContent = '未配置';
        mainBadge.className = 'cookie-status-badge unconfigured';
      }
      if (cfgBadge) {
        cfgBadge.textContent = '未配置';
        cfgBadge.className = 'cookie-status-badge unconfigured';
      }
      if (cfgDetail) {
        cfgDetail.textContent = '尚未添加 Cookie（下载 1080P 60帧/4K 或受限视频需登录）';
      }
    }
  } catch (err) {
    console.error('refreshCookieStatus error:', err);
  }
}

async function openBiliQrModal() {
  const modal = document.getElementById('bili-qr-modal');
  const canvasEl = document.getElementById('bili-qr-canvas');
  const overlay = document.getElementById('bili-qr-overlay');
  const msgEl = document.getElementById('bili-qr-msg');

  if (!modal) return;
  modal.classList.remove('hidden');
  if (overlay) overlay.classList.add('hidden');
  if (msgEl) msgEl.textContent = '正在获取登录二维码…';
  if (canvasEl) canvasEl.innerHTML = '';

  if (biliQrPollTimer) {
    clearInterval(biliQrPollTimer);
    biliQrPollTimer = null;
  }

  try {
    const res = await fetch('/api/bilibili/qrcode');
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || '获取二维码失败');

    canvasEl.innerHTML = '';
    biliQrCodeObj = new QRCode(canvasEl, {
      text: data.url,
      width: 180,
      height: 180,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });

    if (msgEl) msgEl.textContent = '请打开手机哔哩哔哩客户端扫一扫登录';

    biliQrPollTimer = setInterval(async () => {
      try {
        const pollRes = await fetch(`/api/bilibili/poll?qrcode_key=${encodeURIComponent(data.qrcode_key)}`);
        const pollData = await pollRes.json();

        if (pollData.code === 0) {
          clearInterval(biliQrPollTimer);
          biliQrPollTimer = null;
          closeBiliQrModal();
          showToast('🎉 B站 Cookie 同步成功！已自动保存并启用', 'success');
          refreshCookieStatus();
        } else if (pollData.code === 86090) {
          if (msgEl) msgEl.textContent = '✓ 已扫码，请在手机上确认登录…';
        } else if (pollData.code === 86038) {
          clearInterval(biliQrPollTimer);
          biliQrPollTimer = null;
          if (overlay) overlay.classList.remove('hidden');
          if (msgEl) msgEl.textContent = '二维码已失效，请点击刷新';
        }
      } catch (e) {
        console.error('Poll error:', e);
      }
    }, 1500);

  } catch (err) {
    if (msgEl) msgEl.textContent = `生成失败: ${err.message}`;
  }
}

function closeBiliQrModal() {
  const modal = document.getElementById('bili-qr-modal');
  if (modal) modal.classList.add('hidden');
  if (biliQrPollTimer) {
    clearInterval(biliQrPollTimer);
    biliQrPollTimer = null;
  }
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
      badge.title = `YT-DLP WebUI v${data.app || '1.0.2'} | yt-dlp ${data.yt_dlp} | ffmpeg ${data.ffmpeg}`;
    }
    document.getElementById('version-text').textContent = `v${data.app || '1.0.2'}`;
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
      closeBiliQrModal();
      closeDonateModal();
    }
  });

  // Bilibili 扫码与 Cookie 按钮绑定
  const btnQuickBiliQr = document.getElementById('btn-quick-bili-qr');
  if (btnQuickBiliQr) btnQuickBiliQr.addEventListener('click', openBiliQrModal);

  const btnCfgBiliQr = document.getElementById('btn-cfg-bili-qr');
  if (btnCfgBiliQr) btnCfgBiliQr.addEventListener('click', openBiliQrModal);

  const btnCloseBiliQr = document.getElementById('btn-close-bili-qr');
  if (btnCloseBiliQr) btnCloseBiliQr.addEventListener('click', closeBiliQrModal);

  const btnRefreshBiliQr = document.getElementById('btn-refresh-bili-qr');
  if (btnRefreshBiliQr) btnRefreshBiliQr.addEventListener('click', openBiliQrModal);

  const modalBiliQr = document.getElementById('bili-qr-modal');
  if (modalBiliQr) {
    modalBiliQr.addEventListener('click', e => {
      if (e.target === modalBiliQr) closeBiliQrModal();
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

  // URL 输入框 Ctrl+Enter 快捷下载
  document.getElementById('url-input').addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') startDownload();
  });

  // 初始加载
  loadVersion();
  loadHistory();
  refreshCookieStatus();

  // 粘贴即识别
  document.getElementById('url-input').addEventListener('paste', () => {
    setTimeout(() => {
      const val = document.getElementById('url-input').value.trim();
      if (val && !val.includes('\n')) {
        setTimeout(fetchVideoInfo, 300);
      }
    }, 50);
  });
});
