const fetch = require('node-fetch');  // Ensure node-fetch is installed if using local testing
exports.handler = async function(event, context) {
    const { message } = JSON.parse(event.body);

    // Retrieve environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Construct the URL for the Telegram API
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramPayload = {
        chat_id: chatId,
        text: message,
    };

    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telegramPayload),
        });
        
        const data = await response.json();

        if (data.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: 'Error from Telegram API' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Error with request' }),
        };
    }
};
