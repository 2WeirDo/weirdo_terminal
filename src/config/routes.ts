import { type RouteRecordRaw } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import NotFound from '../views/NotFound.vue'
const routes: RouteRecordRaw[] = [{ path: '/', component: IndexPage }, {
    path: '/:pathMatch(.*)*', 
    component: NotFound
}]

export default routes
