import NoteService from '../services/NoteService.js'

class NoteController {
  async postRecord(req, res) {
    try {
      const note = await NoteService.postRecord(req.body)
      return res.status(200).json({ message: 'Запись сохранена', note })
    } catch(e) {
      res.status(500).json(e)
    }
  }

  async getNotes(req, res) {
    try {
      const notes = await NoteService.getNotes()
      return res.status(200).json(notes)
    } catch(e) {
      res.status(500).json(e)
    }
  }

  async getNote(req, res) {
    try {
      const note = await NoteService.getNote(req.params.id)
      return res.status(200).json(note)
    } catch(e) {
      res.status(500).json(e)
    }
  }

  async updateNote(req, res) {
    try {
      const updatedNote = await NoteService.updateNote(req.body)
      return res.status(200).json(updatedNote)
    } catch(e) {
      res.status(500).json(e)
    }
  }

  async deleteNote(req, res) {
    try {
      const note = await NoteService.deleteNote(req.params.id)
      return res.status(200).json(note)
    } catch(e) {
      res.status(500).json(e)
    }
  }
}

export default new NoteController()