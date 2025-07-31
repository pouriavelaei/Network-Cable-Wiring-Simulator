class NetworkCableSimulator {
            constructor() {
                this.score = 0;
                this.attempts = 0;
                this.connections = {
                    socket1: {},
                    socket2: {}
                };
                
                // Language support
                this.currentLanguage = 'en';
                this.translations = this.initTranslations();
                
                // New properties for enhanced features
                this.difficulty = 'easy';
                this.timeLimit = 0;
                this.timeRemaining = 0;
                this.timer = null;
                this.soundEnabled = true;
                this.highScore = localStorage.getItem('networkCableHighScore') || 0;
                
                this.wireColors = {
                    'White-Orange': { class: 'wire-white-orange', cssVar: 'linear-gradient(135deg, #fff 0%, #fff 50%, #ff8c00 50%, #ff8c00 100%)' },
                    'Orange': { class: 'wire-orange', cssVar: 'linear-gradient(135deg, #ff8c00, #ff6600)' },
                    'White-Green': { class: 'wire-white-green', cssVar: 'linear-gradient(135deg, #fff 0%, #fff 50%, #32cd32 50%, #32cd32 100%)' },
                    'Blue': { class: 'wire-blue', cssVar: 'linear-gradient(135deg, #0066ff, #0044cc)' },
                    'White-Blue': { class: 'wire-white-blue', cssVar: 'linear-gradient(135deg, #fff 0%, #fff 50%, #0066ff 50%, #0066ff 100%)' },
                    'Green': { class: 'wire-green', cssVar: 'linear-gradient(135deg, #32cd32, #228b22)' },
                    'White-Brown': { class: 'wire-white-brown', cssVar: 'linear-gradient(135deg, #fff 0%, #fff 50%, #8b4513 50%, #8b4513 100%)' },
                    'Brown': { class: 'wire-brown', cssVar: 'linear-gradient(135deg, #8b4513, #654321)' }
                };

                this.standards = {
                    T568A: ['White-Green', 'Green', 'White-Orange', 'Blue', 'White-Blue', 'Orange', 'White-Brown', 'Brown'],
                    T568B: ['White-Orange', 'Orange', 'White-Green', 'Blue', 'White-Blue', 'Green', 'White-Brown', 'Brown'],
                    CrossOver: ['White-Green', 'Green', 'White-Orange', 'Blue', 'White-Blue', 'Orange', 'White-Brown', 'Brown']
                };
                
                // Current selected standard for straight-through cables
                this.selectedStandard = 'T568B';

                this.currentDraggedWire = null;
                this.init();
            }

            initTranslations() {
                return {
                    en: {
                        // Header
                        headerTitle: "🔌 Network Cable Wiring Simulator",
                        headerSubtitle: "Practical Training for Network Device Connections",
                        
                        // Language Toggle
                        languageToggle: "🌐 فارسی",
                        soundToggle: "🔊 Sound",
                        
                        // Difficulty
                        difficultyTitle: "Select Game Level",
                        easyBtn: "Easy (No Timer)",
                        mediumBtn: "Medium (5 Minutes)",
                        hardBtn: "Hard (3 Minutes)",
                        
                        // Timer
                        timerLabel: "Time Remaining",
                        
                        // High Score
                        highScoreText: "Best Score:",
                        
                        // Devices
                        device1Title: "First Device",
                        device2Title: "Second Device",
                        router: "Router",
                        switch: "Switch",
                        pc: "Computer (PC)",
                        server: "Server",
                        
                        // Connection Info
                        connectionTypeLabel: "Connection Type:",
                        recommendedStandardLabel: "Recommended Standard:",
                        
                        // Standard Selector
                        standardSelectorLabel: "Choose Standard for Straight-Through:",
                        standardT568ALabel: "T568A",
                        standardT568BLabel: "T568B",
                        
                        // Sockets
                        socket1Label: "First Connector",
                        socket2Label: "Second Connector",
                        cableLabel: "Network Cable",
                        
                        // Wire Palette
                        wirePaletteTitle: "Wire Palette - Drag wires to pins",
                        shuffleText: "Shuffle",
                        
                        // Score Panel
                        scoreLabel: "Score",
                        attemptsLabel: "Attempts",
                        connectionsLabel: "Correct Connections",
                        
                        // Buttons
                        checkBtn: "Check Cable",
                        hintBtn: "Hint",
                        resetBtn: "Clear",
                        newCableBtn: "New Cable",
                        
                        // Wire Colors
                        wireColors: {
                            'White-Orange': 'White-Orange',
                            'Orange': 'Orange',
                            'White-Green': 'White-Green',
                            'Blue': 'Blue',
                            'White-Blue': 'White-Blue',
                            'Green': 'Green',
                            'White-Brown': 'White-Brown',
                            'Brown': 'Brown'
                        },
                        
                        // Messages
                        messages: {
                            wireSelected: "Wire {wire} selected. Click on desired pin.",
                            wireShuffled: "🔀 Wires shuffled!",
                            levelSelected: "Level {level} selected!",
                            soundOn: "Sound turned on",
                            soundOff: "Sound turned off",
                            connectionsClear: "Connections cleared. Start again.",
                            newCable: "New cable! Check devices and start wiring.",
                            timeUp: "⏰ Time's up! Try again.",
                            perfectCable: "🎉 Excellent! Cable is perfectly correct. Type: {type}<br>Points earned: {points}",
                            newRecord: "🏆 New record! Congratulations!",
                            goodCable: "👍 Good! {percentage}% correct. Few errors.<br>Points earned: {points}",
                            needsImprovement: "⚠️ Needs improvement! {percentage}% correct.<br>Points earned: {points}",
                            incorrectCable: "❌ Incorrect cable! {percentage}% correct. Try again."
                        },
                        
                        // Hints
                        hints: {
                            straightThroughT568A: "💡 For connecting {device1} to {device2} (Straight-Through T568A):<br>• Both connectors must be T568A standard<br>• Pin order: <br>1️⃣ White-Green | 2️⃣ Green | 3️⃣ White-Orange | 4️⃣ Blue<br>5️⃣ White-Blue | 6️⃣ Orange | 7️⃣ White-Brown | 8️⃣ Brown",
                            straightThroughT568B: "💡 For connecting {device1} to {device2} (Straight-Through T568B):<br>• Both connectors must be T568B standard<br>• Pin order: <br>1️⃣ White-Orange | 2️⃣ Orange | 3️⃣ White-Green | 4️⃣ Blue<br>5️⃣ White-Blue | 6️⃣ Green | 7️⃣ White-Brown | 8️⃣ Brown",
                            crossOver: "💡 For connecting {device1} to {device2} (Cross-Over):<br>• First connector: T568B | Second connector: CrossOver<br>• Connector 1: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown<br>• Connector 2: White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown<br>• Difference: Pins 1↔3 and 2↔6 are swapped"
                        },
                        
                        // Difficulty names
                        difficultyNames: {
                            easy: "Easy",
                            medium: "Medium",
                            hard: "Hard"
                        }
                    },
                    fa: {
                        // Header
                        headerTitle: "🔌 شبیه‌ساز کابل‌کشی شبکه",
                        headerSubtitle: "آموزش عملی اتصال دستگاه‌های شبکه",
                        
                        // Language Toggle
                        languageToggle: "🌐 English",
                        soundToggle: "🔊 صدا",
                        
                        // Difficulty
                        difficultyTitle: "سطح بازی را انتخاب کنید",
                        easyBtn: "آسان (بدون زمان)",
                        mediumBtn: "متوسط (5 دقیقه)",
                        hardBtn: "سخت (3 دقیقه)",
                        
                        // Timer
                        timerLabel: "زمان باقیمانده",
                        
                        // High Score
                        highScoreText: "بهترین امتیاز:",
                        
                        // Devices
                        device1Title: "دستگاه اول",
                        device2Title: "دستگاه دوم",
                        router: "روتر (Router)",
                        switch: "سوییچ (Switch)",
                        pc: "کامپیوتر (PC)",
                        server: "سرور (Server)",
                        
                        // Connection Info
                        connectionTypeLabel: "نوع اتصال:",
                        recommendedStandardLabel: "استاندارد پیشنهادی:",
                        
                        // Standard Selector
                        standardSelectorLabel: "انتخاب استاندارد برای Straight-Through:",
                        standardT568ALabel: "T568A",
                        standardT568BLabel: "T568B",
                        
                        // Sockets
                        socket1Label: "کانکتور اول",
                        socket2Label: "کانکتور دوم",
                        cableLabel: "کابل شبکه",
                        
                        // Wire Palette
                        wirePaletteTitle: "پالت سیم‌ها - سیم‌ها را بکشید و روی پین‌ها رها کنید",
                        shuffleText: "مخلوط کردن",
                        
                        // Score Panel
                        scoreLabel: "امتیاز",
                        attemptsLabel: "تلاش",
                        connectionsLabel: "اتصالات صحیح",
                        
                        // Buttons
                        checkBtn: "بررسی کابل",
                        hintBtn: "راهنمایی",
                        resetBtn: "پاک کردن",
                        newCableBtn: "کابل جدید",
                        
                        // Wire Colors
                        wireColors: {
                            'White-Orange': 'سفید-نارنجی',
                            'Orange': 'نارنجی',
                            'White-Green': 'سفید-سبز',
                            'Blue': 'آبی',
                            'White-Blue': 'سفید-آبی',
                            'Green': 'سبز',
                            'White-Brown': 'سفید-قهوه‌ای',
                            'Brown': 'قهوه‌ای'
                        },
                        
                        // Messages
                        messages: {
                            wireSelected: "سیم {wire} انتخاب شد. روی پین مورد نظر کلیک کنید.",
                            wireShuffled: "🔀 ترتیب سیم‌ها مخلوط شد!",
                            levelSelected: "سطح {level} انتخاب شد!",
                            soundOn: "صدا روشن شد",
                            soundOff: "صدا خاموش شد",
                            connectionsClear: "اتصالات پاک شد. دوباره شروع کنید.",
                            newCable: "کابل جدید! دستگاه‌ها را ببینید و کابل‌کشی کنید.",
                            timeUp: "⏰ زمان تمام شد! دوباره تلاش کنید.",
                            perfectCable: "🎉 عالی! کابل کاملاً صحیح است. نوع: {type}<br>امتیاز کسب شده: {points}",
                            newRecord: "🏆 رکورد جدید! تبریک می‌گویم!",
                            goodCable: "👍 خوب! {percentage}% صحیح است. چند خطا دارید.<br>امتیاز کسب شده: {points}",
                            needsImprovement: "⚠️ نیاز به بهبود! {percentage}% صحیح است.<br>امتیاز کسب شده: {points}",
                            incorrectCable: "❌ کابل نادرست! {percentage}% صحیح است. دوباره تلاش کنید."
                        },
                        
                        // Hints
                        hints: {
                            straightThroughT568A: "💡 برای اتصال {device1} به {device2} (Straight-Through T568A):<br>• هر دو کانکتور باید استاندارد T568A باشند<br>• ترتیب پین‌ها: <br>1️⃣ سفید-سبز | 2️⃣ سبز | 3️⃣ سفید-نارنجی | 4️⃣ آبی<br>5️⃣ سفید-آبی | 6️⃣ نارنجی | 7️⃣ سفید-قهوه‌ای | 8️⃣ قهوه‌ای",
                            straightThroughT568B: "💡 برای اتصال {device1} به {device2} (Straight-Through T568B):<br>• هر دو کانکتور باید استاندارد T568B باشند<br>• ترتیب پین‌ها: <br>1️⃣ سفید-نارنجی | 2️⃣ نارنجی | 3️⃣ سفید-سبز | 4️⃣ آبی<br>5️⃣ سفید-آبی | 6️⃣ سبز | 7️⃣ سفید-قهوه‌ای | 8️⃣ قهوه‌ای",
                            crossOver: "💡 برای اتصال {device1} به {device2} (Cross-Over):<br>• کانکتور اول: T568B | کانکتور دوم: CrossOver<br>• کانکتور ۱: سفید-نارنجی، نارنجی، سفید-سبز، آبی، سفید-آبی، سبز، سفید-قهوه‌ای، قهوه‌ای<br>• کانکتور ۲: سفید-سبز، سبز، سفید-نارنجی، آبی، سفید-آبی، نارنجی، سفید-قهوه‌ای، قهوه‌ای<br>• تفاوت: پین‌های 1↔3 و 2↔6 جابجا می‌شوند"
                        },
                        
                        // Difficulty names
                        difficultyNames: {
                            easy: "آسان",
                            medium: "متوسط",
                            hard: "سخت"
                        }
                    }
                };
            }

            init() {
                this.translations = this.initTranslations();
                this.currentLanguage = 'en'; // Default to English
                this.bindEvents();
                this.updateConnectionInfo();
                this.updateDisplay();
                this.updateHighScore();
                this.createInitialWirePalette();
                this.updateLanguage();
            }

            updateLanguage() {
                const t = this.translations[this.currentLanguage];
                
                // Update header
                document.getElementById('headerTitle').textContent = t.headerTitle;
                document.getElementById('headerSubtitle').textContent = t.headerSubtitle;
                
                // Update language toggle
                document.getElementById('languageToggle').textContent = t.languageToggle;
                document.getElementById('soundToggle').textContent = t.soundToggle;
                
                // Update difficulty section
                document.getElementById('difficultyTitle').textContent = t.difficultyTitle;
                document.getElementById('easyBtn').textContent = t.easyBtn;
                document.getElementById('mediumBtn').textContent = t.mediumBtn;
                document.getElementById('hardBtn').textContent = t.hardBtn;
                
                // Update timer
                document.getElementById('timerLabel').textContent = t.timerLabel;
                
                // Update high score
                document.getElementById('highScoreText').textContent = t.highScoreText;
                
                // Update devices
                document.getElementById('device1Title').textContent = t.device1Title;
                document.getElementById('device2Title').textContent = t.device2Title;
                
                // Update connection info
                document.getElementById('connectionTypeLabel').textContent = t.connectionTypeLabel;
                document.getElementById('recommendedStandardLabel').textContent = t.recommendedStandardLabel;
                
                // Update standard selector
                document.getElementById('standardSelectorLabel').textContent = t.standardSelectorLabel;
                document.getElementById('standardT568ALabel').textContent = t.standardT568ALabel;
                document.getElementById('standardT568BLabel').textContent = t.standardT568BLabel;
                
                // Update sockets
                document.getElementById('socket1Label').textContent = t.socket1Label;
                document.getElementById('socket2Label').textContent = t.socket2Label;
                document.getElementById('cableLabel').textContent = t.cableLabel;
                
                // Update wire palette
                document.getElementById('wirePaletteTitle').textContent = t.wirePaletteTitle;
                document.getElementById('shuffleText').textContent = t.shuffleText;
                
                // Update score panel
                document.getElementById('scoreLabel').textContent = t.scoreLabel;
                document.getElementById('attemptsLabel').textContent = t.attemptsLabel;
                document.getElementById('connectionsLabel').textContent = t.connectionsLabel;
                
                // Update buttons
                document.getElementById('checkBtn').textContent = t.checkBtn;
                document.getElementById('hintBtn').textContent = t.hintBtn;
                document.getElementById('resetBtn').textContent = t.resetBtn;
                document.getElementById('newCableBtn').textContent = t.newCableBtn;
                
                // Update body direction and language
                document.body.style.direction = this.currentLanguage === 'fa' ? 'rtl' : 'ltr';
                document.body.className = this.currentLanguage === 'fa' ? 'rtl' : '';
                document.documentElement.lang = this.currentLanguage;
                
                // Update device names and connection info
                this.updateDeviceNames();
                this.updateConnectionInfo();
                this.updateWireLabels();
            }

            updateWireLabels() {
                const t = this.translations[this.currentLanguage];
                const wireElements = document.querySelectorAll('.wire-spool');
                
                wireElements.forEach(wireElement => {
                    const wireData = wireElement.getAttribute('data-wire');
                    if (t.wireColors[wireData]) {
                        if (this.currentLanguage === 'fa') {
                            wireElement.innerHTML = t.wireColors[wireData].replace('-', '<br>');
                        } else {
                            wireElement.innerHTML = wireData.replace('-', '<br>');
                        }
                    }
                });
            }

            switchLanguage() {
                this.currentLanguage = this.currentLanguage === 'en' ? 'fa' : 'en';
                this.updateLanguage();
            }

            updateDeviceNames() {
                const t = this.translations[this.currentLanguage];
                
                // Update device option texts
                const device1Select = document.getElementById('device1');
                const device2Select = document.getElementById('device2');
                
                device1Select.querySelectorAll('option').forEach(option => {
                    const value = option.value;
                    if (t[value]) {
                        option.textContent = t[value];
                    }
                });
                
                device2Select.querySelectorAll('option').forEach(option => {
                    const value = option.value;
                    if (t[value]) {
                        option.textContent = t[value];
                    }
                });
            }

            createInitialWirePalette() {
                const t = this.translations[this.currentLanguage];
                const wires = [
                    { name: 'White-Orange', class: 'wire-white-orange', text: 'White<br>Orange', translatedName: t.wireColors['White-Orange'] },
                    { name: 'Orange', class: 'wire-orange', text: 'Orange', translatedName: t.wireColors['Orange'] },
                    { name: 'White-Green', class: 'wire-white-green', text: 'White<br>Green', translatedName: t.wireColors['White-Green'] },
                    { name: 'Blue', class: 'wire-blue', text: 'Blue', translatedName: t.wireColors['Blue'] },
                    { name: 'White-Blue', class: 'wire-white-blue', text: 'White<br>Blue', translatedName: t.wireColors['White-Blue'] },
                    { name: 'Green', class: 'wire-green', text: 'Green', translatedName: t.wireColors['Green'] },
                    { name: 'White-Brown', class: 'wire-white-brown', text: 'White<br>Brown', translatedName: t.wireColors['White-Brown'] },
                    { name: 'Brown', class: 'wire-brown', text: 'Brown', translatedName: t.wireColors['Brown'] }
                ];

                // ترتیب تصادفی سیم‌ها - چند بار مخلوط کردن برای تصادفی‌تر شدن
                let shuffledWires = [...wires];
                for (let i = 0; i < 3; i++) {
                    shuffledWires = shuffledWires.sort(() => Math.random() - 0.5);
                }
                
                const container = document.getElementById('wiresContainer');
                container.innerHTML = '';
                
                shuffledWires.forEach(wire => {
                    const wireElement = document.createElement('div');
                    wireElement.className = `wire-spool ${wire.class}`;
                    wireElement.draggable = true;
                    wireElement.setAttribute('data-wire', wire.name);
                    wireElement.innerHTML = wire.text;
                    
                    // اضافه کردن event listeners
                    wireElement.addEventListener('dragstart', (e) => this.handleDragStart(e));
                    wireElement.addEventListener('dragend', (e) => this.handleDragEnd(e));
                    wireElement.addEventListener('click', (e) => this.handleWireClick(e));
                    
                    container.appendChild(wireElement);
                });
            }

            bindEvents() {
                // Language toggle
                document.getElementById('languageToggle').addEventListener('click', () => this.switchLanguage());
                
                // تغییر دستگاه‌ها
                document.getElementById('device1').addEventListener('change', () => this.updateConnectionInfo());
                document.getElementById('device2').addEventListener('change', () => this.updateConnectionInfo());
                
                // Standard selection
                document.querySelectorAll('input[name="standard"]').forEach(radio => {
                    radio.addEventListener('change', (e) => this.changeStandard(e.target.value));
                });

                // Difficulty buttons
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.setDifficulty(e.target.dataset.level));
                });

                // Sound toggle
                document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());

                // Drag and Drop برای دسکتاپ
                document.querySelectorAll('.wire-spool').forEach(wire => {
                    wire.addEventListener('dragstart', (e) => this.handleDragStart(e));
                    wire.addEventListener('dragend', (e) => this.handleDragEnd(e));
                    
                    // کلیک برای موبایل
                    wire.addEventListener('click', (e) => this.handleWireClick(e));
                });

                document.querySelectorAll('.pin-drop-zone').forEach(pin => {
                    pin.addEventListener('dragover', (e) => this.handleDragOver(e));
                    pin.addEventListener('dragenter', (e) => this.handleDragEnter(e));
                    pin.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                    pin.addEventListener('drop', (e) => this.handleDrop(e));
                    
                    // کلیک برای موبایل
                    pin.addEventListener('click', (e) => this.handlePinClick(e));
                });

                // دکمه‌ها
                document.getElementById('checkBtn').addEventListener('click', () => this.checkCable());
                document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
                document.getElementById('resetBtn').addEventListener('click', () => this.resetConnections());
                document.getElementById('newCableBtn').addEventListener('click', () => this.newCable());
                document.getElementById('shuffleWiresBtn').addEventListener('click', () => this.createRandomWirePalette());
            }
            
            changeStandard(standard) {
                this.selectedStandard = standard;
                this.updateConnectionInfo();
                
                // نمایش پیام مناسب برای زبان فعلی
                const message = this.currentLanguage === 'fa' ? 
                    `استاندارد ${standard} انتخاب شد` : 
                    `Standard ${standard} selected`;
                    
                this.showMessage(message, 'info');
                
                // بروزرسانی نمایش اتصالات صحیح
                this.updateDisplay();
            }

            handleWireClick(e) {
                // برای موبایل - انتخاب سیم
                document.querySelectorAll('.wire-spool').forEach(w => w.classList.remove('selected'));
                e.target.classList.add('selected');
                this.selectedWire = e.target.dataset.wire;
                this.showMessage(this.translations[this.currentLanguage].messages.wireSelected.replace('{wire}', this.selectedWire), 'info');
            }

            handlePinClick(e) {
                // برای موبایل - قرار دادن سیم روی پین
                if (this.selectedWire) {
                    const pin = e.target.closest('.pin-drop-zone');
                    if (pin) {
                        const pinNumber = pin.dataset.pin;
                        const socket = pin.closest('.pin-container').id;
                        this.placeWire(socket, pinNumber, this.selectedWire);
                        
                        // پاک کردن انتخاب
                        document.querySelectorAll('.wire-spool').forEach(w => w.classList.remove('selected'));
                        this.selectedWire = null;
                    }
                }
            }

            handleDragStart(e) {
                this.currentDraggedWire = e.target.dataset.wire;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('text/plain', e.target.dataset.wire);
                
                // اضافه کردن تصویر drag
                const dragImage = e.target.cloneNode(true);
                dragImage.style.transform = 'rotate(10deg)';
                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, 40, 40);
                setTimeout(() => document.body.removeChild(dragImage), 0);
            }

            handleDragEnd(e) {
                e.target.classList.remove('dragging');
                this.currentDraggedWire = null;
            }

            handleDragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            }

            handleDragEnter(e) {
                e.preventDefault();
                if (e.target.classList.contains('pin-drop-zone') || e.target.closest('.pin-drop-zone')) {
                    const pin = e.target.classList.contains('pin-drop-zone') ? e.target : e.target.closest('.pin-drop-zone');
                    pin.classList.add('drag-over');
                }
            }

            handleDragLeave(e) {
                if (e.target.classList.contains('pin-drop-zone') || e.target.closest('.pin-drop-zone')) {
                    const pin = e.target.classList.contains('pin-drop-zone') ? e.target : e.target.closest('.pin-drop-zone');
                    pin.classList.remove('drag-over');
                }
            }

            handleDrop(e) {
                e.preventDefault();
                
                const pin = e.target.classList.contains('pin-drop-zone') ? e.target : e.target.closest('.pin-drop-zone');
                if (pin) {
                    pin.classList.remove('drag-over');
                    
                    const wireType = e.dataTransfer.getData('text/plain');
                    const pinNumber = pin.dataset.pin;
                    const socket = pin.closest('.pin-container').id;
                    
                    this.placeWire(socket, pinNumber, wireType);
                }
            }

            placeWire(socket, pin, wireType) {
                const pinElement = document.querySelector(`#${socket} .pin[data-pin="${pin}"]`);
                const wireColor = this.wireColors[wireType];
                
                pinElement.style.setProperty('--wire-color', wireColor.cssVar);
                pinElement.classList.add('has-wire');
                
                // Add success animation
                pinElement.classList.add('wire-success');
                setTimeout(() => pinElement.classList.remove('wire-success'), 600);
                
                // Play sound effect
                this.playSound('place');
                
                this.connections[socket][pin] = wireType;
                this.updateDisplay();
                this.updateProgress();
            }

            // New methods for enhanced features
            setDifficulty(level) {
                this.difficulty = level;
                
                // Update UI
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-level="${level}"]`).classList.add('active');
                
                // Set time limits
                switch(level) {
                    case 'easy':
                        this.timeLimit = 0;
                        document.getElementById('timerPanel').style.display = 'none';
                        break;
                    case 'medium':
                        this.timeLimit = 300; // 5 minutes
                        document.getElementById('timerPanel').style.display = 'block';
                        break;
                    case 'hard':
                        this.timeLimit = 180; // 3 minutes
                        document.getElementById('timerPanel').style.display = 'block';
                        break;
                }
                
                this.resetTimer();
                
                // اگر تایمر فعال است، آن را شروع کن
                if (this.timeLimit > 0) {
                    this.startTimer();
                }
                
                this.createRandomWirePalette(); // ترتیب جدید سیم‌ها هنگام تغییر سطح
                this.showMessage(this.translations[this.currentLanguage].messages.levelSelected.replace('{level}', this.translations[this.currentLanguage].difficultyNames[level]), 'info');
            }

            getDifficultyName(level) {
                const names = {
                    'easy': 'آسان',
                    'medium': 'متوسط',
                    'hard': 'سخت'
                };
                return names[level];
            }

            startTimer() {
                if (this.timeLimit === 0) return;
                
                this.timeRemaining = this.timeLimit;
                this.updateTimerDisplay();
                
                this.timer = setInterval(() => {
                    this.timeRemaining--;
                    this.updateTimerDisplay();
                    
                    if (this.timeRemaining <= 0) {
                        this.timeUp();
                    }
                }, 1000);
            }

            resetTimer() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                this.timeRemaining = this.timeLimit;
                this.updateTimerDisplay();
            }

            updateTimerDisplay() {
                if (this.timeLimit === 0) return;
                
                const minutes = Math.floor(this.timeRemaining / 60);
                const seconds = this.timeRemaining % 60;
                const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                document.getElementById('timerValue').textContent = display;
                
                // Change color when time is running out
                const timerPanel = document.getElementById('timerPanel');
                if (this.timeRemaining <= 30) {
                    timerPanel.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
                } else if (this.timeRemaining <= 60) {
                    timerPanel.style.background = 'linear-gradient(45deg, #FF9800, #F57C00)';
                } else {
                    timerPanel.style.background = 'linear-gradient(45deg, #FF6B6B, #FF8E53)';
                }
            }

            timeUp() {
                this.resetTimer();
                this.playSound('timeup');
                this.showMessage(this.translations[this.currentLanguage].messages.timeUp, 'error');
                this.newCable();
            }

            toggleSound() {
                this.soundEnabled = !this.soundEnabled;
                const soundToggle = document.getElementById('soundToggle');
                soundToggle.textContent = this.soundEnabled ? '🔊 صدا' : '🔇 بی‌صدا';
                
                this.showMessage(this.soundEnabled ? 
                    this.translations[this.currentLanguage].messages.soundOn : 
                    this.translations[this.currentLanguage].messages.soundOff, 'info');
            }

            playSound(type) {
                if (!this.soundEnabled) return;
                
                // Create audio context for sound effects
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    switch(type) {
                        case 'place':
                            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                            oscillator.start();
                            oscillator.stop(audioContext.currentTime + 0.2);
                            break;
                        case 'success':
                            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
                            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
                            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                            oscillator.start();
                            oscillator.stop(audioContext.currentTime + 0.4);
                            break;
                        case 'error':
                            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                            oscillator.start();
                            oscillator.stop(audioContext.currentTime + 0.3);
                            break;
                        case 'timeup':
                            for(let i = 0; i < 3; i++) {
                                setTimeout(() => {
                                    const osc = audioContext.createOscillator();
                                    const gain = audioContext.createGain();
                                    osc.connect(gain);
                                    gain.connect(audioContext.destination);
                                    osc.frequency.setValueAtTime(300, audioContext.currentTime);
                                    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
                                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                                    osc.start();
                                    osc.stop(audioContext.currentTime + 0.2);
                                }, i * 200);
                            }
                            break;
                    }
                } catch(e) {
                    console.log('Audio not supported');
                }
            }

            updateHighScore() {
                document.getElementById('highScoreValue').textContent = this.highScore;
            }

            createRandomWirePalette() {
                const t = this.translations[this.currentLanguage];
                const wires = [
                    { name: 'White-Orange', class: 'wire-white-orange', text: 'White<br>Orange', translatedName: t.wireColors['White-Orange'] },
                    { name: 'Orange', class: 'wire-orange', text: 'Orange', translatedName: t.wireColors['Orange'] },
                    { name: 'White-Green', class: 'wire-white-green', text: 'White<br>Green', translatedName: t.wireColors['White-Green'] },
                    { name: 'Blue', class: 'wire-blue', text: 'Blue', translatedName: t.wireColors['Blue'] },
                    { name: 'White-Blue', class: 'wire-white-blue', text: 'White<br>Blue', translatedName: t.wireColors['White-Blue'] },
                    { name: 'Green', class: 'wire-green', text: 'Green', translatedName: t.wireColors['Green'] },
                    { name: 'White-Brown', class: 'wire-white-brown', text: 'White<br>Brown', translatedName: t.wireColors['White-Brown'] },
                    { name: 'Brown', class: 'wire-brown', text: 'Brown', translatedName: t.wireColors['Brown'] }
                ];

                // ترتیب تصادفی سیم‌ها - چند بار مخلوط کردن برای تصادفی‌تر شدن
                let shuffledWires = [...wires];
                for (let i = 0; i < 3; i++) {
                    shuffledWires = shuffledWires.sort(() => Math.random() - 0.5);
                }
                
                const container = document.getElementById('wiresContainer');
                container.innerHTML = '';
                
                shuffledWires.forEach(wire => {
                    const wireElement = document.createElement('div');
                    wireElement.className = `wire-spool ${wire.class}`;
                    wireElement.draggable = true;
                    wireElement.setAttribute('data-wire', wire.name);
                    wireElement.innerHTML = this.currentLanguage === 'fa' ? 
                        wire.translatedName.replace('-', '<br>') : 
                        wire.text;
                    
                    // اضافه کردن event listeners
                    wireElement.addEventListener('dragstart', (e) => this.handleDragStart(e));
                    wireElement.addEventListener('dragend', (e) => this.handleDragEnd(e));
                    wireElement.addEventListener('click', (e) => this.handleWireClick(e));
                    
                    container.appendChild(wireElement);
                });
                
                // نمایش پیام تایید
                this.showMessage(this.translations[this.currentLanguage].messages.wireShuffled, 'info');
            }

            updateProgress() {
                let totalConnections = 0;
                let madeConnections = 0;
                
                // Count total possible connections (16)
                for (let i = 1; i <= 8; i++) {
                    totalConnections += 2; // socket1 and socket2
                    if (this.connections.socket1[i]) madeConnections++;
                    if (this.connections.socket2[i]) madeConnections++;
                }
                
                const percentage = Math.round((madeConnections / totalConnections) * 100);
                
                document.getElementById('progressBar').style.width = percentage + '%';
                document.getElementById('progressText').textContent = percentage + '%';
            }

            updateConnectionInfo() {
                const device1 = document.getElementById('device1').value;
                const device2 = document.getElementById('device2').value;
                
                let cableType, standard;
                
                // تعیین نوع کابل بر اساس دستگاه‌ها
                if ((device1 === 'pc' && device2 === 'switch') ||
                    (device1 === 'pc' && device2 === 'router') ||
                    (device1 === 'server' && device2 === 'switch') ||
                    (device1 === 'server' && device2 === 'router') ||
                    (device1 === 'switch' && device2 === 'router') ||
                    (device1 === 'router' && device2 === 'switch') ||
                    (device1 === 'switch' && device2 === 'pc') ||
                    (device1 === 'router' && device2 === 'pc') ||
                    (device1 === 'switch' && device2 === 'server') ||
                    (device1 === 'router' && device2 === 'server')) {
                    cableType = 'Straight-Through';
                    standard = 'T568B';
                } else if ((device1 === 'pc' && device2 === 'pc') ||
                          (device1 === 'router' && device2 === 'router') ||
                          (device1 === 'switch' && device2 === 'switch') ||
                          (device1 === 'server' && device2 === 'server')) {
                    cableType = 'Cross-Over';
                    standard = 'T568B/CrossOver';
                } else {
                    cableType = 'Straight-Through';
                    standard = 'T568B';
                }
                
                // For straight-through, show the selector and use selected standard
                const standardSelector = document.getElementById('standardSelector');
                if (cableType === 'Straight-Through') {
                    standardSelector.style.display = 'block';
                    standard = this.selectedStandard;
                } else {
                    standardSelector.style.display = 'none';
                    standard = 'T568B/CrossOver';
                }
                
                document.getElementById('cableType').textContent = cableType;
                document.getElementById('recommendedStandard').textContent = standard;
                
                this.currentCableType = cableType;
                this.currentStandard = standard;
            }

            checkCable() {
                this.attempts++;
                let correctConnections = 0;
                let totalConnections = 0;
                
                let standard1, standard2;
                
                if (this.currentCableType === 'Cross-Over') {
                    // برای کابل Cross-Over
                    standard1 = this.standards.T568B;
                    standard2 = this.standards.CrossOver;
                } else {
                    // برای کابل Straight-Through - استفاده از استاندارد انتخاب شده
                    standard1 = this.standards[this.selectedStandard];
                    standard2 = this.standards[this.selectedStandard];
                }
                
                // بررسی کانکتور اول
                for (let i = 1; i <= 8; i++) {
                    totalConnections++;
                    if (this.connections.socket1[i] === standard1[i-1]) {
                        correctConnections++;
                    }
                }
                
                // بررسی کانکتور دوم
                for (let i = 1; i <= 8; i++) {
                    totalConnections++;
                    if (this.connections.socket2[i] === standard2[i-1]) {
                        correctConnections++;
                    }
                }
                
                const percentage = Math.round((correctConnections / totalConnections) * 100);
                
                // Calculate bonus points based on difficulty and time
                let bonusMultiplier = 1;
                if (this.difficulty === 'medium') bonusMultiplier = 1.5;
                if (this.difficulty === 'hard') bonusMultiplier = 2;
                
                let timeBonus = 0;
                if (this.timeLimit > 0 && this.timeRemaining > 0) {
                    timeBonus = Math.round((this.timeRemaining / this.timeLimit) * 50);
                }
                
                if (percentage === 100) {
                    const earnedPoints = Math.round((100 + timeBonus) * bonusMultiplier);
                    this.score += earnedPoints;
                    this.playSound('success');
                    this.showMessage(this.translations[this.currentLanguage].messages.perfectCable
                        .replace('{type}', this.currentCableType)
                        .replace('{points}', earnedPoints), 'success');
                    
                    // Stop timer on success
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    
                    // Check for high score
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        localStorage.setItem('networkCableHighScore', this.highScore);
                        this.updateHighScore();
                        this.showMessage(this.translations[this.currentLanguage].messages.newRecord, 'success');
                    }
                } else if (percentage >= 80) {
                    const earnedPoints = Math.round(50 * bonusMultiplier);
                    this.score += earnedPoints;
                    this.showMessage(this.translations[this.currentLanguage].messages.goodCable
                        .replace('{percentage}', percentage)
                        .replace('{points}', earnedPoints), 'info');
                } else if (percentage >= 50) {
                    const earnedPoints = Math.round(20 * bonusMultiplier);
                    this.score += earnedPoints;
                    this.showMessage(this.translations[this.currentLanguage].messages.needsImprovement
                        .replace('{percentage}', percentage)
                        .replace('{points}', earnedPoints), 'error');
                } else {
                    this.playSound('error');
                    this.showMessage(this.translations[this.currentLanguage].messages.incorrectCable
                        .replace('{percentage}', percentage), 'error');
                }
                
                this.updateDisplay();
            }

            showHint() {
                const device1 = document.getElementById('device1').value;
                const device2 = document.getElementById('device2').value;
                const t = this.translations[this.currentLanguage];
                
                let hintMessage = '';
                
                if (this.currentCableType === 'Straight-Through') {
                    // انتخاب راهنمایی بر اساس استاندارد انتخاب شده
                    const hintKey = this.selectedStandard === 'T568A' ? 'straightThroughT568A' : 'straightThroughT568B';
                    hintMessage = t.hints[hintKey]
                        .replace('{device1}', this.getDeviceName(device1))
                        .replace('{device2}', this.getDeviceName(device2));
                } else {
                    hintMessage = t.hints.crossOver
                        .replace('{device1}', this.getDeviceName(device1))
                        .replace('{device2}', this.getDeviceName(device2));
                }
                
                this.showMessage(hintMessage, 'info');
            }

            getDeviceName(device) {
                const t = this.translations[this.currentLanguage];
                return t[device] || device;
            }

            resetConnections() {
                this.connections = { socket1: {}, socket2: {} };
                
                document.querySelectorAll('.pin').forEach(pin => {
                    pin.classList.remove('has-wire');
                    pin.style.removeProperty('--wire-color');
                });
                
                this.updateDisplay();
                this.showMessage(this.translations[this.currentLanguage].messages.connectionsClear, 'info');
            }

            newCable() {
                this.resetConnections();
                
                // Don't reset score unless it's a new game
                if (this.attempts === 0) {
                    this.score = 0;
                }
                
                // تصادفی کردن انتخاب دستگاه‌ها
                const devices = ['router', 'switch', 'pc', 'server'];
                const device1 = devices[Math.floor(Math.random() * devices.length)];
                let device2 = devices[Math.floor(Math.random() * devices.length)];
                
                document.getElementById('device1').value = device1;
                document.getElementById('device2').value = device2;
                
                this.updateConnectionInfo();
                this.updateDisplay();
                this.createRandomWirePalette(); // ترتیب جدید سیم‌ها
                this.startTimer(); // Start timer for new cable
                this.showMessage(this.translations[this.currentLanguage].messages.newCable, 'info');
            }

            showMessage(text, type = 'info') {
                const messageDiv = document.getElementById('message');
                messageDiv.innerHTML = text;
                messageDiv.className = `message ${type}`;
                
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                    messageDiv.className = 'message';
                }, 5000);
            }

            updateDisplay() {
                document.getElementById('score').textContent = this.score;
                document.getElementById('attempts').textContent = this.attempts;
                
                // شمارش اتصالات صحیح
                let correct = 0;
                let total = 0;
                
                // استفاده از استاندارد انتخاب شده برای Straight-Through
                let standard1, standard2;
                
                if (this.currentCableType === 'Cross-Over') {
                    standard1 = this.standards.T568B;
                    standard2 = this.standards.CrossOver;
                } else {
                    // برای Straight-Through از استاندارد انتخاب شده استفاده کن
                    standard1 = this.standards[this.selectedStandard];
                    standard2 = this.standards[this.selectedStandard];
                }
                
                for (let i = 1; i <= 8; i++) {
                    total++;
                    if (this.connections.socket1[i] === standard1[i-1]) {
                        correct++;
                    }
                }
                
                for (let i = 1; i <= 8; i++) {
                    total++;
                    if (this.connections.socket2[i] === standard2[i-1]) {
                        correct++;
                    }
                }
                
                document.getElementById('correctConnections').textContent = `${correct}/${total}`;
            }
        }

        // شروع بازی
        document.addEventListener('DOMContentLoaded', () => {
            new NetworkCableSimulator();
        });