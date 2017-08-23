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
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
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
      <v-toolbar-title>Messenger Client</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', path: '/' },
        { title: 'Messages', icon: 'message', path: '/chat' },
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
