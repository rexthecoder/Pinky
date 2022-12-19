const FormData = require('form-data');
const core = require('@actions/core');
var fs = require('fs');
const error = require('./form_error.js');

export async function send(path, webhookUrl, comment) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('upload-file', fs.createReadStream(path))
        formData.append('content', comment)
        formData.submit(webhookUrl, (err, res) => {
            if (err != null) {
                reject(err);
                core.setFailed(error.message)
            } else {
                core.info('successfully uploaded file')
                resolve(res.statusCode)
            }
        })
    });
}
