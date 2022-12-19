const core = require('@actions/core');
const error = require('./form_error');

// Send File to client slack channel
// @param {Object} form - Form to send to slack
// @returns {Promise} - Promise that resolve or reject based on the response from slack
export const send = async (form) => {
    return new Promise((resolve, reject) => {
        // Submit form to slack
        form.submit("https://slack.com/api/files.upload", (err, res) => {
            if (err) {
                // if error, reject promise and log error
                core.setFailed(err);
                reject(err);
            } else {
                // Manage the error based the response from slack
                error.manageError(res, resolve, reject);
            }
        });
    });
}


