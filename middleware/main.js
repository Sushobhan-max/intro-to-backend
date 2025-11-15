const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const birds = require('./routes/blog')

// Built-in middleware: serves static files from 'public' folder
app.use(express.static('public'))

// Router-level middleware: all routes starting with '/birds' use this router
app.use('/birds', birds)

// Application-level middleware 1
// Executes for EVERY request before reaching route handlers
// Order matters: this runs first because it's defined first
app.use((req, res, next) => {
    console.log('m1')
    
    // If res.send() is called here, request-response cycle ends (no next() needed)
    // Uncommenting below would block all requests
    // res.send('Blocked by middleware 1')
    
    console.log('====================================');
    // req.headers contains all HTTP headers sent by client
    console.log(req.headers);
    
    // Custom properties can be added to req object
    // These properties persist through the request lifecycle (middleware chain + route handler)
    req.papai = 'papai'
    
    console.log('====================================');
    // Logging request to file: useful for tracking API usage
    fs.appendFileSync('logs.txt', `${new Date().toLocaleString()} ${req.method}\n`)
    
    console.log('====================================');
    console.log(new Date().toLocaleString(), req.method);
    console.log('====================================');
    
    // next() passes control to the next middleware/route handler
    // Without next(), request hangs (client waits indefinitely)
    next()
})

// Application-level middleware 2
// Executes after middleware 1 but before route handlers
app.use((req, res, next) => {
    console.log('m2')
    
    // Modifying req.papai set by previous middleware
    // Demonstrates how middleware can modify req object sequentially
    req.papai = 'papai changed'
    
    next()
})

// Route handler for '/'
// req.papai will be 'papai changed' (from middleware 2)
app.get('/', (req, res) => {
    // res.send() ends the request-response cycle
    res.send('Hello World!' + ' ' + req.papai)
})

// Route handler for '/about'
// Each HTTP request creates a NEW req object
// So req.papai goes through middleware chain again: 'papai' -> 'papai changed'
app.get('/about', (req, res) => {
    res.send('Hello World!' + ' ' + req.papai)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
