const core = require('@actions/core');
const error = require('./form_error');

// Send File to client slack channel
export async function send(form) {
    return new Promise((resolve, reject) => {
        var result = "";
        form.submit("https://slack.com/api/files.upload", (err, res) => {
            if (err) {
                reject(err);
            } else {
                error.manageError(res, result, resolve, reject);
            }
        });
    });
}


