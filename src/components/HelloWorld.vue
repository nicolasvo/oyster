<template>
  <div class="container flex flex-col space-y-4 justify-center">
    <h1 class="mt-5 flex justify-center">{{ msg }}</h1>
    <div class="mt-5 flex justify-center">
      <table class="table-fixed">
        <thead>
          <tr>
            <th v-for="language in languages" :key="language" class="w-3/10 py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              {{ language }}
            </th>
            <th class="w-1/10 py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, index) in words" :key="word" class="hover:bg-grey-lighter">
            <td v-for="language in languages" :key="language" class="text-center py-2 px-6 border-b border-grey-light">
              {{ word[language] }}
            </td>
            <td class="py-2 px-6 border-b border-grey-light">
              <button v-on:click="buttonDeleteWord(index + 1)">
                <svg class="object-scale-down h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <form v-on:submit.prevent="buttonAddWord">
        <div v-for="language in languages" :key="language">
          <span class="text-gray-700">{{ language }}</span>
          <input class="mt-0 block py-0.1 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-green-500" type="text" v-model="newWords[language]" :placeholder="inputText">
        </div>
        <div class="flex justify-center">
          <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" type="submit">
            Add word
          </button>
        </div>
      </form>
    </div>
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
    newWords: new Map(),
    inputText: "",
  }),
  beforeCreate() {},
  created() {
    handleClientLoad().then(async () => {
      this.languages = await getLanguages();
      this.languages.forEach(language => {
        this.newWords.set(language, "");
      });
      this.words = await getWords();
    });
  },
  mounted() {},
  methods: {
    buttonDeleteWord (rowIndex) {
      deleteWord(rowIndex).then(() => {
        setTimeout(getWords().then(words => {
          this.words = words;
        }), 500);
      });
    },
    buttonAddWord () {
      for (let language of this.languages) {
        const word = this.newWords[language];
        if (word) {
          addWord(word, language).then(() => {
            setTimeout(getWords().then(words => {
              this.words = words;
            }), 500);
            this.newWords[language] = "";
          });
          break;
        }
      }
    },
  },
  watch: {
    words: {
      deep:true,
    }
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
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          if (isSignedIn) {
            console.log("User already signed in!");
            resolve("boi");
          } else {
            console.log("Requesting sign in...");
            gapi.auth2.getAuthInstance().signIn().then(() => {
              console.log("User successfully signed in!");
              resolve("boi");
            });
          }
        },
        function (error) {
          console.log(JSON.stringify(error, null, 2));
        }
      );
    });
  });
}

function getWords() {
  return new Promise(async (resolve, reject) => {
    await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    }).then(function(response) {
      const range = response.result;
      if (range.values.length > 0) {
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

function addWord(word, fromLanguage) {
  return new Promise(async (resolve, reject) => {
    let fromLanguageIndex = -1;
    const languages = await getLanguages();
    fromLanguageIndex = languages.indexOf(fromLanguage);
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
      resolve("boi");
    });
  });
}

function deleteWord(rowIndex) {
  return new Promise(async (resolve, reject) => {
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
      resolve("boi");
    });
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