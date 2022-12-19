const FormData = require('form-data');
const error = require('./form_error');
const core = require('@actions/core');

export async function send(path, webhookUrl, comment) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('upload-file', fs.createReadStream(path))
        formData.append('content', comment)
        formData.submit(webhookUrl, function (error, response) {
            if (error) {
                reject(err);
                core.setFailed(error.message)
            } else {
                error.manageError(res, result, resolve, reject);
            }
        })
    });
}
