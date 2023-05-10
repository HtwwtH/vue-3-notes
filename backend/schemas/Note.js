import mongoose from 'mongoose'

const Note = new mongoose.Schema({
  // id: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true }
})

export default mongoose.model('Note', Note)