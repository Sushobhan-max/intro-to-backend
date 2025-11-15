# EXPRESS.JS - REQUEST, RESPONSE & ROUTING

## 1. EXPRESS SETUP & INITIALIZATION

### Point 1.1: Install Express
```bash
npm init -y
npm install express
```

### Point 1.2: Create Basic Server
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Point 1.3: Run Server
```bash
node main.js
```
- Access: `http://localhost:3000`

---

## 2. MIDDLEWARE

### Point 2.1: What is Middleware?
- Functions that execute BEFORE route handlers
- Process requests/responses
- Execute in order defined
- Can modify req/res objects

### Point 2.2: Static Files Middleware
```javascript
app.use(express.static('public'));
```
- Serves files from `public` folder directly
- No route handler needed
- Example: `public/mypage.html` → `http://localhost:3000/mypage.html`

**File Structure:**
```
public/
  └── mypage.html
```

**Access:** `http://localhost:3000/mypage.html`

### Point 2.3: Router Middleware
```javascript
const blog = require('./routes/blog');
app.use('/blog', blog);
```
- Mounts router at specific path prefix
- All routes in router get `/blog` prefix
- Organizes routes by feature

**Example:**
```javascript
// In routes/blog.js
router.get('/', (req, res) => {
  res.send('Blog home');
});

// Accessed as: http://localhost:3000/blog/
```

### Point 2.4: Body Parser Middleware
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
- Parses incoming request body
- Needed for POST/PUT requests with data
- Makes `req.body` available

---

## 3. HTTP METHODS (CRUD)

### Point 3.1: GET - Read Data
```javascript
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});
```
- Retrieve data from server
- No body in request
- Cacheable
- Safe (doesn't modify data)

### Point 3.2: POST - Create Data
```javascript
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});
```
- Send data to server
- Data in request body
- Not cacheable
- Creates new resource

### Point 3.3: PUT - Update Data
```javascript
app.put('/myput', (req, res) => {
  res.send('Data updated');
});
```
- Update existing data
- Data in request body
- Replaces entire resource
- Idempotent (same result multiple times)

### Point 3.4: DELETE - Remove Data
```javascript
app.delete('/del', (req, res) => {
  res.send('Data deleted');
});
```
- Remove data from server
- No body needed
- Idempotent
- Removes resource

### Point 3.5: Chained Routing
```javascript
app.get('/', (req, res) => {
  res.send('GET');
})
.post('/', (req, res) => {
  res.send('POST');
})
.put('/myput', (req, res) => {
  res.send('PUT');
})
.delete('/del', (req, res) => {
  res.send('DELETE');
});
```
- Multiple methods on same/different paths
- Cleaner syntax
- Methods chained with `.`

---

## 4. REQUEST OBJECT (req)

### Point 4.1: URL Parameters
```javascript
app.get('/blogpost/:slug', (req, res) => {
  console.log(req.params.slug);
  res.send('Post: ' + req.params.slug);
});
```
- Access: `http://localhost:3000/blogpost/my-first-post`
- `req.params.slug` = `'my-first-post'`
- Dynamic parts of URL

### Point 4.2: Query Strings
```javascript
app.get('/search', (req, res) => {
  console.log(req.query.q);
  res.send('Search: ' + req.query.q);
});
```
- Access: `http://localhost:3000/search?q=express`
- `req.query.q` = `'express'`
- Key-value pairs after `?`

### Point 4.3: Request Body
```javascript
app.post('/user', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.email);
  res.send('User created');
});
```
- Data sent in POST/PUT requests
- Needs body parser middleware
- `req.body` = parsed data object

### Point 4.4: Request Headers
```javascript
app.get('/', (req, res) => {
  console.log(req.headers);
  console.log(req.headers['user-agent']);
  res.send('OK');
});
```
- HTTP headers from client
- `req.headers` = all headers object
- Common: `user-agent`, `content-type`, `authorization`

### Point 4.5: Request Method
```javascript
app.all('/test', (req, res) => {
  console.log(req.method);  // 'GET', 'POST', 'PUT', 'DELETE'
  res.send(req.method);
});
```
- `req.method` = HTTP method used
- `app.all()` = handles all methods

### Point 4.6: Request URL
```javascript
app.get('*', (req, res) => {
  console.log(req.url);     // Full URL path
  console.log(req.path);    // URL without query
  res.send('OK');
});
```
- `req.url` = full URL with query
- `req.path` = URL path only

---

## 5. RESPONSE OBJECT (res)

### Point 5.1: res.send() - Send Text/HTML
```javascript
app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});
```
- Sends string or HTML
- Auto-detects content type
- Can only call once per request
- Ends response automatically

### Point 5.2: res.json() - Send JSON
```javascript
app.get('/api', (req, res) => {
  res.json({ name: 'John', age: 30 });
});
```
- Sends JSON response
- Sets `Content-Type: application/json`
- Converts object to JSON string
- Ends response automatically

### Point 5.3: res.sendFile() - Send File
```javascript
app.get('/index', (req, res) => {
  res.sendFile('templates/index.html', { root: __dirname });
});
```
- Sends file from server
- `root` = base directory
- `__dirname` = current directory path
- Ends response automatically

### Point 5.4: res.status() - Set Status Code
```javascript
app.get('/notfound', (req, res) => {
  res.status(404).send('Not Found');
});

app.post('/user', (req, res) => {
  res.status(201).json({ id: 1, name: 'John' });
});
```
- Sets HTTP status code
- Common codes:
  - `200` = OK
  - `201` = Created
  - `400` = Bad Request
  - `404` = Not Found
  - `500` = Server Error

### Point 5.5: res.redirect() - Redirect
```javascript
app.get('/old', (req, res) => {
  res.redirect('/new');
});
```
- Redirects to another URL
- Browser makes new request
- Default status: 302 (temporary)

### Point 5.6: res.set() - Set Headers
```javascript
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello');
});
```
- Sets response headers
- Must call before `send()`

---

## 6. EXPRESS ROUTER

### Point 6.1: Create Router File
**File: routes/blog.js**
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Blog home');
});

router.get('/about', (req, res) => {
  res.send('About blog');
});

module.exports = router;
```

### Point 6.2: Use Router in Main File
**File: main.js**
```javascript
const blog = require('./routes/blog');
app.use('/blog', blog);
```

### Point 6.3: Router Routes
- `/blog/` → Blog home
- `/blog/about` → About page
- Router prefix `/blog` added to all routes

### Point 6.4: Router with Parameters
```javascript
router.get('/blogpost/:slug', (req, res) => {
  res.send('Post: ' + req.params.slug);
});
```
- Access: `http://localhost:3000/blog/blogpost/my-post`
- `req.params.slug` = `'my-post'`

### Point 6.5: Benefits of Router
- Organize routes by feature
- Reusable route modules
- Cleaner main.js file
- Easy to maintain

---

## 7. SERVING FILES

### Point 7.1: Static Files (public folder)
```javascript
app.use(express.static('public'));
```

**File Structure:**
```
public/
  └── mypage.html
```

**Access:** `http://localhost:3000/mypage.html`

**Characteristics:**
- No route handler needed
- Files served directly
- Automatic directory listing disabled
- Fast and efficient

### Point 7.2: Template Files (templates folder)
```javascript
app.get('/index', (req, res) => {
  res.sendFile('templates/index.html', { root: __dirname });
});
```

**File Structure:**
```
templates/
  └── index.html
```

**Access:** `http://localhost:3000/index`

**Characteristics:**
- Requires route handler
- Server-controlled
- Can add logic before sending
- Can pass data to template

### Point 7.3: Difference
| Static | Template |
|--------|----------|
| Direct access | Route handler needed |
| No server logic | Can add logic |
| Fast | Slightly slower |
| public/ folder | Any folder |

### Point 7.4: __dirname Issue
```javascript
// CommonJS - Works
const express = require('express');
res.sendFile('file.html', { root: __dirname });

// ES Modules - Doesn't work
import express from 'express';
// __dirname NOT available

// Solution 1: Use process.cwd()
res.sendFile('file.html', { root: process.cwd() });

// Solution 2: Define __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## 8. FETCH API (Client-Side)

### Point 8.1: GET Request
```javascript
fetch('/api')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

### Point 8.2: POST Request
```javascript
fetch('/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })
})
.then(res => res.text())
.then(data => console.log(data));
```

### Point 8.3: PUT Request
```javascript
fetch('/myput', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id: 1, name: 'Jane' })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Point 8.4: DELETE Request
```javascript
fetch('/del', {
  method: 'DELETE'
})
.then(res => res.text())
.then(data => console.log(data));
```

### Point 8.5: Async/Await Syntax
```javascript
async function makeRequest() {
  try {
    let response = await fetch('/', { method: 'POST' });
    let data = await response.text();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}

makeRequest();
```

### Point 8.6: Response Methods
```javascript
// Get as text
let text = await response.text();

// Get as JSON
let json = await response.json();

// Get as blob (binary)
let blob = await response.blob();

// Get status
console.log(response.status);      // 200, 404, etc.
console.log(response.statusText);  // 'OK', 'Not Found'
```

---

## 9. COMPLETE EXAMPLE

### Point 9.1: Server Code (main.js)
```javascript
const express = require('express');
const blog = require('./routes/blog');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/blog', blog);

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Data received' });
});

app.get('/api', (req, res) => {
  res.json({ name: 'John', age: 30 });
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
```

### Point 9.2: Router Code (routes/blog.js)
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Blog home');
});

router.get('/about', (req, res) => {
  res.send('About blog');
});

router.get('/post/:slug', (req, res) => {
  res.send('Post: ' + req.params.slug);
});

module.exports = router;
```

### Point 9.3: Client Code (public/mypage.html)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <h1>Testing HTTP Methods</h1>
  
  <script>
    async function testMethods() {
      // GET
      let res1 = await fetch('/api');
      let data1 = await res1.json();
      console.log('GET:', data1);
      
      // POST
      let res2 = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John' })
      });
      let data2 = await res2.json();
      console.log('POST:', data2);
    }
    
    testMethods();
  </script>
</body>
</html>
```

---

## 10. COMMON PATTERNS

### Point 10.1: Error Handling
```javascript
app.get('/user/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'ID required' });
  }
  res.json({ id: req.params.id });
});
```

### Point 10.2: Middleware for All Routes
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Pass to next middleware/route
});
```

### Point 10.3: Conditional Response
```javascript
app.get('/data', (req, res) => {
  if (req.query.format === 'json') {
    res.json({ data: 'value' });
  } else {
    res.send('<h1>Data</h1>');
  }
});
```

### Point 10.4: Multiple Parameters
```javascript
app.get('/user/:id/post/:postId', (req, res) => {
  res.json({
    userId: req.params.id,
    postId: req.params.postId
  });
});
```

---

## 11. IMPORTANT NOTES

### Point 11.1: Middleware Order
```javascript
// ✅ CORRECT
app.use(express.static('public'));  // First
app.use('/blog', blog);             // Then routers
app.get('/', ...);                  // Then routes

// ❌ WRONG - Routes override middleware
app.get('/', ...);
app.use(express.static('public'));
```

### Point 11.2: Can Only Send Response Once
```javascript
// ❌ ERROR
app.get('/', (req, res) => {
  res.send('First');
  res.send('Second');  // Error!
});

// ✅ CORRECT
app.get('/', (req, res) => {
  if (condition) {
    return res.send('First');
  }
  res.send('Second');
});
```

### Point 11.3: URL Parameters vs Query Strings
```javascript
// URL Parameter: /blog/post/123
app.get('/blog/post/:id', (req, res) => {
  req.params.id  // '123'
});

// Query String: /blog/post?id=123
app.get('/blog/post', (req, res) => {
  req.query.id  // '123'
});
```

### Point 11.4: Static Files Priority
```javascript
// Static files checked first
app.use(express.static('public'));

// If file not found, routes checked
app.get('/', (req, res) => {
  res.send('Home');
});
```

---

## 12. QUICK REFERENCE

### HTTP Methods
- **GET** - Read data
- **POST** - Create data
- **PUT** - Update data
- **DELETE** - Delete data

### Response Methods
- `res.send()` - Text/HTML
- `res.json()` - JSON
- `res.sendFile()` - File
- `res.status()` - Status code
- `res.redirect()` - Redirect

### Request Properties
- `req.params` - URL parameters
- `req.query` - Query strings
- `req.body` - Request body
- `req.method` - HTTP method
- `req.url` - Request URL
- `req.headers` - HTTP headers

### Middleware
- `app.use()` - Register middleware
- `express.static()` - Serve static files
- `express.json()` - Parse JSON body
- `express.urlencoded()` - Parse form data

---

## 13. SETUP CHECKLIST

- [ ] `npm init -y`
- [ ] `npm install express`
- [ ] Create `main.js`
- [ ] Create `routes/` folder
- [ ] Create `public/` folder
- [ ] Create `templates/` folder
- [ ] Create `.gitignore` with `node_modules/`
- [ ] Test server: `node main.js`
- [ ] Access: `http://localhost:3000`

---

**Last Updated:** 2024
**Topic:** Express.js Fundamentals
**Status:** Complete Reference Guide
