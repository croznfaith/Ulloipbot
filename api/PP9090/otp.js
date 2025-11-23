module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'GET') {
        try {
            // Extract token from dynamic route
            const { token } = req.query;
            
            if (!token) {
                return res.status(400).json({ error: 'Token is required' });
            }
            
            // Generate OTP
            const otp = generateOTP();
            
            // Get user data
            const userData = getUserDataByToken(token);
            
            // Send OTP (temporary log)
            console.log(`OTP ${otp} sent for token: ${token}`);
            
            // Return response
            return res.status(200).json({
                profile_pic: userData.profile_pic,
                name: userData.name,
                username: userData.username,
                OTP: otp
            });
            
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function getUserDataByToken(token) {
    return {
        profile_pic: `https://cdn5.telesco.pe/file/MIznig${Math.random().toString(36).substring(7)}.jpg`,
        name: 'User Full Name',
        username: 'username_bande_ka'
    };
}
