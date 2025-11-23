const TelegramBot = require('node-telegram-bot-api');

const adminBot = new TelegramBot(BOT_TOKEN, { polling: true });
const pendingApprovals = new Map();

// Admin approval handler
adminBot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const [action, userId] = data.split(':');
    
    if(action === 'approve') {
        // Generate API token for user
        const apiToken = generateAPIToken();
        
        // Save to database
        await saveUserToken(userId, apiToken);
        
        // Notify user
        await adminBot.sendMessage(userId, `✅ Your API token has been approved!\nAPI Token: ${apiToken}`);
        
        // Update admin message
        await adminBot.editMessageText('✅ User Approved', {
            chat_id: message.chat.id,
            message_id: message.message_id
        });
    } else if(action === 'reject') {
        await adminBot.sendMessage(userId, '❌ Your token request has been rejected.');
        await adminBot.editMessageText('❌ User Rejected', {
            chat_id: message.chat.id,
            message_id: message.message_id
        });
    } else if(action === 'revoke') {
        await revokeToken(userId);
        await adminBot.sendMessage(userId, '🔒 Your token has been revoked. New token generated.');
        await adminBot.editMessageText('🔒 Token Revoked', {
            chat_id: message.chat.id,
            message_id: message.message_id
        });
    }
});
