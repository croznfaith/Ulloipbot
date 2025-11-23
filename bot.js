// Yeh alag server pe run karna hoga (Vercel pe nahi)
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '8488314208:AAEpn00TUMudtmGO4RgrFEtfxeLB235m6Qg';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    
    const token = generateToken();
    
    const userInfo = `
👤 Nick name : ${user.first_name} ${user.last_name || ''}
👤 Username : @${user.username || 'N/A'}
🆔 ID : ${user.id}
🆔 TOKEN : ${token}
----------------------------------------
Support @Help
    `;
    
    bot.sendMessage(chatId, userInfo);
});

function generateToken() {
    return Math.random().toString(36).substring(2, 15);
}
