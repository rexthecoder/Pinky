const core = require('@actions/core');
const { TelegramClient } = require('messaging-api-telegram');


/// Send flutter apke to telegram channel
export async function telegramSend(token, file, chatId) {

    /// Target the client bot using the token
    /// Make sure the bot is added to the channel
    const client = new TelegramClient({
        // accessToken: '1076693551:AAEAuyabC5AyoeHVbfKeOK4UN3yNsfwqX_s',
        accessToken: token,
    });

    /// Send the file to the channel
    /// You can either provide the user number or the channel id
    return new Promise((resolve, reject) => {
        try {
            // client.sendMessage("-1001171450576", 'Hello World',);
            client.sendDocument(chatId, file)
            resolve();
        } catch (error) {
            reject(error);
            core.setFailed(error);
        }
    });
}
