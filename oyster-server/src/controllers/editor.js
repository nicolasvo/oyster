const {google} = require('googleapis');
const Sheets = require('./sheets.js');
const client = require('./client.js');
const sheets_id = require('./res/sheets_id.json');

module.exports = class Editor {
  constructor() {
    google.options({auth: client});
    this.sheets = new Sheets([google.drive('v3'), google.sheets('v4')]);
    this.spreadsheetId = sheets_id.id;
  }

  async get() {
    return await this.sheets.getValues(this.spreadsheetId, 'A1:L').then(
      response => {
        const result = response.data.values.filter(row => (row.length) ? row : null);
        const languages = result[0];
        const data = [];
        let temp = {};
        const zip = (a, b) => a.map((x, i) => [x, b[i]]);

        for (const row of result.slice(1, -1)) {
          temp = {};
          for (const [language, word] of zip(languages, row)) {
            temp[language] = word;
          }
          data.push(temp);
        }
        return data;
      });
  }

  async getColumns() {
    const result = await this.sheets.getValues(this.spreadsheetId, 'A1:L1');
    return result.data.values[0];
  }

  async append(word, from_lang) {
    const column = await this.sheets.getValues(this.spreadsheetId, 'A1:L1');
    const languages = column.data.values[0];
    let values = [];
    let lang_from_index = -1;

    if (languages.indexOf(from_lang) > -1) {
      lang_from_index = languages.indexOf(from_lang);
    } else {
      throw new Error(`${from_lang} is not a column.`);
    }

    for (let col = 0; col < languages.length; col++) {
      if (col !== lang_from_index) {
        values.push(`=GOOGLETRANSLATE("${word}", "${from_lang}", "${languages[col]}")`);
      } else {
        values.push(word);
      }
    }

    const result = await this.sheets.appendValues(
      this.spreadsheetId,
      'A1',
      'USER_ENTERED',
      [values]
    );
  }

  async update(data) {
    const result = await this.sheets.batchUpdateValues(this.spreadsheetId, data);
  }

  async remove(rows) {
    const result = await this.sheets.batchDelete(this.spreadsheetId, rows);
  }
};