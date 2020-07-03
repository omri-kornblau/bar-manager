const { createProxyMiddleware  } = require('http-proxy-middleware');
const createProxy = (app, urls) => {
  urls.forEach(url => {
    app.use(
      url,
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  });
}
module.exports = function(app) {
  createProxy(app, [
    "/client",
    "/auth",
    "/provider",
  ])
};
