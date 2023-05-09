import { createRouter, createWebHistory } from 'vue-router'
import EditNotePage from '@/pages/EditNotePage.vue'
import NotesPage from '@/pages/NotesPage.vue'
import StatsPage from '@/pages/StatsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NotesPage
    },
    {
      path: '/edit-note/:id',
      name: 'edit-note',
      component: EditNotePage
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsPage
    }
  ]
})

export default router
