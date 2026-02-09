// Analytics Tracker
class AnalyticsTracker {
    constructor() {
        this.sessionId = this.getOrCreateSessionId();
        this.visitorId = this.getOrCreateVisitorId();
        this.enabled = true;
        this.initSession();
    }
    
    // Generate or retrieve session ID
    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = this.generateUUID();
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }
    
    // Generate or retrieve visitor ID (persistent)
    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('analytics_visitor_id');
        if (!visitorId) {
            visitorId = this.generateUUID();
            localStorage.setItem('analytics_visitor_id', visitorId);
        }
        return visitorId;
    }
    
    // Generate UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Device fingerprinting
    getDeviceFingerprint() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages ? navigator.languages.join(',') : '',
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack || 'unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
        };
    }
    
    // Detect device type
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }
    
    // Get browser info
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = 'Unknown';
        
        if (ua.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Chrome') > -1) {
            browserName = 'Chrome';
            browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Safari') > -1) {
            browserName = 'Safari';
            browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('Edge') > -1) {
            browserName = 'Edge';
            browserVersion = ua.match(/Edge\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
            browserName = 'Internet Explorer';
        }
        
        return { name: browserName, version: browserVersion };
    }
    
    // Get OS info
    getOSInfo() {
        const ua = navigator.userAgent;
        let os = 'Unknown';
        
        if (ua.indexOf('Win') > -1) os = 'Windows';
        else if (ua.indexOf('Mac') > -1) os = 'MacOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
        
        return os;
    }
    
    // Initialize session
    initSession() {
        const sessionData = {
            session_id: this.sessionId,
            visitor_id: this.visitorId,
            fingerprint: this.getDeviceFingerprint(),
            device_type: this.getDeviceType(),
            browser: this.getBrowserInfo(),
            os: this.getOSInfo(),
            referrer: document.referrer,
            landing_page: window.location.href,
            timestamp: Date.now()
        };
        
        // Store session start time
        if (!sessionStorage.getItem('analytics_session_start')) {
            sessionStorage.setItem('analytics_session_start', Date.now().toString());
        }
    }
    
    // Track event
    track(eventType, data = {}) {
        if (!this.enabled) return;
        
        const eventData = {
            event: eventType,
            session_id: this.sessionId,
            visitor_id: this.visitorId,
            timestamp: Date.now(),
            url: window.location.href,
            data: data
        };
        
        // Send to server
        this.sendEvent(eventData);
        
        // Log in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics Event:', eventData);
        }
    }
    
    // Send event to server
    async sendEvent(eventData) {
        try {
            await fetch('/api/track.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
        } catch (error) {
            console.error('Failed to send analytics event:', error);
        }
    }
    
    // Track page view
    trackPageView() {
        this.track('page_view', {
            title: document.title,
            url: window.location.href,
            referrer: document.referrer
        });
    }
    
    // Track session duration on page unload
    trackSessionEnd() {
        const sessionStart = parseInt(sessionStorage.getItem('analytics_session_start') || '0');
        const duration = Date.now() - sessionStart;
        
        this.track('session_end', {
            duration: duration
        });
    }
}

// Initialize analytics
window.analytics = new AnalyticsTracker();

// Track page view on load
if (document.readyState === 'complete') {
    window.analytics.trackPageView();
} else {
    window.addEventListener('load', () => {
        window.analytics.trackPageView();
    });
}

// Track session end
window.addEventListener('beforeunload', () => {
    window.analytics.trackSessionEnd();
});

// Track visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        window.analytics.track('page_hidden', {});
    } else {
        window.analytics.track('page_visible', {});
    }
});
