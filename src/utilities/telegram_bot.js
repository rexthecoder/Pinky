const core = require('@actions/core');
const FormData = require('form-data');
const { manageError } = require('./form_error');


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
                manageError(res, result, resolve, reject);
                // res.on("data", (chunk) => { result += chunk; });
                // res.on("end", () => {
                //     var data = JSON.parse(result);
                //     if (data.ok) {
                //         resolve(data);
                //     } else {
                //         core.setFailed(data.description);
                //         reject(data.description);
                //     }
                // });
            }
        });
    });
}

module.exports = telegramSend;