<template>
  <login />
</template>

<script>
import Login from '../components/Login'

export default {
  name: 'login-page',
  components: {
    Login
  },
  beforeRouteEnter: (to, from, next) => {
    const accessToken = window.localStorage.getItem('token')
    if (accessToken) {
      return next('/')
    }
    next()
  }
}
</script>
