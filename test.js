const process = require('process');
const cp = require('child_process');
const path = require('path');
const core = require('@actions/core');
const { TelegramClient } = require('messaging-api-telegram');




test('throws invalid number', async () => {
    await telegramSend();
});


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_MILLISECONDS'] = 100;
    const ip = path.join(__dirname, 'src/index.js');
    const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
    console.log(result);
})

/// Send telegram message
async function telegramSend() {
    const client = new TelegramClient({
        accessToken: '1076693551:AAEAuyabC5AyoeHVbfKeOK4UN3yNsfwqX_s',
    });

    return new Promise((resolve, reject) => {
        try {
            client.sendMessage("-1171450576", 'Hello World');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

