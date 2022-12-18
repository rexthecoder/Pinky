const core = require('@actions/core');
// const { TelegramClient } = require('messaging-api-telegram');


// /// Send flutter apke to telegram channel
// export async function telegramSend(token, file, chatId) {

//     /// Target the client bot using the token
//     /// Make sure the bot is added to the channel
//     const client = new TelegramClient({
//         // accessToken: '1076693551:AAEAuyabC5AyoeHVbfKeOK4UN3yNsfwqX_s',
//         accessToken: token,
//     });

//     /// Covert file to curlfile
//     const file = new CurlFile(file, 'application/vnd.android.package-archive', 'app-release.apk');

//     /// Send the file to the channel
//     /// You can either provide the user number or the channel id
//     return new Promise((resolve, reject) => {
//         try {
//             // client.sendMessage("-1001171450576", 'Hello World',);
//             client.sendDocument(chatId, file)
//             resolve();
//         } catch (error) {
//             reject(error);
//             core.setFailed(error);
//         }
//     });
// }


const FormData = require('form-data');
const fs = require('fs');

export const telegramSend = async (token, file, chatId) => {
    try {
        const formData = new FormData();

        formData.append('chat_id', chatId);
        formData.append('file', file);
        formData.append('caption', 'Flutter App');

        TELEGRAM_API = `https://api.telegram.org/bot${token}`;

        const response = await axios.post(`${TELEGRAM_API}/senddocument`, formData, {
            headers: formData.getHeaders(),

        });

        return res.send();
    } catch (err) {
        console.log(err);
        core.setFailed(err);
    }
}