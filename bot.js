const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const BOT_TOKEN = '8488314208:AAEpn00TUMudtmGO4RgrFEtfxeLB235m6Qg';
const API_BASE_URL = 'https://xi.vercel.app';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Store user tokens temporarily
const userTokens = new Map();

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    
    // Generate unique token for user
    const token = generateToken();
    userTokens.set(chatId, token);
    
    // Prepare user info message
    const userInfo = `
👤 Nick name : ${user.first_name} ${user.last_name || ''}
👤 Username : @${user.username || 'N/A'}
🆔 ID : ${user.id}
🆔 TOKEN : ${token}
----------------------------------------
Support @Help
    `;
    
    // Send message with user profile picture if available
    if(user.photo) {
        const photos = await bot.getUserProfilePhotos(user.id);
        if(photos.total_count > 0) {
            const photo = photos.photos[0][0];
            const file = await bot.getFile(photo.file_id);
            const profilePicUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
            
            await bot.sendPhoto(chatId, profilePicUrl, { caption: userInfo });
        } else {
            await bot.sendMessage(chatId, userInfo);
        }
    } else {
        await bot.sendMessage(chatId, userInfo);
    }
    
    // Send API URL
    const apiUrl = `${API_BASE_URL}/KEER6KB590ZL8392/api.php?=${token}`;
    await bot.sendMessage(chatId, `Your API URL:\n${apiUrl}`);
});

// OTP sending logic
async function sendOTP(token, otp) {
    // Find user by token and send OTP
    for(let [chatId, userToken] of userTokens.entries()) {
        if(userToken === token) {
            await bot.sendMessage(chatId, `🔐 Your OTP: ${otp}`);
            break;
        }
    }
}

function generateToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
           }
