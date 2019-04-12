import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import Price from '../demo/Price.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/price',
      name: 'price',
      component: Price 
    }
  ]
})