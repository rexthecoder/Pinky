const process = require('process');
const cp = require('child_process');
const path = require('path');
const core = require('@actions/core');
const FormData = require('form-data');
const fs = require('fs');



test('throws invalid number', async () => {
  await telegramSend().then((result) => console.log(result));
});


// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//     process.env['INPUT_MILLISECONDS'] = 100;
//     const ip = path.join(__dirname, 'src/index.js');
//     const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
//     console.log(result);
// })

const telegramSend = async () => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('upload-file', fs.createReadStream('./quick.js'))
        formData.append('content', "Hello")
        var result = "";
        formData.submit('https://discord.com/api/webhooks/1054179692653051954/T7lUtdL1Z6rVGWI-udQv7iQ0rsHtZEISZW1ZyzkZdiiJL0oa9tM6y8C2HeL0PX5bsauO', (error, res) => {
            if (error != null) {
                reject(error);
                core.setFailed(error.message)
            } else {
                core.info('successfully uploaded file')
                resolve(res.statusCode)
            }
        })
    });
}