import { createRouter, createWebHistory } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
// import NotFound from '../views/NotFound.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: IndexPage },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: NotFound
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
