const core = require('@actions/core');
const FormData = require('form-data');
const { telegramSend } = require('./utilities/telegram_bot');
const { slack } = require('./utilities/slack_bot');
var fs = require('fs');


async function run() {
  try {
    /// Get all the action input values
    const slacktoken = core.getInput('slack_token');
    const path = core.getInput('path');
    const channel = core.getInput('channel');
    const filename = core.getInput('filename');
    const filetype = core.getInput('filetype');
    const comment = core.getInput('comment');
    const telegram_token = core.getInput('telegram_token');
    const telegram_chat_id = core.getInput('telegram_chat_id');


    /// Send file to telegram incase the token is provided
    if (telegram_token && telegram_chat_id) {
      telegramSend(telegram_token, fs.createReadStream(path), telegram_chat_id);
    }

    /// Send file to slack incase the token is provided
    if (slacktoken) {
      var form = new FormData();
      form.append('token', slacktoken);
      form.append('file', fs.createReadStream(path));
      if (filename) form.append('filename', filename);
      if (channel) form.append('channels', channel);
      if (filetype) form.append('filetype', filetype);
      if (comment) form.append('initial_comment', initial_comment);



      slack(form);
    }


  } catch (error) {
    console.log(error);
    core.setFailed(error);
  }
}

run();