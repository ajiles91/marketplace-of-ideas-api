require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const ideasRouter = require('./ideas-router')
const errorHandler = require('./error-handler')
import express, { Request, Response } from 'express'


const app = express()
const port = process.env.PORT || 8080

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(ideasRouter)
app.use(errorHandler)


app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})
module.exports = app