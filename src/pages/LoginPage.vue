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
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
      return next('/')
    }
    next()
  }
}
</script>
