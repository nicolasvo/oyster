<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <table>
      <thead>
        <tr>
          <th v-for="language in languages" :key="language">
            {{ language }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word">
          <td v-for="language in languages" :key="language">
            {{ word[language] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => ({
    words: [],
    languages: [],
  }),
  beforeCreate() {
  },
  created() {
    handleClientLoad().then(async () => {
      this.words = await getWords();
      console.log(this.words);
      this.languages = await getLanguages();
    });
  },
  mounted() {
  },
};

const spreadsheetId = '1CvbZsBsC-vqbqLyM8ov0B5O0SM-D3EB3zo6PJJYUpqs';
const range = 'A1:Z';

function handleClientLoad() {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      const CLIENT_ID = "582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
      const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
      const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4",];
      const SCOPES = "https://www.googleapis.com/auth/drive.file";
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          resolve({ isReady: true });
        },
        function (error) {
          console.log(JSON.stringify(error, null, 2));
        }
      );
    });
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("User signed in!");
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
}

function getWords() {
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
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
        resolve(data);
      } else {
        console.log('No data found.');
      }
    }, function(response) {
      console.log('Error: ' + response.result.error.message);
    });
  });
}

async function addWord(word, fromLanguage) {
  let fromLanguageIndex = -1;
  const languages = await getLanguages();
  fromLanguageIndex = languages.indexOf(fromLanguage);
  console.log(fromLanguageIndex);
  let values = [];
  for (let col = 0; col < languages.length; col++) {
    if (col !== fromLanguageIndex) {
      values.push(`=GOOGLETRANSLATE("${word}", "${fromLanguage}", "${languages[col]}")`);
    } else {
      values.push(word);
    }
  }
  console.log(values);
  const params = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",  
  };
  const valueRangeBody = {
    range: "A1:Z",
    majorDimension: "ROWS",
    values: [values],
  };
  await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody).then(function(response) {
    console.log("Word added!");
  });
}

async function deleteWord(rowIndex) {
  const params = {
    spreadsheetId: spreadsheetId,
  };
  const requestBody = {
    requests: [{
      deleteRange: {
        range: {
          startRowIndex: rowIndex,
          endRowIndex: rowIndex+1,
        },
        shiftDimension: "ROWS",
      }
    }]
  };
  await gapi.client.sheets.spreadsheets.batchUpdate(params, requestBody).then(function(response) {
    console.log("Word deleted!");
  });
}

async function updateWord(word, languageIndex, rowIndex) {
  const col = columnToLetter(languageIndex + 1);
  const range = col + (rowIndex + 1);
  const params = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
  };
  const valueRangeBody = {
    range: range,
    majorDimension: "ROWS",
    values: [[word]],
  };
  await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody).then(function(response) {
    console.log("Word updated!");
  });
}

function getLanguages() {
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    }).then(function(response) {
      const range = response.result;
      const languages = range.values[0];
      resolve(languages);
    });
  })
}

function columnToLetter(column) {
  let temp, letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
table {
  display: inline-block;
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
