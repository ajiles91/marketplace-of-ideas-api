require('dotenv').config()
const express = require('express');
const morgan = require('morgan')

const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const ideasRouter = require('./ideas-router')
const errorHandler = require('./error-handler')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(ideasRouter)
app.use(errorHandler)

app.get('/api', (req, res) => {
  res.send('hello from app.js')
})

app.get('/', (req, res) => {
  res.send('Hello, world from Vercel!')
})
module.exports = app