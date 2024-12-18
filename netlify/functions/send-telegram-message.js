const fetch = require('node-fetch');

// Use environment variables for sensitive data
exports.handler = async function(event, context) {
  // Access environment variables for the bot token and chat ID
  const botToken = process.env.BOT_TOKEN;  // Bot token from environment variable
  const chatId = process.env.CHAT_ID;      // Chat ID from environment variable

  if (!botToken || !chatId) {
    console.log('Bot Token or Chat ID is missing!');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Bot token or chat ID is not configured correctly.' })
    };
  }

  const message = 'Hello, this is a test message from my Netlify function!';

  try {
    // Log the variables and message for debugging purposes
    console.log('Bot Token:', botToken);
    console.log('Chat ID:', chatId);
    console.log('Message:', message);

    console.log('Sending message to Telegram...');

    // Make the API call to Telegram's sendMessage endpoint
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Get the response from Telegram
    const data = await response.json();
    console.log('Telegram Response:', data);

    // Check if the response was successful
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message sent successfully!' })
      };
    } else {
      // Handle Telegram API errors
      console.error('Error from Telegram API:', data.description);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message', details: data.description || 'Unknown error' })
      };
    }
  } catch (error) {
    // Catch network or other errors and log them
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending message', details: error.message })
    };
  }
};
