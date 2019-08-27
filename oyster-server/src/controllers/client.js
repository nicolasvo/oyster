const {google} = require('googleapis');
const keys = require('./res/keys.json');

const client = new google.auth.JWT(
  keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
  }
});

module.exports = client;