import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Product from '../components/Product.vue'
import Alternatives from '../components/Alternatives.vue'
import Visualisation from '../components/Visualisation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '*',
        redirect: { name: 'index' },
    },
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/product/:store/:id',
      name: 'product-page',
      component: Product,
    },
    {
      path: '/product/:store/:id/alternatives',
      name: 'product-alt',
      component: Alternatives,
    },
    {
      path: '/product/:store/:id/visualisation',
      name: 'product-vis',
      component: Visualisation,
    },
  ]
})
