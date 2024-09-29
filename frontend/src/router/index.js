import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import CreateBlog from '@/views/CreateBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      beforeEnter(to, from, next) {
        const token = localStorage.getItem('token')
        if (!token) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter(to, from, next) {
        const token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          next({ name: 'welcome' })
        }
      }
    },
    {
      path: '/create-blog',
      name: 'create-blog',
      component: CreateBlog
    }
  ]
})

export default router
