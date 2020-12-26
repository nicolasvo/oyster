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
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
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
      appendPre(JSON.stringify(error, null, 2));
    }
  );
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("... i'm signed in!");
    listMajors();
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
}

function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      console.log('Name, Major:');
      console.log(range.values.length);
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        console.log(row[0] + ', ' + row[1]);
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
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
