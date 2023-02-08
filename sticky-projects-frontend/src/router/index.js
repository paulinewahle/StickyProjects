import { createRouter, createWebHistory } from 'vue-router'
import entrancePointView from '../views/entrancePointView.vue'
import accountSignUpView from '../views/accountSignUpView.vue'
import accountSignInView from '../views/accountSignInView.vue'
import projectOwnView from '../views/projectOwnView.vue'
import projectCreateView from '../views/projectCreateView.vue'
import accountOwnView from '../views/accountOwnView.vue'
import projectUpdateView from '../views/projectUpdateView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: entrancePointView
    },
    {
      path: '/account-signup',
      component: accountSignUpView
    },
    {
      path: '/account-signin',
      component: accountSignInView
    },
    {
      path: '/my-projects',
      component: projectOwnView
    },
    {
      path: '/new-project',
      component: projectCreateView
    },
    {
      path: '/my-account',
      component: accountOwnView
    },
    {
      path: '/update-project/:id',
      component: projectUpdateView
    },

    
  ]
})

export default router
