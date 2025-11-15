// ============================================
// EXPRESS SERVER - REQUEST, RESPONSE & ROUTING
// ============================================

// Import Express framework
const express = require('express');
// import express from 'express' // ES6 module syntax (alternative)

// Import blog router from routes folder
const blog = require('./routes/blog')

// Initialize Express app
const app = express()
const port = 3000

// ============================================
// MIDDLEWARE
// ============================================
// Middleware runs before route handlers, processes requests

// STATIC FILES: Serves files from 'public' folder
// Example: public/mypage.html accessible at http://localhost:3000/mypage.html
app.use(express.static('public'))

// ROUTER MIDDLEWARE: Mount blog router at /blog path
// All routes in blog.js will be prefixed with /blog
// Example: blog.js route '/' becomes '/blog/'
app.use('/blog', blog)

// ============================================
// HTTP METHODS - CRUD Operations
// ============================================
// GET: Read data
// POST: Create data
// PUT: Update data
// DELETE: Delete data

// CHAINED ROUTING: Multiple methods on same path
// GET request to root path '/'
app.get('/', (req, res) => {
  res.send('<h1>Hello get request helloworld!</h1>') // Send HTML response
  console.log('hey its a get request'); // Server-side log
})
// POST request to root path '/'
.post('/', (req, res) => {
  console.log('hey its a post request');
  res.send('<h1>Hello post request sending back to the client from server!</h1>')
})
// PUT request to '/myput'
.put('/myput', (req, res) => {
  console.log('hey its a put request');
  res.send('<h1>Hello its an put request!</h1>')
})
// DELETE request to '/del'
.delete('/del', (req, res) => {
  console.log('hey its a delete request');
  res.send('<h1>Hello its a delete request!</h1>')
})

// ============================================
// SENDING FILES
// ============================================
// res.sendFile() - Sends HTML file as response
// __dirname - Current directory path
// root option - Base directory for relative paths
app.get('/index', (req, res) => {
  console.log('hello index');
  res.sendFile('templates/index.html', { root: __dirname })
})

// ============================================
// JSON API RESPONSE
// ============================================
// res.json() - Sends JSON response (auto sets Content-Type: application/json)
app.get('/api', (req, res) => {
  res.json({ name: 'John', age: 30, city: 'New York', name: ['firstname', 'sushobhan'] })
})

// ============================================
// START SERVER
// ============================================
// Listen on specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
