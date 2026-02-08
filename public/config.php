<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - App Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #202124;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #5f6368;
            margin-bottom: 30px;
        }
        
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .section h2 {
            color: #202124;
            margin-bottom: 15px;
            font-size: 20px;
        }
        
        .info-box {
            background: #e8f0fe;
            border-left: 4px solid #4285f4;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        .info-box h3 {
            color: #1967d2;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .info-box p {
            color: #202124;
            line-height: 1.6;
        }
        
        .code {
            background: #f1f3f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
            font-size: 13px;
        }
        
        .button {
            background: #4285f4;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .button:hover {
            background: #3367d6;
        }
        
        .file-list {
            list-style: none;
            padding: 0;
        }
        
        .file-list li {
            padding: 10px;
            background: white;
            margin-bottom: 8px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .file-name {
            font-family: monospace;
            color: #202124;
        }
        
        .file-desc {
            color: #5f6368;
            font-size: 13px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .stat-card {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #dadce0;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #4285f4;
        }
        
        .stat-label {
            color: #5f6368;
            font-size: 13px;
            margin-top: 5px;
        }
        
        .alert {
            background: #fef7e0;
            border-left: 4px solid #fbbc04;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        .alert-title {
            color: #ea8600;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .alert-text {
            color: #202124;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Admin Panel - Dynamic App Platform</h1>
        <p class="subtitle">Configuration & Analytics Dashboard</p>
        
        <div class="alert">
            <div class="alert-title">⚠️ Setup Required</div>
            <div class="alert-text">
                This is a basic admin panel. For full functionality with authentication, 
                implement the auth system as described in PROJECT_PLAN.md.
            </div>
        </div>
        
        <div class="section">
            <h2>📊 Quick Stats</h2>
            <div class="stats" id="stats">
                <div class="stat-card">
                    <div class="stat-value" id="total-apps">6</div>
                    <div class="stat-label">Total Apps</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="enabled-apps">6</div>
                    <div class="stat-label">Enabled Apps</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="total-gifts">18</div>
                    <div class="stat-label">Total Gifts</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>⚙️ Configuration</h2>
            <div class="info-box">
                <h3>Edit Configuration</h3>
                <p>
                    To modify the platform configuration, edit the file: 
                    <span class="code">data/config.json</span>
                </p>
                <p style="margin-top: 10px;">
                    After making changes, the application will automatically load the new configuration.
                </p>
            </div>
            <button class="button" onclick="location.reload()">Reload Configuration</button>
        </div>
        
        <div class="section">
            <h2>📝 Important Files</h2>
            <ul class="file-list">
                <li>
                    <div>
                        <div class="file-name">data/config.json</div>
                        <div class="file-desc">App configuration and settings</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div class="file-name">public/custom-functions.js</div>
                        <div class="file-desc">Custom verification functions</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div class="file-name">data/logs/</div>
                        <div class="file-desc">Analytics logs directory</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div class="file-name">public/api/</div>
                        <div class="file-desc">API endpoints</div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="section">
            <h2>🔧 Quick Actions</h2>
            <div class="info-box">
                <h3>Common Tasks</h3>
                <p><strong>Add a new app:</strong> Edit <span class="code">data/config.json</span> and add a new app object to the apps array.</p>
                <p style="margin-top: 8px;"><strong>Change app icons:</strong> Update the "icon" field with an emoji or image URL.</p>
                <p style="margin-top: 8px;"><strong>Modify gifts:</strong> Edit the "gifts" array within each app configuration.</p>
                <p style="margin-top: 8px;"><strong>View analytics:</strong> Check log files in <span class="code">data/logs/</span></p>
            </div>
        </div>
        
        <div class="section">
            <h2>📚 Documentation</h2>
            <p style="margin-bottom: 15px;">For detailed information about the platform features and implementation:</p>
            <button class="button" onclick="window.open('../PROJECT_PLAN.md', '_blank')">
                View Project Plan
            </button>
            <button class="button" onclick="window.open('../README.md', '_blank')" style="margin-left: 10px;">
                View README
            </button>
        </div>
        
        <div class="section">
            <h2>🚀 View Application</h2>
            <button class="button" onclick="window.open('index.html', '_blank')">
                Open App Platform
            </button>
            <button class="button" onclick="window.open('index.html?app=1', '_blank')" style="margin-left: 10px;">
                Test Direct Link
            </button>
        </div>
    </div>
    
    <script>
        // Load configuration and update stats
        fetch('api/get-config.php')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const config = data.data;
                    const enabledApps = config.apps.filter(app => app.enabled);
                    const totalGifts = config.apps.reduce((sum, app) => sum + (app.gifts?.length || 0), 0);
                    
                    document.getElementById('total-apps').textContent = config.apps.length;
                    document.getElementById('enabled-apps').textContent = enabledApps.length;
                    document.getElementById('total-gifts').textContent = totalGifts;
                }
            })
            .catch(err => console.error('Failed to load config:', err));
    </script>
</body>
</html>
