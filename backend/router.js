import Router from 'express'
import NoteController from './controllers/NoteController.js'

const router = new Router()

router.get('/notes', NoteController.getNotes)
router.get('/notes/:id', NoteController.getNote)

router.post('/notes', NoteController.postNote)

router.put('/notes/:id', NoteController.updateNote)
router.delete('/notes/:id', NoteController.deleteNote)

export default router