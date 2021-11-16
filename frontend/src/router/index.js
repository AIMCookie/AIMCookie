import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import appLayout from '@/views/appLayout.vue'
import adminLayout from '@/views/adminLayout.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/app',
    name:'app',
    component: appLayout,
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component : ()=> import('@/components/dashboard.vue')
      },
      {
        path:'play',
        name:'play',
        component : ()=> import('@/components/play copy.vue')
      },
      {
        path:'community',
        name:'community',
        component : ()=> import('@/components/community.vue')
      },
      {
        path:'contact',
        name:'contact',
        component : ()=> import('@/components/contact.vue')
      }
    ]
  },
  {
    path:'/admin',
    name:'admin',
    component: adminLayout,
    children:[
      {
        path:'admin_memberManagement',
        name:'admin_memberManagement',
        component : ()=> import('@/components/admin_memberManagement.vue')
      },
      {
        path:'admin_community',
        name:'admin_community',
        component : ()=> import('@/components/admin_community.vue')
      },
      {
        path:'admin_qna',
        name:'admin_qna',
        component : ()=> import('@/components/admin_qna.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
