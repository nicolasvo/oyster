<template>
  <v-data-table
    :headers="headers"
    :items="words"
    class="elevation-1"
    mobile-breakpoint=100
    v-bind="{ 'items-per-page': isMobile, 'dense': isDense }"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Words</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Word</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <template v-for="language in languages">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedWord[language]" :label="language"></v-text-field>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import axios from 'axios'

  const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  export default {
    data: () => ({
      dialog: false,
      words: [],
      languages: [],
      headers: [],
      editedIndex: -1,
      editedWord: {},
      defaultItem: {},
    }),

    created() {
      if (localStorage.getItem('languages')) {
        this.languages = JSON.parse(localStorage.getItem('languages'))
        for (const language of this.languages) {
          this.headers.push({'text': language, 'value': language})
          this.editedWord[language] = ''
          this.defaultItem[language] = ''
        }
      }
      if (localStorage.getItem('words')) {
        this.words = JSON.parse(localStorage.getItem('words'))
      }

      api.get('/languages').then(result => {
        this.languages = result.data.data
        api.get('/').then(result => {
          this.words = result.data.data
          this.headers = []
          for (const language of this.languages) {
            this.headers.push({'text': language, 'value': language})
            this.editedWord[language] = ''
            this.defaultItem[language] = ''
          }
          this.headers.push({text: '', value: 'action', sortable: false, align: 'right'})
        })
      })
    },

    mounted() {
      if (localStorage.getItem('words')) {
        this.words = JSON.parse(localStorage.getItem('words'))
      }
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Word' : 'Edit Word'
      },
      isMobile() {
        const isMobile = window.matchMedia("only screen and (max-width: 500px)")
        return (isMobile.matches) ? -1 : 20
      },
      isDense() {
        const isMobile = window.matchMedia("only screen and (max-width: 500px)")
        return (!isMobile.matches)
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      words: {
        deep: true,
        handler() {
          localStorage.setItem('words', JSON.stringify(this.words))
        }
      },
      languages: {
        deep: true,
        handler() {
          localStorage.setItem('languages', JSON.stringify(this.languages))
        }
      }
    },

    methods: {
      editItem(item) {
        this.editedIndex = this.words.indexOf(item)
        this.editedWord = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.words.indexOf(item)
        confirm('Are you sure you want to delete this item?') && api.post('/remove', {
          rows: [index + 2],
        }).then(
          () => console.log('Row removed!')
        ) && this.words.splice(index, 1)
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedWord = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.words[this.editedIndex], this.editedWord)
          api.post('/update', {
            data: [{
              row: this.editedIndex + 2,
              values: Object.values(this.editedWord)
            }]
          }).then(
            () => console.log('Word updated!')
          )
        } else {
          const isEmpty = Object.values(this.editedWord).every(x => (x === null || x === ''))
          if (!isEmpty) {
            let from_lang
            let word
            let counter = 0
            for (const key of Object.keys(this.editedWord)) {
              if (this.editedWord[key] !== '') {
                from_lang = key
                word = this.editedWord[key]
                counter++
              }
            }
            if (counter === 1) {
              api.post('/append', {
                word: word,
                from_lang: from_lang
              }).then(
                () => {
                  console.log('Word appended!')
                  setTimeout(() => {
                    api.get('/').then(result => {
                      this.words = result.data.data
                    })
                  }, 500)
                }
              )
            } else {
              api.post('/update', {
                data: [{
                  row: this.words.length + 2,
                  values: Object.values(this.editedWord)
                }]
              }).then(
                () => console.log('Word updated!')
              )
              this.words.push(this.editedWord)
            }
          }
        }
        this.close()
      },
    },
  }
</script>
