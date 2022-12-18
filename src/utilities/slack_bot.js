const core = require('@actions/core');

// Send File to client slack channel
export async function slack(form) {
    return new Promise((resolve, reject) => {
        var result = "";
        form.submit("https://slack.com/api/files.upload", (err, res) => {
            if (err) {
                reject(err);
            } else {
                res.on("data", (chunk) => { result += chunk; });
                res.on("end", () => {
                    var data = JSON.parse(result);
                    if (data.ok) {
                        core.setOutput("slack_result", result);
                        resolve(data);
                    } else {
                        core.setFailed(data.error);
                        reject(data.error);
                    }
                });
            }
        });
    });
}