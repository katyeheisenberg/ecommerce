import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'

import config from './config'
import { getProductsFunc, sortProductsList, getRates } from './common'
import mongooseService from './services/mongoose'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

server.get('/api/v1/products', async (req, res) => {
  const arrayOfProducts = await getProductsFunc()
  res.json(arrayOfProducts.slice(0,50))
})

server.get('/api/v1/currency', async (req, res) => {
  const currency = await getRates()
  res.json(currency)
})

let logs = []

server.get('/api/v1/logs', (req, res) => {
  res.json(logs)
})

server.post('/api/v1/logs', (req, res) => {
  logs.push(req.body)
  res.json(logs)
})

server.post('/api/v1/sort', async (req, res) => {
  const arrayOfProducts = await getProductsFunc()
  const { sortType, direction } = req.body
  const sortedProductsArray = sortProductsList(arrayOfProducts, sortType, direction)
  res.json(sortedProductsArray.slice(0,50))
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  // eslint-disable-next-line
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)
// eslint-disable-next-line
console.log(`Serving at http://localhost:${PORT}`)
