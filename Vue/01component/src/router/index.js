import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '../views/Course'
import UseMyForm from '../views/UseMyForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/course',
    name: 'course',
    component: Course
  },  
  {
    path: '/popup',
    name: 'Popup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Popup.vue')
  },
  {
    path: '/useMyForm',
    name: 'UseMyForm',
    component: UseMyForm,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
