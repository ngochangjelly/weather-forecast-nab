const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  console.log(createProxyMiddleware)
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.metaweather.com/api',
      changeOrigin: true,
    })
  )
}