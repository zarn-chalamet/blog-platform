import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import CreateBlog from '@/views/CreateBlog.vue'
import BlogView from '@/views/BlogView.vue'
import ProfileVue from '@/views/ProfileVue.vue'
import EditBlog from '@/views/EditBlog.vue'

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
    },
    {
      path: '/blogs/:id',
      name: 'single-blog',
      component: BlogView,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileVue
    },
    {
      path: '/edit/:id',
      name: 'edit-blog',
      component: EditBlog,
      props: true
    }
  ]
})

export default router
