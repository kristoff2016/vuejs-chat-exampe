import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import LoginPage from '@/pages/LoginPage'
import ChatPage from '@/pages/ChatPage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatPage
    },
    {
      path: '*',
      redirect: { name: 'Hello' }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login') {
//     const accessToken = window.localStorage.getItem('accessToken')
//     console.log('accessToken', accessToken)
//     if (accessToken) {
//       next()
//     } else {
//       next({ name: 'Login' })
//     }
//   }
// })

export default router
