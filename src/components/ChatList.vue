<template>
  <v-card>
    <v-toolbar class="white--text pink" dark>
      <v-toolbar-title>Contacts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click.native.stop="dialog = !dialog">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <li>
        <div class="list__tile__title text-center no-contact-list" v-if="contacts.length === 0"> There is no contact. </div>
      </li>
      <template v-for="(contact, i) in contacts">
        <v-list-tile :key="contact.id">
          <v-list-tile-avatar>
            <img v-bind:src="contact.profile" v-bind:alt="contact.title"></v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ contact.title }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <span class='grey--text text--darken-2'>
                <strong>{{ contact.user.screenName }}: </strong> {{ contact.content }} </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="i + 1 !== contact.length" :key="contact.id" inset></v-divider>
      </template>
    </v-list>
    <v-dialog v-model="dialog" scrollable>
      <!-- create chat title -->
      <v-card v-if="!next">
        <v-card-title>Create New Chat</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="create-chat">
          <v-list two-line class="ul-create-chat">
            <img v-bind:src="profileUrl" class="profileUrl" @click="onUpload" />
            <v-progress-circular indeterminate v-if="loadingImg" class="purple--text image-loading"></v-progress-circular>
            <form id="form-private-chat">
              <input id="upload-image" ref="upload-image" name="files" type="file" @change="uploadImage($event.target.name, $event.target.files)" accept="image/*">
            </form>
            <v-text-field name="chatTitle" label="Chat title" v-model="chatTitle" single-line class="chat-title"></v-text-field>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" @click="createChat" flat>Next</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ! create chat title -->
      <v-card v-if="next">
        <v-card-title>Select Contacts</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="select-contacts">
          <v-list two-line subheader>
            <v-subheader>
              <v-text-field class="chat-search" v-on:keyup="getSearch" name="search" label="Search" v-model="search" single-line></v-text-field>
            </v-subheader>
            <v-list-tile avatar v-for="contact in contactsSearch" v-bind:key="contact.id">
              <v-list-tile-action class="tile-action">
                <v-checkbox v-model="selectedContact" v-bind:value="contact.id"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-avatar>
                <img v-bind:src="contact.imageUrl" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title> {{ contact.screenName }} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="blue--text darken-1" flat @click="back">Back</v-btn>
          <v-btn class="blue--text darken-1" @click="invites" flat @click.native="dialog = true">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      search: null,
      chatTitle: null,
      loadingImg: false,
      next: false,
      profileUrl: 'static/image/defualt.png',
      contacts: [],
      contactsSearch: [],
      selectedContact: []
    }
  },
  methods: {
    async getContact () {
      const response = await API.getContacts(this.token)
      this.contacts = response.data
    },
    async createChat () {
      this.next = true
    },
    async invites () {
      const response = await API.createChat(this.token, this.chatTitle, this.profileUrl, this.selectedContact)
      console.log('response===', response)
    },
    async onUpload () {
      this.$refs['upload-image'].click()
    },
    async uploadImage (name, files) {
      this.loadingImg = true
      const form = new FormData()
      Array
        .from(Array(files.length).keys())
        .map(x => {
          form.append('file', files[x], files[x].name)
        })
      try {
        const response = await API.uploadImg(form)
        this.profileUrl = response.url
        this.loadingImg = false
      } catch (e) {
        this.loadingImg = false
        console.log(e.response)
      }
    },
    async getSearch () {
      console.log('typing======')
      const response = await API.getSearch(this.token, this.search)
      console.log('response===', response)
      this.contactsSearch = response.data
    },
    async back () {
      this.next = false
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.ul-create-chat {
  position: relative;
}

.no-contact-list {
  margin: 10px;
}

.select-contacts {
  margin: 0;
  height: 300px;
  padding: 0;
}

.create-chat {
  margin: 0;
  height: 110px;
  padding: 0;
}

.tile-action {
  min-width: 35px;
}

.subheader {
  padding: 5px;
  margin-top: 5px;
  margin-bottom: -10px;
}

.chat-search {
  width: 100%;
}

.image-loading {
  height: 32px;
  width: 32px;
  left: 28px;
  position: absolute;
  top: 26px;
}

.profileUrl {
  width: 70px;
  height: 70px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 9px;
}

.chat-title {
  position: absolute;
  top: 7px;
  width: 64%;
  right: 18px;
}

#upload-image {
  display: none;
}
</style>