import Vue from 'vue'
import VueRouter from 'vue-router'
import products from '@/views/v-products-archive'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'products',
    component: products,
    alias: '/home'
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/v-products-cart')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/v-products-order')
  },
  {
    path: '/finally',
    name: 'finally',
    component: () => import('@/views/v-products-finally')
  },
  {
    path: '/', redirect: { name: 'products'}
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/v-products-404-page')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
