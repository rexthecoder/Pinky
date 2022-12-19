// const core = require('@actions/core');
const FormData = require('form-data');
const error = require('./form_error');


export const telegramSend = async (token, file, chatId, comment) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', file);
        formData.append('caption', comment);

        const api = `https://api.telegram.org/bot${token}`;
        formData.submit(`${api}/senddocument`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                error.manageError(res,resolve, reject);
            }
        });
    });
}
