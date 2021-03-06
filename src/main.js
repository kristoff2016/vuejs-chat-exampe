// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
