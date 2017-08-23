import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/Welcome'
import LoginPage from '@/pages/LoginPage'
import ChatPage from '@/pages/ChatPage'
import LayoutPage from '@/pages/LayoutPage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: LayoutPage,
      children: [{
        path: 'chat',
        name: 'Chat',
        component: ChatPage
      }, {
        path: '',
        name: 'Welcome',
        component: Welcome
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
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
//     console.log('accessToken======', accessToken)
//     if (accessToken) {
//       next()
//     } else {
//       next({ name: 'Login' })
//     }
//   }
// })

export default router
