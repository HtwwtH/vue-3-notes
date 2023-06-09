import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router.js'

const PORT = 4000
const DB_URL = 'mongodb+srv://admin:123@cluster0.kzcxnke.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log(`Server started on port ${ PORT }`);
    })
  } catch(e) {
    console.error(e)
  }
}

startApp()