<template>
  <v-app id="layout" toolbar>
    <!-- Drawer -->
    <v-navigation-drawer temporary v-model="drawer" :mini-variant="mini" overflow absolute>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon light>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="profile.imageUrl" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ profile.firstName +' '+ profile.lastName}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <router-link tag="v-list-tile" :to="item.path" v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Messenger</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>
<script>
import io from '../../node_modules/socket.io-client/dist/socket.io.js'
export default {
  name: 'layout',
  beforeRouteEnter: (to, from, next) => {
    const accessToken = window.localStorage.getItem('token')
    if (!accessToken) {
      return next('/login')
    }
    next()
  },
  created () {
    this.profile = JSON.parse(window.localStorage.getItem('profile'))
    this.token = JSON.parse(window.localStorage.getItem('token'))
    // var socket = io('http://localhost:5000', {
    //   query: { auth: this.token },
    //   transports: ['websocket']
    // })
    // socket.on('connect', function () {
    //   console.log('connected')
    // })
    // socket.on('disconnect', function () {
    //   console.log('disconnected')
    // })
    // socket.on('error', function (data) {
    //   console.log(data || 'error')
    // })
    // socket.on('connect_failed', function (data) {
    //   console.log(data || 'connect_failed')
    // })
  },
  data () {
    return {
      token: null,
      profile: null,
      drawer: null,
      items: [
        { title: 'Logout', icon: 'fa-sign-out', path: '/login' }
      ],
      mini: false,
      right: null
    }
  }
}

</script>

<style>

</style>
