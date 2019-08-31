<template>
  <v-data-table
    dense
    :headers="headers"
    :items="words"
    class="elevation-1"
    mobile-breakpoint=100
    v-bind="{ 'items-per-page': isMobile }"
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

    created () {
      if (localStorage.getItem('words')) {
        this.words = JSON.parse(localStorage.getItem('words'))
      }
      if (localStorage.getItem('languages')) {
        this.languages = JSON.parse(localStorage.getItem('languages'))
      }
      api.get('/').then(result => {
        this.words = result.data.data
      })

      this.headers = []
      for (const language of Object.keys(this.words[0])) {
        this.headers.push({'text': language, 'value': language})
        this.editedWord[language] = ''
        this.defaultItem[language] = ''
      }
      this.headers.push({ text: ' ', value: 'action', sortable: false, align: 'right' })

      api.get('/languages').then(result => this.languages = result.data.data)
    },

    mounted () {
      if (localStorage.getItem('words')) {
        this.words = JSON.parse(localStorage.getItem('words'))
      }
      api.get('/').then(result => this.words = result.data.data)
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1   ? 'New Word' : 'Edit Word'
      },
      isMobile() {
        const isMobile = window.matchMedia("only screen and (max-width: 500px)")
        return (isMobile.matches) ? -1 : 20
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
      words: {
        deep: true,
        handler() {
          localStorage.setItem('languages', JSON.stringify(this.languages))
          localStorage.setItem('words', JSON.stringify(this.words))
        }
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.words.indexOf(item)
        this.editedWord = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.words.indexOf(item)
        this.words.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedWord = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.words[this.editedIndex], this.editedWord)
        } else {
          this.words.push(this.editedWord)
        }
        this.close()
      },
    },
  }
</script>
