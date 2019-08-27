<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            mini-variant
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
            color="white"

    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar
        flat
        style="font-size: 1.8em"
        >
        🍫
      </v-toolbar>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        px-5
      >
        <v-row
          align="center"
          justify="center"
        >
        <DataTable></DataTable>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  import DataTable from './components/DataTable.vue'

  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: false,
    }),

    created () {
      this.$vuetify.theme.dark = false
    },

    components: {
      DataTable
    }
  }
</script>
