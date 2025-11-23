<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $request_uri = $_SERVER['REQUEST_URI'];
    
    // Extract token from URL
    $token = isset($_GET['token']) ? $_GET['token'] : '';
    
    if(empty($token)) {
        // Try to extract from path
        $path_parts = explode('/', $request_uri);
        $token = end($path_parts);
    }
    
    // Validate token
    if(validateToken($token)) {
        // Generate OTP
        $otp = generateOTP();
        
        // Get user data from database
        $userData = getUserDataByToken($token);
        
        // Send OTP via Telegram bot
        sendOTPToUser($token, $otp);
        
        // Return JSON response
        echo json_encode([
            'profile_pic' => $userData['profile_pic'],
            'name' => $userData['full_name'],
            'username' => $userData['username'],
            'OTP' => $otp
        ]);
    } else {
        echo json_encode(['error' => 'Invalid token']);
    }
}

function generateOTP() {
    return sprintf('%04d', rand(0, 9999));
}

function validateToken($token) {
    // Implement token validation logic
    return true; // Placeholder
}

function getUserDataByToken($token) {
    // Implement database query
    return [
        'profile_pic' => 'https://cdn5.telesco.pe/file/MIznig....jpg',
        'full_name' => 'User Full Name',
        'username' => 'username_bande_ka'
    ];
}

function sendOTPToUser($token, $otp) {
    // Implement OTP sending via bot
}
?>
