
<template>
    <v-card>
      <v-toolbar class="white--text pink" dark>
        <v-toolbar-title>Contacts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>check_circle</v-icon>
          </v-btn>
      </v-toolbar>
      <v-list two-line>
        <li>
          <div class="list__tile__title text-center no-contact-list" v-if="contacts.length === 0"> There is no contact. </div>
        </li>
        <template v-for="(contact, i) in contacts">
          <v-list-tile :key="contact.id">
            <v-list-tile-avatar>
              <img v-bind:src="contact.imageUrl"></v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ contact.firstName + ' ' + contact.lastName }}</v-list-tile-title>
              <v-list-tile-sub-title> <span class='grey--text text--darken-2'> {{ contact.content }} </span> </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i + 1 !== contact.length" :key="contact.id" inset></v-divider>
        </template>
      </v-list>
    </v-card>
</template>

<script>
import * as API from '../api'
export default {
  name: 'chat-list',
  beforeRouteEnter: (to, from, next) => {
    const accessToken = window.localStorage.getItem('token')
    if (!accessToken) {
      return next('/login')
    }
    next()
  },
  async created () {
    this.token = JSON.parse(window.localStorage.getItem('token'))
    await this.getContact()
  },
  data () {
    return {
      token: null,
      items: [
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" }
      ],
      contacts: []
    }
  },
  methods: {
    async getContact () {
      const response = await API.getContacts(this.token)
      this.contacts = response
      console.log('response===', response)
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.no-contact-list {
  margin: 10px;
}
</style>