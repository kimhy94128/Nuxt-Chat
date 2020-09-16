const express = require('express');
const app = express();

const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');

const nuxt = new Nuxt(config);
const builder = new Builder(nuxt)
builder.build();

app.use(nuxt.render);

const http = require('http');
const server = http.createServer(app);

const socket = require('socket.io')
const io = socket(server)

const port = 3000

server.listen(port, () => {
  console.log(`server on ${port} port`);
})

let memberInfoName = {};
let memberInfoId = {};
let groups = []

const chat = io.of('/chat').on('connection', (socket) => {
  socket.on('enter', (result) => {
    socket.emit('enter', true)
  })
  console.log('connection');
})
