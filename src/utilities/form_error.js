const core = require('@actions/core');

export const manageError = (res,resolve, reject) => {
    var result = "";
    res.on("data", (chunk) => { result += chunk; });
    res.on("end", () => {
        var data = JSON.parse(result);
       
        if (data.ok) {
            resolve(data);
        } else {
            console.log(data.error == undefined);
            if (data.error == undefined) {
                core.setFailed(data.description);
                reject(data.description);
            } else {
                core.setFailed(data.error);
                reject(data.error);
            }
        }
    });
}

