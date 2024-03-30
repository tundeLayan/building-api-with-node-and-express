// creating a basic server with just node, no express
// const http = require('http');

// const server = http.createServer((req, res) => {
//   if(req.method === 'GET' && req.url === '/'){
//     res.end();
//   }
// })

// server.listen(3001, ()=>{
//   console.log('server on http://localhost:3001')
// })

import * as dotenv from 'dotenv';
dotenv.config()

import config from './config'

const app = require('./server')
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`hello on port ${PORT}`)
})