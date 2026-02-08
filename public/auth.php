<?php
// Simple Authentication Handler
// ⚠️ WARNING: This is a basic authentication implementation for initial release
// For production use, implement:
// - Password hashing with password_hash() and password_verify()
// - Rate limiting and brute-force protection
// - IP-based login attempt tracking
// - CAPTCHA after failed attempts
// - Secure session management with timeouts
// See PROJECT_PLAN.md for full security implementation details

session_start();

// Default credentials (CHANGE THESE IMMEDIATELY!)
// In production: Use environment variables and password_hash()
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'changeme123'); // TODO: Hash this password!

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['admin_user'] = $username;
        $_SESSION['admin_login_time'] = time();
        header('Location: config.php');
        exit;
    } else {
        $error = 'Invalid credentials';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: auth.php');
    exit;
}

// Check if already authenticated
if (isset($_SESSION['admin_authenticated']) && $_SESSION['admin_authenticated'] === true) {
    header('Location: config.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - App Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        
        h1 {
            color: #202124;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .subtitle {
            color: #5f6368;
            text-align: center;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #202124;
            font-weight: 500;
        }
        
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #dadce0;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.2s;
        }
        
        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #4285f4;
        }
        
        .button {
            width: 100%;
            background: #4285f4;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .button:hover {
            background: #3367d6;
        }
        
        .error {
            background: #fce8e6;
            color: #c5221f;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 4px solid #c5221f;
        }
        
        .info {
            background: #e8f0fe;
            color: #1967d2;
            padding: 12px;
            border-radius: 6px;
            margin-top: 20px;
            font-size: 13px;
            border-left: 4px solid #4285f4;
        }
        
        .info strong {
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>🔐 Admin Login</h1>
        <p class="subtitle">Dynamic App Platform</p>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required autofocus>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="button">Login</button>
        </form>
        
        <div class="info">
            <strong>⚠️ Default Credentials (Change These!)</strong>
            Username: admin<br>
            Password: changeme123<br>
            <br>
            <em>For production, implement proper password hashing and brute-force protection as described in PROJECT_PLAN.md</em>
        </div>
    </div>
</body>
</html>
