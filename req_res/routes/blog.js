// ============================================
// EXPRESS ROUTER, REQUEST & RESPONSE EXAMPLES
// ============================================

const express = require('express')

// ROUTER: Creates modular route handlers
// Instead of defining all routes in main.js, we can organize routes by feature
// This router is mounted in main.js with: app.use('/blog', router)
const router = express.Router()

// ROUTE 1: Basic GET route
// URL: /blog/ (because router is mounted at /blog in main.js)
// Response: Sends plain text back to client
router.get('/', (req, res) => {
  res.send('Birds home page') // res.send() - sends response (auto-detects content type)
})

// ROUTE 2: About page
// URL: /blog/about
// Response: Simple text response
router.get('/about', (req, res) => {
  res.send('About blog')
})

// ROUTE 3: Dynamic route with URL parameter
// URL: /blog/blogpost/my-first-post (slug = 'my-first-post')
// REQUEST (req): Contains all request data
//   - req.params.slug: Gets dynamic URL parameter
//   - req.query: Gets query strings (?key=value)
//   - req.body: Gets POST/PUT request body data
// RESPONSE (res): Methods to send data back
//   - res.send(): Send string/HTML/JSON
//   - res.json(): Send JSON response
//   - res.sendFile(): Send a file
//   - res.status(): Set HTTP status code
router.get('/blogpost/:slug', (req, res) => {
  res.send('fetch the blogpost for slug: ' + req.params.slug)
})

// Export router to use in main.js
module.exports = router
