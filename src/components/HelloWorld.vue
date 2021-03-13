<template>
  <div v-if="preflightCheck">
    <h1 class="mt-5 flex justify-center">{{ msg }}</h1>
    <div v-if="!isSignedIn" class="flex justify-center">
      <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="buttonSignIn">
        Sign in 
      </button>
    </div>
    <div v-else class="container flex flex-col space-y-4 justify-center mb-2">
      <div v-show="languages.length">
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
                <td v-for="language in languages" :key="language" class="text-center py-2 px-6 border-b border-grey-light break-words">
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
      </div>
      <div v-show="languages.length" class="flex justify-center">
        <button class="mt-4 mb-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="toggleModal('word')">
          Add word
        </button>
      </div>
      <div v-if="showModalWord" class="flex justify-center fixed inline-block align-middle inset-0 z-50 items-center">
        <div class="p-6 rounded-lg shadow-lg bg-white overflow-auto">
          <div>
            <p class="float-left">new word</p> 
            <button v-on:click="toggleModal('word')" class="float-right">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M14.3,11.01c-0.4-0.17-0.72-0.36-1.01-0.53C12.83,10.2,12.49,10,12,10c-0.49,0-0.84,0.2-1.31,0.48c-0.28,0.17-0.6,0.35-0.98,0.51 C9.37,11.14,9,10.91,9,10.54v0c0-0.2,0.11-0.38,0.29-0.45c0.34-0.14,0.62-0.31,0.88-0.46C10.72,9.3,11.23,9,12,9s1.27,0.3,1.8,0.62 c0.27,0.16,0.55,0.33,0.9,0.48c0.18,0.08,0.29,0.26,0.29,0.45C15,10.91,14.63,11.15,14.3,11.01z M20.5,9c0,3.65-1.49,5.27-3.01,5.98 c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1s1,0.45,1,1V9z"/></svg>
            </button>
          </div>
          <br>
          <br>
          <form v-on:submit.prevent>
            <div v-for="language in languages" :key="language">
              <span class="text-gray-700">{{ language }}</span>
              <input class="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50" type="text" v-model="newWords[language]" :placeholder="inputText">
            </div>
            <div class="flex justify-center">
              <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" type="submit" v-on:click="buttonAddWord(); toggleModal('word');">
                Add word
              </button> 
            </div>
            <div class="flex justify-center">
              <button class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="toggleModal('word')">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="my-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="toggleModal('language')">
          Select languages
        </button>
      </div>
      <div v-if="showModalLanguage" class="flex justify-center fixed inline-block align-middle inset-0 z-50 items-center">
        <div class="p-6 rounded-lg shadow-lg bg-white overflow-auto h-3/4">
          <div>
            <p class="float-left">select languages</p> 
            <button v-on:click="toggleModal('language')" class="float-right">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24" y="0"/><path d="M17.5,9c0.83,0,1.5,0.67,1.5,1.5S18.33,12,17.5,12S16,11.33,16,10.5S16.67,9,17.5,9z M10.83,8H20v8h-1.17l1.87,1.87 C21.45,17.58,22,16.85,22,16V8c0-1.1-0.9-2-2-2H8.83L10.83,8z M19.78,22.61L15.17,18H4c-1.1,0-2-0.9-2-2V8 c0-0.85,0.55-1.58,1.3-1.87L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M13.17,16l-3-3H9v2H7v-2H5v-2h2V9.83L5.17,8H4v8H13.17z"/></svg>
            </button>
          </div>
          <br>
          <br>
          <form v-on:submit.prevent>
            <div v-for="language in availableLanguages" :key="language">
              <input class="rounded text-green-500 checked:bg-green-600 my-2" type="checkbox" v-model="selectedLanguages" :value="language.code" :id="language.code">
              <span class="ml-2 text-gray-700">{{ language.name }}</span>
            </div>
            <div class="flex justify-center">
              <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" type="submit" v-on:click="buttonSelectLanguages(); toggleModal('language');">
                Select languages
              </button>
            </div>
            <div class="flex justify-center">
              <button class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="toggleModal('language')">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showModalWord" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <div v-if="showModalLanguage" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
    preflightCheck: false,
    isSignedIn: false,
    sheetId: "",
    showModalWord: false,
    showModalLanguage: false,
    buttonShowLanguageText: "Show languages",
    selectedLanguages: [],
    availableLanguages: [
      { code: "af", name: "Afrikaans" },
      { code: "sq", name: "Albanian" },
      { code: "ar", name: "Arabic" },
      { code: "hy", name: "Armenian" },
      { code: "az", name: "Azerbaijani" },
      { code: "eu", name: "Basque" },
      { code: "be", name: "Belarusian" },
      { code: "bg", name: "Bulgarian" },
      { code: "ca", name: "Catalan" },
      { code: "zh-CN", name: "Chinese (Simplified)" },
      { code: "zh-TW", name: "Chinese (Traditional)" },
      { code: "hr", name: "Croatian" },
      { code: "cs", name: "Czech" },
      { code: "da", name: "Danish" },
      { code: "nl", name: "Dutch" },
      { code: "en", name: "English" },
      { code: "et", name: "Estonian" },
      { code: "tl", name: "Filipino" },
      { code: "fi", name: "Finnish" },
      { code: "fr", name: "French" },
      { code: "gl", name: "Galician" },
      { code: "ka", name: "Georgian" },
      { code: "de", name: "German" },
      { code: "el", name: "Greek" },
      { code: "ht", name: "Haitian Creole" },
      { code: "iw", name: "Hebrew" },
      { code: "hi", name: "Hindi" },
      { code: "hu", name: "Hungarian" },
      { code: "is", name: "Icelandic" },
      { code: "id", name: "Indonesian" },
      { code: "ga", name: "Irish" },
      { code: "it", name: "Italian" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
      { code: "lv", name: "Latvian" },
      { code: "lt", name: "Lithuanian" },
      { code: "mk", name: "Macedonian" },
      { code: "ms", name: "Malay" },
      { code: "mt", name: "Maltese" },
      { code: "no", name: "Norwegian" },
      { code: "fa", name: "Persian" },
      { code: "pl", name: "Polish" },
      { code: "pt", name: "Portuguese" },
      { code: "ro", name: "Romanian" },
      { code: "ru", name: "Russian" },
      { code: "sr", name: "Serbian" },
      { code: "sk", name: "Slovak" },
      { code: "sl", name: "Slovenian" },
      { code: "es", name: "Spanish" },
      { code: "sw", name: "Swahili" },
      { code: "sv", name: "Swedish" },
      { code: "th", name: "Thai" },
      { code: "tr", name: "Turkish" },
      { code: "uk", name: "Ukrainian" },
      { code: "ur", name: "Urdu" },
      { code: "vi", name: "Vietnamese" },
      { code: "cy", name: "Welsh" },
      { code: "yi", name: "Yiddish" },
    ]
  }),
  beforeCreate() {
  },
  created() {
    this.preflightCheck = JSON.parse(localStorage.getItem("preflightCheck"));
    this.isSignedIn = JSON.parse(localStorage.getItem("isSignedIn"));
    if (this.preflightCheck) {
      console.log("Loading from cache...");
      this.loadData();
      isSignedIn().then(async (isSignedIn) => {
        if (isSignedIn) {
          this.sheetId = await getSheet();
          console.log("Refreshing words...");
          await this.getData();
        }
      });
    } else {
      isSignedIn().then(async (isSignedIn) => {
        this.preflightCheck = true;
        if (isSignedIn) {
          this.isSignedIn = true;
        }
      });
    }
  },
  mounted() {
  },
  methods: {
    toggleModal: function(key) {
      if (key == "word") {
        this.showModalWord = !this.showModalWord;
      }
      else if (key == "language") {
        this.showModalLanguage = !this.showModalLanguage;
      }
    },
    buttonDeleteWord (rowIndex) {
      this.words.splice(rowIndex - 1, 1);
      console.log(this.words);
      deleteWord(rowIndex, this.sheetId).then(() => {
        setTimeout(getWords(this.sheetId).then(words => {
          this.words = words;
        }), 500);
      });
    },
    buttonAddWord () {
      for (let language of this.languages) {
        const word = this.newWords[language];
        if (word) {
          addWord(word, language, this.sheetId).then(() => {
            setTimeout(getWords(this.sheetId).then(words => {
              this.words = words;
            }), 500);
            this.newWords[language] = "";
          });
          break;
        }
      }
    },
    async buttonSelectLanguages () {
      console.log(`selected languages: ${this.selectedLanguages}`);
      const oldLanguages = this.languages.filter(x => !this.selectedLanguages.includes(x));
      const newLanguages = this.selectedLanguages.filter(x => !this.languages.includes(x));
      const sameLanguages = this.languages.filter(x => this.selectedLanguages.includes(x));
      const tempLanguages = this.languages;
      console.log(`old languages: ${oldLanguages}`); 
      console.log(`new languages: ${newLanguages}`);
      console.log(`same languages: ${sameLanguages}`);
      this.selectedLanguages = sameLanguages.concat(newLanguages);
      oldLanguages.reverse().forEach(async (language, index) => {
        const languageIndex = tempLanguages.indexOf(language);
        console.log(`language to delete: ${language} and ${languageIndex}`);
        await deleteLanguage(languageIndex, this.sheetId).then(() => {
          console.log(`hehe bye ${language}`)
        });
        // tempLanguages.splice(languageIndex, 1);
      });
      await setLanguages(this.selectedLanguages, this.sheetId).then(() => {
        this.languages = this.selectedLanguages;
      });
    },
    buttonSignIn () {
      gapi.auth2.getAuthInstance().signIn().then(async () => {
        console.log("User successfully signed in!");
        localStorage.setItem("preflightCheck", JSON.stringify(true));
        localStorage.setItem("isSignedIn", JSON.stringify(true));
        this.isSignedIn = true;
        this.sheetId = await getSheet();
        await this.getData();
      });
    },
    async getData() {
      this.languages = await getLanguages(this.sheetId);
      this.languages.forEach(language => {
        this.newWords.set(language, "");
      });
      if (this.languages.length) {
        this.words = await getWords(this.sheetId);
      }
    },
    loadData() {
      this.words = JSON.parse(localStorage.getItem("words"));
      this.languages = JSON.parse(localStorage.getItem("languages"));
    },
    storeData() {
      localStorage.setItem("words", JSON.stringify(this.words));
      localStorage.setItem("languages", JSON.stringify(this.languages));
    }
  },
  watch: {
    words: {
      deep: true,
      handler() {
        localStorage.setItem("words", JSON.stringify(this.words));
      }
    },
    languages: {
      deep: true,
      handler() {
        localStorage.setItem("languages", JSON.stringify(this.languages));
        this.selectedLanguages = this.languages;
      }
    },
  },
};

const range = 'A1:Z';

function isSignedIn() {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      const CLIENT_ID = "582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
      const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
      const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
      const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata";
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          if (isSignedIn) {
            console.log("User already signed in!");
            resolve(true);
          } else {
            resolve(false);
          }
        },
        function (error) {
          console.log(JSON.stringify(error, null, 2));
        }
      );
    });
  });
}

function getWords(spreadsheetId) {
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

function addWord(word, fromLanguage, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    let fromLanguageIndex = -1;
    const languages = await getLanguages(spreadsheetId);
    fromLanguageIndex = languages.indexOf(fromLanguage);
    let values = [];
    for (let col = 0; col < languages.length; col++) {
      if (col !== fromLanguageIndex) {
        values.push(`=GOOGLETRANSLATE("${word}";"${fromLanguage}";"${languages[col]}")`);
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

function deleteWord(rowIndex, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const params = {
      spreadsheetId: spreadsheetId,
    };
    const requestBody = {
      requests: [{
        deleteRange: {
          range: {
            startRowIndex: rowIndex,
            endRowIndex: rowIndex + 1,
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

function deleteLanguage(columnIndex, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const params = {
      spreadsheetId: spreadsheetId,
    };
    const requestBody = {
      requests: [
        {
          deleteRange: {
            range: {
              startColumnIndex: columnIndex,
              endColumnIndex: columnIndex + 1,
            },
            shiftDimension: "COLUMNS",
          }
        },
      ]
    };
    await gapi.client.sheets.spreadsheets.batchUpdate(params, requestBody).then(function(response) {
      console.log("Language deleted!");
      resolve(true);
    });
  });
}

function updateWord(word, languageIndex, rowIndex) {
  return new Promise(async (resolve, reject) => {
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
      resolve("boi");
    });
  });
}

function getLanguages(spreadsheetId) {
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    }).then(function(response) {
      const range = response.result;
      const languages = range.values[0];
      resolve(languages);
    }).catch(function(err) {
      resolve([]);
    });
  })
}

function setLanguages(languages, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const values = languages;
    const range = "A1:Z1";
    const params = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: "USER_ENTERED",  
    };
    const valueRangeBody = {
      range: range,
      majorDimension: "ROWS",
      values: [values],
    };
    await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody).then(function(response) {
      console.log("Languages set!");
      resolve("boi");
    });
  });
}

function clearLanguages(spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const range = "A1:Z1"
    const params = {
      spreadsheetId: spreadsheetId,
      range: range,
    };
    await gapi.client.sheets.spreadsheets.values.clear(params).then(function(response) {
      console.log("Languages cleared!");
      resolve("boi");
    });
  });
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

function getConfigFile() {
  return new Promise(async (resolve, reject) => {
    await gapi.client.drive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100
    }).then(function (res) {
      if (res) {
        if (res.result.files.length) {
          resolve(res.result.files[0].id);
        } else {
          resolve(false);
        }
      }
    });
  });
}

function createConfigFile() {
  return new Promise(async (resolve, reject) => {
    const fileMetadata = {
      'name': 'config.json',
      'parents': ['appDataFolder'],
    };
    await gapi.client.drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    }).then(function (file) {
      if (file) {
        resolve(file.result.id);
      }
    });
  });
}

function readConfigFile(fileId) {
  return new Promise(async (resolve, reject) => {
    await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    }).then(function(res) {
        resolve(res.body);
    });
  });
}

function writeConfigFile(fileId, sheetId, content) {
  return new Promise(async (resolve, reject) => {
    await gapi.client.request({
      path: '/upload/drive/v3/files/' + fileId,
      method: 'PATCH',
      params: {
        uploadType: 'media'
      },
      body: JSON.stringify(content)
    }).then(() => {
      resolve(true);
    });
  });
}

function createSheet() {
  return new Promise(async (resolve, reject) => {
    const resource = {
      properties: {
        title: "oyster_dictionary",
      },
    };
    await gapi.client.sheets.spreadsheets.create({
      resource,
      fields: 'spreadsheetId',
    }).then(function (spreadsheet) {
      if (spreadsheet) {
        resolve(spreadsheet.result.spreadsheetId);
      }
    });
  });
}

async function getSheet () {
  const fileId = await getConfigFile();
  if (!fileId) {
    console.log("No config file, creating config file and spreadsheet.");
    const [fileId, sheetId] = await Promise.all([createConfigFile(), createSheet()]);
    console.log("Writing sheet ID to config file.");
    await writeConfigFile(fileId, sheetId, {"sheetId": sheetId});
    return sheetId;
  } else {
    console.log("Config file already exists.");
    const content = await readConfigFile(fileId);
    const sheetId = JSON.parse(content).sheetId;
    return sheetId;
  }
}
</script>