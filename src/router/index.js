import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlteracaoComponent from '@/components/AlteracaoComponent.vue'
import CadastroComponent from '@/components/CadastroComponent.vue'



const routes = [
  {
    path: '/',
    redirect: { path: "/cadastro" },
    component: HomeView,
    children:[
      {
        path:'alteracao/:id',
        name:'alteracao',
        component: AlteracaoComponent
      },
      {
        path:'cadastro',
        name:'cadastro',
        component: CadastroComponent
      }
    ]
  },
 

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
