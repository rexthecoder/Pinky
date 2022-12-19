// const core = require('@actions/core');
const FormData = require('form-data');
const error = require('./form_error');

// Send File to client telegram channel
// @param {String} token - Token of the bot
// @param {Object} file - File to send
// @param {String} chatId - Id of the chat
// @param {String} comment - Comment to send with the file
// @returns {Promise} - Promise that resolve or reject based on the response from telegram
export const telegramSend = async (token, file, chatId, comment) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        // Add the chat id to the form
        formData.append('chat_id', chatId);
        // Add the file to the form
        formData.append('document', file);
        // Add the comment to the form
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
