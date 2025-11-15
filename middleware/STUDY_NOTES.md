# Express Middleware - Study Notes

## What is Middleware?
Functions that execute **during the request-response cycle**, before the final route handler. They have access to `req`, `res`, and `next()`.

## Key Concepts

### 1. Execution Order
- Middleware executes in the **order it's defined**
- Top to bottom in your code
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### 2. The `next()` Function
- **Must call `next()`** to pass control to the next middleware/route
- Without `next()`: request hangs (client waits forever)
- If `res.send()` is called: request-response cycle ends (no need for `next()`)

### 3. Request Object Persistence
- Custom properties added to `req` persist through the entire request lifecycle
- Example: `req.papai = 'value'` in middleware is accessible in route handlers
- **Important**: Each HTTP request creates a NEW `req` object

### 4. Types of Middleware

#### Application-level Middleware
```javascript
app.use((req, res, next) => {
    // Runs for EVERY request
    next()
})
```

#### Router-level Middleware
```javascript
router.use((req, res, next) => {
    // Runs only for routes in this router
    next()
})
```

#### Built-in Middleware
```javascript
app.use(express.static('public'))  // Serve static files
app.use(express.json())            // Parse JSON bodies
```

#### Route-specific Middleware
```javascript
app.use('/birds', birdsRouter)  // Only for /birds/* routes
```

## Common Use Cases
1. **Logging**: Track requests (method, timestamp, headers)
2. **Authentication**: Verify user before accessing routes
3. **Request modification**: Add custom properties to `req`
4. **Error handling**: Catch and handle errors
5. **Parsing**: Body parsing, cookie parsing

## Critical Rules
1. Order matters - define middleware before routes that need it
2. Always call `next()` unless sending a response
3. Each request gets a fresh `req` and `res` object
4. Modifications to `req` don't persist across different HTTP requests
5. Use `router.use()` for router-specific middleware, not `app.use()`

## Execution Flow Example
```
GET /about request arrives
    ↓
express.static middleware (checks public folder)
    ↓
/birds router middleware (skipped - path doesn't match)
    ↓
Middleware 1: req.papai = 'papai'
    ↓
Middleware 2: req.papai = 'papai changed'
    ↓
/about route handler: sends response with req.papai
    ↓
Response sent to client
```
