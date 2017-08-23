<template>
  <div>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card dark xs4 class="primary">
          <chat-list></chat-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ChatList from '../components/ChatList'

export default {
  name: 'chat',
  components: {
    ChatList
  }
}
</script>
