<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="content"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    handleClientLoad();
  },
};

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  var CLIENT_ID = "582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4",];
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  })
  .then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    },
    function (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  );
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    getWords();
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
}
const spreadsheetId = '1CvbZsBsC-vqbqLyM8ov0B5O0SM-D3EB3zo6PJJYUpqs';
function getWords() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'A1:C',
  }).then(function(response) {
    const range = response.result;
    if (range.values.length > 0) {
      console.log(range.values.length);
      const languages = range.values[0];
      const data = [];
      let temp = {};
      const zip = (a, b) => a.map((x, i) => [x, b[i]]);
      for (const row of range.values.slice(1)) {
        temp = {};
        for (const [language, word] of zip(languages, row)) {
          temp[language] = word;
        }
        data.push(temp);
      }
      // console.log(data);
      return data;
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function addWord() {
  
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
