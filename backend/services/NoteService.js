import Note from '../schemas/Note.js'

class NoteService {
  async postRecord(note) {
    const createdNote = await Note.create(note)
    return createdNote
  }

  async getNotes() {
    const notes = await Note.find()
    return notes
  }

  async getNote(id) {
    if (!id) {
      throw new Error('Missed id')
    }
    const note = await Note.findById(id)
    return note
  }

  async updateNote(note) {
    if (!note._id ) {
      throw new Error('Missed id')
    }
    const updatedNote = await Note.findByIdAndUpdate(note._id, note, { new: true })
    return updatedNote
  }

  async deleteNote(id) {
    if (!id) {
      throw new Error('Missed id')
    }
    const deletedNote = await Note.findByIdAndDelete(id)
    return deletedNote
  }
}

export default new NoteService()