<template>
  <v-list two-line>
    <template v-for="(item, i) in items">
      <v-list-tile v-bind:key="item.title">
        <v-list-tile-avatar>
          <img v-bind:src="item.avatar"></v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="i + 1 !== items.length" :key="item.title" inset></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'chat-list',
  data () {
    return {
      items: [
        { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" }
      ]
    }
  }
}
</script>