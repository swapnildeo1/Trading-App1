// Mock Data for the demonstration
const mockAlerts = [
    {
        id: 1,
        asset: "NIFTY",
        direction: "bullish",
        timeframe: "1 Hour BO",
        strikes: "22500 CE, 22600 CE",
        risk: "Low",
        entry: "145 - 155",
        sl: "120",
        targets: [
            { label: "T1", val: "185" },
            { label: "T2", val: "220" },
            { label: "T3", val: "260" }
        ],
        targetTime: "2-4 Hours",
        timestamp: new Date().toISOString()
    },
    {
        id: 2,
        asset: "BANKNIFTY",
        direction: "bearish",
        timeframe: "Daily BO",
        strikes: "48000 PE, 47800 PE",
        risk: "High",
        entry: "310 - 330",
        sl: "240",
        targets: [
            { label: "T1", val: "400" },
            { label: "T2", val: "520" }
        ],
        targetTime: "1-2 Days",
        timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 3,
        asset: "SENSEX",
        direction: "bullish",
        timeframe: "1 Hour BO",
        strikes: "74000 CE, 74200 CE",
        risk: "Medium",
        entry: "210 - 225",
        sl: "175",
        targets: [
            { label: "T1", val: "280" },
            { label: "T2", val: "350" },
            { label: "T3", val: "420" }
        ],
        targetTime: "Intraday",
        timestamp: new Date(Date.now() - 7200000).toISOString()
    }
];

// DOM Elements
const alertsGrid = document.getElementById('alertsGrid');
const template = document.getElementById('alertCardTemplate');

const settingsModal = document.getElementById('settingsModal');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Utility to format time
function formatTime(isoString) {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
}

// Function to render alerts
function renderAlerts(filter = 'all') {
    alertsGrid.innerHTML = '';
    
    const filteredAlerts = mockAlerts.filter(alert => 
        filter === 'all' ? true : alert.asset.toLowerCase() === filter
    );

    filteredAlerts.forEach((alert, index) => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.alert-card');
        
        // Add animation delay for staggered entrance
        card.style.animationDelay = `${index * 0.1}s`;

        // Set direction classes
        card.classList.add(alert.direction);

        // Header
        const icon = clone.querySelector('.asset-icon');
        icon.innerHTML = alert.direction === 'bullish' ? '<i class="fa-solid fa-arrow-trend-up"></i>' : '<i class="fa-solid fa-arrow-trend-down"></i>';
        
        clone.querySelector('.asset-name').textContent = alert.asset;
        
        const dirSpan = clone.querySelector('.asset-direction');
        dirSpan.innerHTML = alert.direction === 'bullish' 
            ? 'Bullish <i class="fa-solid fa-caret-up"></i>' 
            : 'Bearish <i class="fa-solid fa-caret-down"></i>';
            
        clone.querySelector('.timeframe-badge').textContent = alert.timeframe;

        // Setup
        clone.querySelector('.strikes-val').textContent = alert.strikes;
        
        const riskVal = clone.querySelector('.risk-val');
        riskVal.textContent = alert.risk;
        riskVal.classList.add(`risk-${alert.risk.toLowerCase()}`);

        // Price Action
        clone.querySelector('.price-box.entry .value').textContent = `₹${alert.entry}`;
        clone.querySelector('.price-box.sl .value').textContent = `₹${alert.sl}`;

        // Targets
        clone.querySelector('.target-time').textContent = alert.targetTime;
        const targetsList = clone.querySelector('.targets-list');
        alert.targets.forEach(t => {
            const div = document.createElement('div');
            div.className = 'target-item';
            div.innerHTML = `<span class="t-label">${t.label}</span><span class="t-val">₹${t.val}</span>`;
            targetsList.appendChild(div);
        });

        // Footer
        clone.querySelector('.timestamp span').textContent = formatTime(alert.timestamp);

        alertsGrid.appendChild(clone);
    });
}

// Initialize
renderAlerts();

// Event Listeners for Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderAlerts(e.target.dataset.filter);
    });
});

// Settings Modal Logic
openSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('active');
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

saveSettingsBtn.addEventListener('click', () => {
    const btn = saveSettingsBtn;
    const originalText = btn.textContent;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
    
    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved successfully';
        btn.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            settingsModal.classList.remove('active');
            // Reset button
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 300);
        }, 1500);
    }, 1000);
});

// Update Ticker Simulation
setInterval(() => {
    const niftyPrice = document.getElementById('nifty-price');
    const bankPrice = document.getElementById('banknifty-price');
    
    // Simulate random small movements
    let currentNifty = parseFloat(niftyPrice.textContent.replace(/,/g, ''));
    let currentBank = parseFloat(bankPrice.textContent.replace(/,/g, ''));
    
    currentNifty += (Math.random() - 0.5) * 5;
    currentBank += (Math.random() - 0.5) * 10;
    
    niftyPrice.textContent = currentNifty.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bankPrice.textContent = currentBank.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}, 3000);

// Login Logic
window.currentUserId = 'admin';
window.currentPass = 'admin';

const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const loginScreen = document.getElementById('loginScreen');
const appContainer = document.getElementById('appContainer');

loginBtn.addEventListener('click', () => {
    const user = usernameInput.value;
    const pass = passwordInput.value;
    
    // Simulate Authentication verification
    loginBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying...';
    
    setTimeout(() => {
        if (user === window.currentUserId && pass === window.currentPass) {
            // Success
            loginScreen.style.opacity = '0';
            setTimeout(() => {
                loginScreen.style.display = 'none';
                appContainer.style.display = 'flex';
                // Trigger reflow for animations if needed
                renderAlerts(); 
            }, 300);
        } else {
            // Fail
            loginBtn.textContent = 'Login to Dashboard';
            loginError.style.display = 'block';
            usernameInput.parentElement.style.borderColor = 'var(--bearish)';
            passwordInput.parentElement.style.borderColor = 'var(--bearish)';
        }
    }, 800);
});

// Settings Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset all tabs
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.style.color = 'var(--text-secondary)';
            b.style.borderBottomColor = 'transparent';
        });
        tabContents.forEach(c => c.style.display = 'none');
        
        // Activate clicked
        btn.classList.add('active');
        btn.style.color = 'var(--text-primary)';
        btn.style.borderBottomColor = 'var(--accent-blue)';
        document.getElementById(btn.dataset.target).style.display = 'block';
    });
});

// Security Settings Update Logic
const currentPassInput = document.getElementById('currentPass');
const newUserIdInput = document.getElementById('newUserId');
const newPassInput = document.getElementById('newPass');
const securityError = document.getElementById('securityError');

// Override the original saveSettingsBtn logic slightly
saveSettingsBtn.addEventListener('click', () => {
    const activeTabId = document.querySelector('.tab-content[style="display: block;"], .tab-content.active:not([style="display: none;"])').id;
    
    if (activeTabId === 'security-tab') {
        if (currentPassInput.value !== window.currentPass && currentPassInput.value !== '') {
            securityError.style.display = 'block';
            return;
        } else {
            securityError.style.display = 'none';
        }
        
        if (newUserIdInput.value !== '') window.currentUserId = newUserIdInput.value;
        if (newPassInput.value !== '') window.currentPass = newPassInput.value;
        
        currentPassInput.value = '';
        newUserIdInput.value = '';
        newPassInput.value = '';
    }

    const originalText = saveSettingsBtn.textContent;
    saveSettingsBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
    
    setTimeout(() => {
        saveSettingsBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved successfully';
        saveSettingsBtn.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            settingsModal.classList.remove('active');
            setTimeout(() => {
                saveSettingsBtn.textContent = originalText;
                saveSettingsBtn.style.backgroundColor = '';
            }, 300);
        }, 1500);
    }, 1000);
});

// Forgot Password Flow
const forgotPasswordLnk = document.getElementById('forgotPasswordLnk');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotBtn = document.getElementById('closeForgotBtn');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');
const forgotStep1 = document.getElementById('forgotStep1');
const forgotStep2 = document.getElementById('forgotStep2');
const otpError = document.getElementById('otpError');

forgotPasswordLnk.addEventListener('click', (e) => {
    e.preventDefault();
    forgotStep1.style.display = 'block';
    forgotStep2.style.display = 'none';
    forgotPasswordModal.classList.add('active');
});

closeForgotBtn.addEventListener('click', () => {
    forgotPasswordModal.classList.remove('active');
});

sendOtpBtn.addEventListener('click', () => {
    const mobile = document.getElementById('forgotMobile').value;
    if(mobile.length < 10) return;
    
    sendOtpBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    setTimeout(() => {
        // Simulate OTP sent
        sendOtpBtn.innerHTML = 'Send OTP';
        forgotStep1.style.display = 'none';
        forgotStep2.style.display = 'block';
        // In real life, OTP would be sent via Fast2SMS here
    }, 1500);
});

resetPasswordBtn.addEventListener('click', () => {
    const otp = document.getElementById('resetOtp').value;
    const newPass = document.getElementById('newResetPassword').value;
    
    if(otp.length < 4) {
        otpError.style.display = 'block';
        return;
    }
    otpError.style.display = 'none';
    
    resetPasswordBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Resetting...';
    setTimeout(() => {
        // Success
        window.currentPass = newPass || window.currentPass;
        resetPasswordBtn.innerHTML = '<i class="fa-solid fa-check"></i> Success!';
        resetPasswordBtn.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            forgotPasswordModal.classList.remove('active');
            resetPasswordBtn.innerHTML = 'Reset Password';
            resetPasswordBtn.style.backgroundColor = '';
            document.getElementById('resetOtp').value = '';
            document.getElementById('newResetPassword').value = '';
        }, 1500);
    }, 1500);
});
