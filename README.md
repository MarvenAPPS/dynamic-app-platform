# Dynamic App Platform

A fully configurable PWA (Progressive Web App) platform that simulates a phone app drawer interface. Each app leads to a gift selection system with user tracking and analytics.

## 🎯 Features

- **Multi-View Application**: App drawer → User form → Verification flow
- **Direct Linking**: Deep link to specific apps via URL parameters
- **PWA Support**: Add to home screen, offline support
- **Analytics Tracking**: User activity, device info, session tracking
- **Configurable**: JSON-based configuration for easy customization
- **Custom Functions**: Define custom verification behavior per app

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MarvenAPPS/dynamic-app-platform.git
cd dynamic-app-platform
```

2. Set up a web server with PHP support (Apache, Nginx, etc.)

3. Point your web server to the `public/` directory

4. Make sure the `data/` directory is writable:
```bash
chmod 755 data/
```

### Configuration

Edit `data/config.json` to customize:
- Site title and global settings
- App titles, icons, and descriptions
- Gift options for each app
- Custom verification functions
- Loading messages and error messages

### Usage

1. **Access the app**: Navigate to `http://yourserver/public/index.html`

2. **Direct linking**: Use URL parameters to link directly to an app:
   - `http://yourserver/public/index.html?app=1` (opens App 1)
   - `http://yourserver/public/index.html?app=2` (opens App 2)

3. **Customize verification**: Edit `public/custom-functions.js` to define what happens when users click "Verify"

## 📁 Project Structure

```
dynamic-app-platform/
├── public/                 # Web root directory
│   ├── index.html         # Main application
│   ├── styles.css         # Styling
│   ├── app.js             # Core application logic
│   ├── analytics.js       # Analytics tracking
│   ├── custom-functions.js # Custom verification functions
│   ├── manifest.json      # PWA manifest
│   ├── service-worker.js  # Service worker for PWA
│   └── api/               # API endpoints
│       ├── get-config.php # Fetch configuration
│       ├── save-config.php # Save configuration (admin)
│       └── track.php      # Analytics tracking
├── data/                  # Data directory
│   ├── config.json        # Application configuration
│   └── logs/              # Analytics logs
├── assets/                # Static assets
│   ├── icons/            # PWA icons
│   ├── images/           # Images
│   └── fonts/            # Custom fonts
├── PROJECT_PLAN.md       # Detailed project plan
└── README.md             # This file
```

## 🎨 Customization

### Adding/Modifying Apps

Edit `data/config.json` and modify the `apps` array:

```json
{
  "id": 1,
  "enabled": true,
  "title": "Your App Name",
  "icon": "🎁",
  "usernameLabel": "Enter your username",
  "gifts": [
    {
      "id": "gift1",
      "label": "Gift Name",
      "icon": "💎",
      "value": "gift_value"
    }
  ]
}
```

### Custom Verification Functions

Edit `public/custom-functions.js`:

```javascript
function app1Verify(username, giftValue) {
    // Your custom logic here
    window.open(`https://example.com/verify?user=${username}`, '_blank');
}
```

## 📊 Analytics

Analytics are automatically tracked and stored in `data/logs/analytics-YYYY-MM-DD.log`

Tracked events:
- Page loads
- App selections
- Form submissions
- Verification clicks
- Session data

## 🔒 Security Notes

⚠️ **IMPORTANT**: This is an initial release with basic security implementations.

**Before deploying to production:**

1. **Change default admin credentials** in `public/auth.php`
2. **Implement password hashing**: Use `password_hash()` and `password_verify()`
3. **Add rate limiting**: Protect against brute-force attacks
4. **Enable HTTPS**: Required for PWA and secure communications
5. **Restrict data directory**: Ensure `data/` is NOT publicly accessible
6. **Review custom functions**: Validate all user inputs in custom verification functions
7. **Update CSP headers**: Configure Content Security Policy for your domain
8. **Regular updates**: Keep PHP and dependencies updated

See `PROJECT_PLAN.md` for detailed security implementation guidance.

The current implementation includes:
- IP anonymization in analytics (GDPR compliance)
- Configuration validation before saving
- Protected sensitive directories via `.htaccess`
- Basic security headers

## 📱 PWA Setup

To enable PWA features:

1. Add your icons to `assets/icons/`:
   - `icon-192.png` (192x192px)
   - `icon-512.png` (512x512px)

2. Update `manifest.json` with your app details

3. Serve the app over HTTPS (required for PWA)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

MIT License - Free to use and modify

## 👥 Author

MarvenAPPS - https://github.com/MarvenAPPS

## 📚 Documentation

For detailed implementation information, see [PROJECT_PLAN.md](PROJECT_PLAN.md)
