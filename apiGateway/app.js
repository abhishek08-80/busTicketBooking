const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')


const app = express();
//defines routes and their ports
const routes = {
    '/customer': 'http://localhost:3001',
    '/employee': 'http://localhost:3002',
    '/bus': 'http://localhost:3003'
}

//create a proxy for each route
for(const route in routes){
    const target = routes[route];
    app.use(route,createProxyMiddleware({target}))
}

const PORT = 8000;
app.listen(PORT, () => console.log("API GATEWAY STARTED"))