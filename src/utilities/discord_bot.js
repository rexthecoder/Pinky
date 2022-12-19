const FormData = require('form-data');
const core = require('@actions/core');
var fs = require('fs');

// Send File to client discord channel
// @param {String} path - Path of the file to send
// @param {String} webhookUrl - Url of the webhook
// @param {String} comment - Comment to send with the file
// @returns {Promise} - Promise that resolve or reject based on the response from discord
export const send = async (path, webhookUrl, comment) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        // Add file to form
        formData.append('upload-file', fs.createReadStream(path))
        // Add comment to form
        formData.append('content', comment)
        // Submit form to discord
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
