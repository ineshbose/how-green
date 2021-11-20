import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Visualisation from '../components/Visualisation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/visualisation',
      name: 'visualisation',
      component: Visualisation
    }
  ]
})
