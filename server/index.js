import express from 'express'
import { initMongo } from './services/mongo.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import routes from './routes/index.js'

const PORT = 9000

const app = express()

initMongo()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.resolve('public')))
app.use('/api', routes)
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
app.use('/*', async function(error, req, res, next) {
  if(!res.statusCode || res.statusCode === 200) res.status(500)
  res.json({ error: (error.message || 'Unknown error') })
})

app.listen(PORT, '0.0.0.0', () => console.log(`Burning calories at port ${PORT}`))