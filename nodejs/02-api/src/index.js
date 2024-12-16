const http = require('http')
const routes = require('./routes')
const url = require('url')
const bodyParser = require('./helpers/bodyParser')


const server = http.createServer((request, response) => {
    const parsedURL = url.parse(request.url, true)
    console.log(`Request method: ${request.method} | Endpoint: ${parsedURL.pathname}`)

    let { pathname } = parsedURL
    let id = null

    const splitEndpoint = pathname.split('/').filter(Boolean)

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1]
    }

    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method == request.method
    ))

    if (route) {
        request.query = parsedURL.query
        request.params = { id }

        response.send = (statusCode, body) => {
            response.writeHead(statusCode, { 'Content-type': 'application/json' })
            response.end(JSON.stringify(body))
        }

        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            bodyParser(request, () => route.handler(request, response))
        } else {
            route.handler(request, response)
        }

    } else {
        response.writeHead(404, { 'content-type': 'text/html' })
        response.end(`Cannot ${request.method} ${pathname} `)
    }
})

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'))