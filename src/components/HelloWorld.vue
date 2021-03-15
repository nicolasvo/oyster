<template>
  <div v-if="preflightCheck">
    <h1 class="mt-5 flex justify-center">{{ msg }}</h1>
    <div v-if="!isSignedIn" class="flex justify-center">
      <button
        class="my-5 py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
        v-on:click="buttonSignIn"
      >
        Sign in
      </button>
    </div>
    <div v-else class="container flex flex-col space-y-4 justify-center mb-2">
      <div v-show="languages.length">
        <div class="mt-5 flex justify-center">
          <table class="table-auto overflow-auto">
            <thead>
              <tr>
                <th
                  v-for="language in languages"
                  :key="language"
                  class="w-3/10 py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
                >
                  {{ language }}
                </th>
                <th
                  class="w-1/10 py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(word, index) in words"
                :key="word"
                class="hover:bg-grey-lighter"
              >
                <td
                  v-for="language in languages"
                  :key="language"
                  class="text-center py-2 px-6 border-b border-grey-light break-words"
                >
                  {{ word[language] }}
                </td>
                <td class="py-2 px-6 border-b border-grey-light">
                  <button v-on:click="buttonDeleteWord(index + 1)">
                    <svg
                      class="object-scale-down h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="languages.length" class="flex justify-center">
        <button
          class="mt-4 mb-2 py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
          v-on:click="toggleModal('word')"
        >
          Add word
        </button>
      </div>
      <div
        v-if="showModalWord"
        class="flex justify-center fixed inset-0 z-50 items-center"
        v-on:click.self="toggleModal('word')"
      >
        <div class="p-6 rounded-lg shadow-lg bg-white overflow-auto z-60">
          <div>
            <p class="float-left">new word</p>
            <button v-on:click="toggleModal('word')" class="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                stroke="currentColor"
                stroke-width="0"
              >
                <rect fill="none" stroke="transparent" height="24" width="24" />
                <path
                  d="M9.5,12c0,0.55-0.45,1-1,1s-1-0.45-1-1c0-0.55,0.45-1,1-1S9.5,11.45,9.5,12z M13.75,10c0.55,0,1-0.45,1-1s-0.45-1-1-1 s-1,0.45-1,1S13.2,10,13.75,10z M10.25,10c0.55,0,1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1S9.7,10,10.25,10z M10.25,14 c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1s1-0.45,1-1C11.25,14.45,10.8,14,10.25,14z M22,11.25v1.5c0,0.41-0.34,0.75-0.75,0.75 c-0.41,0-0.75-0.34-0.75-0.75h-1.54c-0.15,1.37-0.69,2.63-1.52,3.65l1.09,1.09l0.01-0.01c0.29-0.29,0.77-0.29,1.06,0 c0.29,0.29,0.29,0.77,0,1.06l-1.06,1.06c-0.29,0.29-0.77,0.29-1.06,0c-0.29-0.29-0.29-0.76-0.01-1.05l-1.09-1.09 c-1.02,0.82-2.27,1.36-3.64,1.51v1.54h0.01c0.41,0,0.75,0.34,0.75,0.75c0,0.41-0.34,0.75-0.75,0.75h-1.5 c-0.41,0-0.75-0.34-0.75-0.75c0-0.41,0.33-0.74,0.74-0.75v-1.55c-1.37-0.15-2.62-0.69-3.63-1.51l-1.09,1.09l0.01,0.01 c0.29,0.29,0.29,0.77,0,1.06c-0.29,0.29-0.77,0.29-1.06,0L4.4,18.54c-0.29-0.29-0.29-0.77,0-1.06c0.29-0.29,0.76-0.29,1.05-0.01 l1.09-1.09c-0.82-1.02-1.36-2.26-1.5-3.63H3.5c0,0.41-0.34,0.75-0.75,0.75C2.34,13.5,2,13.16,2,12.75v-1.5 c0-0.41,0.34-0.75,0.75-0.75c0.41,0,0.75,0.34,0.75,0.75h1.54c0.15-1.37,0.69-2.61,1.5-3.63L5.45,6.53C5.16,6.81,4.69,6.81,4.4,6.52 c-0.29-0.29-0.29-0.77,0-1.06L5.46,4.4c0.29-0.29,0.77-0.29,1.06,0c0.29,0.29,0.29,0.77,0,1.06L6.51,5.47L7.6,6.56 c1.02-0.82,2.26-1.36,3.63-1.51V3.5c-0.41-0.01-0.74-0.34-0.74-0.75C10.5,2.34,10.84,2,11.25,2h1.5c0.41,0,0.75,0.34,0.75,0.75 c0,0.41-0.34,0.75-0.75,0.75h-0.01v1.54c1.37,0.14,2.62,0.69,3.64,1.51l1.09-1.09c-0.29-0.29-0.28-0.76,0.01-1.05 c0.29-0.29,0.77-0.29,1.06,0l1.06,1.06c0.29,0.29,0.29,0.77,0,1.06s-0.77,0.29-1.06,0l-0.01-0.01L17.44,7.6 c0.82,1.02,1.37,2.27,1.52,3.65h1.54c0-0.41,0.34-0.75,0.75-0.75C21.66,10.5,22,10.84,22,11.25z M17,12c0-2.76-2.24-5-5-5 s-5,2.24-5,5s2.24,5,5,5S17,14.76,17,12z M12,11c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1s1-0.45,1-1C13,11.45,12.55,11,12,11z M15.5,11c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1s1-0.45,1-1C16.5,11.45,16.05,11,15.5,11z M13.75,14c-0.55,0-1,0.45-1,1 c0,0.55,0.45,1,1,1s1-0.45,1-1C14.75,14.45,14.3,14,13.75,14z"
                />
              </svg>
            </button>
          </div>
          <br />
          <br />
          <form v-on:submit.prevent>
            <div v-for="language in languages" :key="language">
              <span class="text-gray-700">{{ language }}</span>
              <input
                class="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:border-pink-400 focus:ring-pink-400"
                type="text"
                v-model="newWords[language]"
                :placeholder="inputText"
              />
            </div>
            <div class="flex justify-center">
              <button
                class="my-5 py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
                type="submit"
                v-on:click="
                  buttonAddWord();
                  toggleModal('word');
                "
              >
                Add word
              </button>
            </div>
            <div class="flex justify-center">
              <button
                class="py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
                v-on:click="toggleModal('word')"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="my-2 py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
          v-on:click="toggleModal('language')"
        >
          Select languages
        </button>
      </div>
      <div
        v-if="showModalLanguage"
        class="flex justify-center fixed inset-0 z-50 items-center"
        v-on:click.self="toggleModal('language')"
      >
        <div class="p-6 rounded-lg shadow-lg bg-white overflow-auto h-3/4 z-60">
          <div>
            <p class="float-left">select languages</p>
            <button v-on:click="toggleModal('language')" class="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                stroke="currentColor"
                stroke-width="0"
              >
                <rect fill="none" stroke="transparent" height="24" width="24" />
                <path
                  d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M7,11.5V9.85c1.12-0.23,1.95-0.69,2.66-1.08C10.48,8.33,11.07,8,12,8c0.93,0,1.52,0.33,2.34,0.78c0.71,0.39,1.54,0.84,2.66,1.08 v1.65c0,2.76-2.24,5-5,5S7,14.26,7,11.5z M20.5,9c0,3.65-1.49,5.27-3.01,5.98c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1 s1,0.45,1,1V9z M10.69,10.48c-0.44,0.26-0.96,0.56-1.69,0.76V10.2c0.48-0.17,0.84-0.38,1.18-0.58C10.72,9.3,11.23,9,12,9 s1.27,0.3,1.8,0.62c0.34,0.2,0.71,0.42,1.2,0.59v1.04c-0.75-0.21-1.26-0.51-1.71-0.78C12.83,10.2,12.49,10,12,10 C11.51,10,11.16,10.2,10.69,10.48z"
                />
              </svg>
            </button>
          </div>
          <br />
          <br />
          <form v-on:submit.prevent>
            <div v-for="language in availableLanguages" :key="language">
              <input
                class="my-2 rounded text-pink-500 checked:bg-pink-600"
                type="checkbox"
                v-model="selectedLanguages"
                :value="language.code"
                :id="language.code"
              />
              <span class="ml-2 text-gray-700">{{ language.name }}</span>
            </div>
            <div class="flex justify-center">
              <button
                class="my-5 py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
                type="submit"
                v-on:click="
                  buttonSelectLanguages();
                  toggleModal('language');
                "
              >
                Select languages
              </button>
            </div>
            <div class="flex justify-center">
              <button
                class="py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none bg-pink-500 hover:bg-pink-600"
                v-on:click="toggleModal('language')"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- <div class="flex justify-center">
        <button class="my-5 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none" v-on:click="nuke()">
          Nuke
        </button>
      </div> -->
    </div>
    <div
      v-if="showModalWord"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
    <div
      v-if="showModalLanguage"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
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
    ],
  }),
  beforeCreate() {},
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
  mounted() {},
  methods: {
    nuke() {
      localStorage.clear();
      gapi.auth2.getAuthInstance().disconnect();
      console.log("clearing local storage!!!");
    },
    toggleModal(key) {
      if (key == "word") {
        this.showModalWord = !this.showModalWord;
      } else if (key == "language") {
        this.showModalLanguage = !this.showModalLanguage;
      }
    },
    buttonDeleteWord(rowIndex) {
      this.words.splice(rowIndex - 1, 1);
      console.log(this.words);
      deleteWord(rowIndex, this.sheetId).then(() => {
        setTimeout(
          getWords(this.sheetId).then((words) => {
            this.words = words;
          }),
          500
        );
      });
    },
    buttonAddWord() {
      for (let language of this.languages) {
        const word = this.newWords[language];
        if (word) {
          addWord(word, language, this.sheetId).then(() => {
            setTimeout(
              getWords(this.sheetId).then((words) => {
                this.words = words;
              }),
              500
            );
            this.newWords[language] = "";
          });
          break;
        }
      }
    },
    async buttonSelectLanguages() {
      console.log(`selected languages: ${this.selectedLanguages}`);
      const oldLanguages = this.languages.filter(
        (x) => !this.selectedLanguages.includes(x)
      );
      const newLanguages = this.selectedLanguages.filter(
        (x) => !this.languages.includes(x)
      );
      const sameLanguages = this.languages.filter((x) =>
        this.selectedLanguages.includes(x)
      );
      const tempLanguages = this.languages;
      console.log(`old languages: ${oldLanguages}`);
      console.log(`new languages: ${newLanguages}`);
      console.log(`same languages: ${sameLanguages}`);
      this.selectedLanguages = sameLanguages.concat(newLanguages);
      oldLanguages.reverse().forEach(async (language, index) => {
        const languageIndex = tempLanguages.indexOf(language);
        console.log(`language to delete: ${language} and ${languageIndex}`);
        await deleteLanguage(languageIndex, this.sheetId).then(() => {
          console.log(`hehe bye ${language}`);
        });
        // tempLanguages.splice(languageIndex, 1);
      });
      await setLanguages(this.selectedLanguages, this.sheetId).then(() => {
        this.languages = this.selectedLanguages;
      });
    },
    buttonSignIn() {
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(async () => {
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
      this.languages.forEach((language) => {
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
    },
  },
  watch: {
    words: {
      deep: true,
      handler() {
        localStorage.setItem("words", JSON.stringify(this.words));
      },
    },
    languages: {
      deep: true,
      handler() {
        localStorage.setItem("languages", JSON.stringify(this.languages));
        this.selectedLanguages = this.languages;
      },
    },
  },
};

const range = "A1:Z";

function isSignedIn() {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      const CLIENT_ID =
        "582485760308-aim00v0sor96v66bn2h4rgerqo1f1g74.apps.googleusercontent.com";
      const API_KEY = "AIzaSyBUANl-jEVX7FlqOIGr3hVYrH3WUwvLFtU";
      const DISCOVERY_DOCS = [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ];
      const SCOPES =
        "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata";
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          () => {
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
    await gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(
        function (response) {
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
            console.log("No data found.");
          }
        },
        function (response) {
          console.log("Error: " + response.result.error.message);
        }
      );
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
        values.push(
          `=GOOGLETRANSLATE("${word}";"${fromLanguage}";"${languages[col]}")`
        );
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
    await gapi.client.sheets.spreadsheets.values
      .append(params, valueRangeBody)
      .then(function (response) {
        console.log("Word added!");
        resolve(true);
      });
  });
}

function deleteWord(rowIndex, spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const params = {
      spreadsheetId: spreadsheetId,
    };
    const requestBody = {
      requests: [
        {
          deleteRange: {
            range: {
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
            },
            shiftDimension: "ROWS",
          },
        },
      ],
    };
    await gapi.client.sheets.spreadsheets
      .batchUpdate(params, requestBody)
      .then(function (response) {
        console.log("Word deleted!");
        resolve(true);
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
          },
        },
      ],
    };
    await gapi.client.sheets.spreadsheets
      .batchUpdate(params, requestBody)
      .then(function (response) {
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
    await gapi.client.sheets.spreadsheets.values
      .update(params, valueRangeBody)
      .then(function (response) {
        console.log("Word updated!");
        resolve(true);
      });
  });
}

function getLanguages(spreadsheetId) {
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(function (response) {
        const range = response.result;
        const languages = range.values[0];
        resolve(languages);
      })
      .catch(function (err) {
        resolve([]);
      });
  });
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
    await gapi.client.sheets.spreadsheets.values
      .update(params, valueRangeBody)
      .then(function (response) {
        console.log("Languages set!");
        resolve(true);
      });
  });
}

function clearLanguages(spreadsheetId) {
  return new Promise(async (resolve, reject) => {
    const range = "A1:Z1";
    const params = {
      spreadsheetId: spreadsheetId,
      range: range,
    };
    await gapi.client.sheets.spreadsheets.values
      .clear(params)
      .then(function (response) {
        console.log("Languages cleared!");
        resolve(true);
      });
  });
}

function columnToLetter(column) {
  let temp,
    letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function getConfigFile() {
  return new Promise(async (resolve, reject) => {
    await gapi.client.drive.files
      .list({
        spaces: "appDataFolder",
        fields: "nextPageToken, files(id, name)",
        pageSize: 100,
      })
      .then(function (res) {
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
      name: "config.json",
      parents: ["appDataFolder"],
    };
    await gapi.client.drive.files
      .create({
        resource: fileMetadata,
        fields: "id",
      })
      .then(function (file) {
        if (file) {
          resolve(file.result.id);
        }
      });
  });
}

function readConfigFile(fileId) {
  return new Promise(async (resolve, reject) => {
    await gapi.client.drive.files
      .get({
        fileId: fileId,
        alt: "media",
      })
      .then(function (res) {
        resolve(res.body);
      });
  });
}

function writeConfigFile(fileId, sheetId, content) {
  return new Promise(async (resolve, reject) => {
    await gapi.client
      .request({
        path: "/upload/drive/v3/files/" + fileId,
        method: "PATCH",
        params: {
          uploadType: "media",
        },
        body: JSON.stringify(content),
      })
      .then(() => {
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
    await gapi.client.sheets.spreadsheets
      .create({
        resource,
        fields: "spreadsheetId",
      })
      .then(function (spreadsheet) {
        if (spreadsheet) {
          resolve(spreadsheet.result.spreadsheetId);
        }
      });
  });
}

async function getSheet() {
  const fileId = await getConfigFile();
  if (!fileId) {
    console.log("No config file, creating config file and spreadsheet.");
    const [fileId, sheetId] = await Promise.all([
      createConfigFile(),
      createSheet(),
    ]);
    console.log("Writing sheet ID to config file.");
    await writeConfigFile(fileId, sheetId, { sheetId: sheetId });
    return sheetId;
  } else {
    console.log("Config file already exists.");
    const content = await readConfigFile(fileId);
    const sheetId = JSON.parse(content).sheetId;
    return sheetId;
  }
}
</script>