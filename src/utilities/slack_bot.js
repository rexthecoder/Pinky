const core = require('@actions/core');
const { manageError } = require('./form_error');

// Send File to client slack channel
async function send(form) {
    return new Promise((resolve, reject) => {
        var result = "";
        form.submit("https://slack.com/api/files.upload", (err, res) => {
            if (err) {
                reject(err);
            } else {
                manageError(res, result, resolve, reject);
            }
        });
    });
}


module.exports = telegramSend;