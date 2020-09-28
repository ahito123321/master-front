const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use('/api', createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true
        }));
        app.use('/static/icons', createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true
        }));
        app.use('/static/images', createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true
        }));
    }
};