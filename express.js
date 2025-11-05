// const express = require('express')
import express from 'express'
const app = express()
const port = 3000

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.get('/contact', (req, res) => {
  res.send('Contact Page')
})

app.get('/blog', (req, res) => {
  res.send('Blog Page')
})
//slug with single value
app.get('/blog/:slug', (req, res) => {
  // console.log(res);
  console.log(req.params);
  console.log(req.query);
  // console for url http://127.0.0.1:3000/blog/intro-to-padosi?mode=dark&region=in this logs 
// [Object: null prototype] { slug: 'intro-to-padosi' }
// [Object: null prototype] { mode: 'dark', region: 'in' }
  res.send(`hello ${req.params.slug}`)
  
})
//slug with multiple values
app.get('/blog/:slug/:second', (req, res) => {
  res.send(`hello ${req.params.slug} and ${req.params.second}`)
})

// app.get('/blog/intro-to-express', (req, res) => {
//     //logic to get blog data from database
//   res.send('Intro to Express')
// })
// app.get('/blog/intro-to-python', (req, res) => {
//     //logic to get blog data from database
//   res.send('Intro to Python')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


