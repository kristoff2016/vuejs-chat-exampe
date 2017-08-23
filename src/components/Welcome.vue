<template>
  <div class="welcome">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcome to Messenger'
    }
  },
  beforeRouteEnter: (to, from, next) => {
    const accessToken = window.localStorage.getItem('token')

    if (!accessToken) {
      return next('/login')
    }

    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
