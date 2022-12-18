const process = require('process');
const cp = require('child_process');
const path = require('path');
const core = require('@actions/core');
const FormData = require('form-data');
const fs = require('fs');
const { manageError } = require('./src/utilities/form_error');


test('throws invalid number', async () => {
    await telegramSend('1076693551:AAEAuyabC5AyoeHVbfKeOK4UN3yNsfwqX_s', fs.createReadStream('./quick.js'), '-1001171450576');
});


// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//     process.env['INPUT_MILLISECONDS'] = 100;
//     const ip = path.join(__dirname, 'src/index.js');
//     const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
//     console.log(result);
// })

const telegramSend = async (token, file, chatId) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();

        formData.append('chat_id', chatId);
        formData.append('document', file);
        formData.append('caption', 'Flutter App');

        const api = `https://api.telegram.org/bot${token}`;
        var result = "";
        formData.submit(`${api}/senddocument`, (err, res) => {
            // stop promise when code is finish running
            if (err) {
                reject(err);
            } else {
                res.on("data", (chunk) => { result += chunk; });
                res.on("end", () => {
                    var data = JSON.parse(result);
                    if (data.ok) {
                        resolve(data);
                    } else {
                        reject(data.description);
                        
                    }
                });
            }
        });
    });
}