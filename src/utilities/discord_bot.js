const FormData = require('form-data');
const core = require('@actions/core');
var fs = require('fs');

export async function send(path, webhookUrl, comment) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('upload-file', fs.createReadStream(path))
        formData.append('content', comment)
        formData.submit(webhookUrl, (err, res) => {
            if (err != null) {
                core.setFailed(err.message)
                reject(err);
            } else {
                core.info('successfully uploaded file')
                resolve(res.statusCode)
            }
        })
    });
}
