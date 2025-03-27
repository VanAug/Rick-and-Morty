const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Fix CORS middleware placement
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://vanaug.github.io/Rick-and-Morty')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

// Use /api prefix for routes
server.use('/api', router)

server.listen(process.env.PORT || 10000, () => {
    console.log('JSON Server is running')
})
