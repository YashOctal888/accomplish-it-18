
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ResumeBuilder from '../views/ResumeBuilder.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/resume-builder',
      name: 'ResumeBuilder',
      component: ResumeBuilder
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
