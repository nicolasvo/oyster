<template>
  <div v-if="preflightCheck">
    <h1 class="mt-5 flex justify-center">{{ msg }}</h1>
    <div v-if="!isSignedIn" class="flex justify-center">
      <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" v-on:click="buttonSignIn">
        Sign in 
      </button>
    </div>
    <div v-else class="container flex flex-col space-y-4 justify-center">
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
      <div class="flex justify-center">
        <form v-on:submit.prevent="buttonSelectLanguages">
          <div v-for="language in availableLanguages" :key="language">
            <input type="checkbox" v-model="selectedLanguages" :value="language.code" :id="language.code">
            <span class="ml-2 text-gray-700">{{ language.name }}</span>
          </div>
          <p>{{ selectedLanguages }}</p>
          <div class="flex justify-center">
            <button class="my-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none" type="submit">
              Select language
            </button>
          </div>
        </form>
      </div>
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
    preflightCheck: false,
    isSignedIn: false,
    sheetId: "",
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
      // { code: "zh-CN", name: "Chinese (Simplified)" },
      // { code: "zh-TW", name: "Chinese (Traditional)" },
      // { code: "hr", name: "Croatian" },
      // { code: "cs", name: "Czech" },
      // { code: "da", name: "Danish" },
      // { code: "nl", name: "Dutch" },
      // { code: "en", name: "English" },
      // { code: "et", name: "Estonian" },
      // { code: "tl", name: "Filipino" },
      // { code: "fi", name: "Finnish" },
      // { code: "fr", name: "French" },
      // { code: "gl", name: "Galician" },
      // { code: "ka", name: "Georgian" },
      // { code: "de", name: "German" },
      // { code: "el", name: "Greek" },
      // { code: "ht", name: "Haitian Creole" },
      // { code: "iw", name: "Hebrew" },
      // { code: "hi", name: "Hindi" },
      // { code: "hu", name: "Hungarian" },
      // { code: "is", name: "Icelandic" },
      // { code: "id", name: "Indonesian" },
      // { code: "ga", name: "Irish" },
      // { code: "it", name: "Italian" },
      // { code: "ja", name: "Japanese" },
      // { code: "ko", name: "Korean" },
      // { code: "lv", name: "Latvian" },
      // { code: "lt", name: "Lithuanian" },
      // { code: "mk", name: "Macedonian" },
      // { code: "ms", name: "Malay" },
      // { code: "mt", name: "Maltese" },
      // { code: "no", name: "Norwegian" },
      // { code: "fa", name: "Persian" },
      // { code: "pl", name: "Polish" },
      // { code: "pt", name: "Portuguese" },
      // { code: "ro", name: "Romanian" },
      // { code: "ru", name: "Russian" },
      // { code: "sr", name: "Serbian" },
      // { code: "sk", name: "Slovak" },
      // { code: "sl", name: "Slovenian" },
      // { code: "es", name: "Spanish" },
      // { code: "sw", name: "Swahili" },
      // { code: "sv", name: "Swedish" },
      // { code: "th", name: "Thai" },
      // { code: "tr", name: "Turkish" },
      // { code: "uk", name: "Ukrainian" },
      // { code: "ur", name: "Urdu" },
      // { code: "vi", name: "Vietnamese" },
      // { code: "cy", name: "Welsh" },
      // { code: "yi", name: "Yiddish" },
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
    buttonSelectLanguages () {
      // TODO: call function to write languages to config file
      console.log("faith +1");
      console.log(this.selectedLanguages);
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
      this.words = await getWords(this.sheetId);
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
    });
  })
}

function setLanguages(languages, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    console.log(`Setting languages ${languages}!`);
    const values = languages;
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
    await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody).then(function(res) {
      console.log("Languages set!");
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

function writeConfigFile(fileId, sheetId) {
  return new Promise(async (resolve, reject) => {
    await gapi.client.request({
      path: '/upload/drive/v3/files/' + fileId,
      method: 'PATCH',
      params: {
        uploadType: 'media'
      },
      body: JSON.stringify({"sheetId": sheetId})
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
    const languages = ["en", "de", "ru"];
    await Promise.all([writeConfigFile(fileId, sheetId), setLanguages(languages, sheetId)]);
    return sheetId;
  } else {
    console.log("Config file already exists.");
    const content = await readConfigFile(fileId);
    const sheetId = JSON.parse(content).sheetId;
    return sheetId;
  }
}
</script>