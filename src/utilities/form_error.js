const core = require('@actions/core');


/// Function that manage the error based on the response from the form request
/// @param {Object} res - Response from slack
/// @param {Function} resolve - Function to resolve the promise
/// @param {Function} reject - Function to reject the promise
export const manageError = async (res,resolve, reject) => {
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

