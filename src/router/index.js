import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '@/firebase/config'

//auth guard - require auth for chatroom
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('urequireAuth: ', user)
  if(!user) {
    next({name: 'Welcome'})
  }else {
    next()
  }
}

const requreNoAuth = ( to, from, next) => {
  let user = projectAuth.currentUser
  console.log('requireNoAuth: ',user)
  if(user) {
    next({name: 'Chatroom'})
  }else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import('../views/Welcome.vue'),
      beforeEnter: requreNoAuth
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: () => import('../views/Chatroom.vue'),
      beforeEnter: requireAuth
    },
    // 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ]
})

export default router
