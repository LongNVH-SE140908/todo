const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:6862';

const context = [
    "/weatherforecast",
    "/api/todo"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req, res) => {

                proxyReq.setHeader("accept-encoding", "identity");

            },
            proxyRes: (proxyRes, req, res) => {
                /* handle proxyRes */
            },
            error: (err, req, res) => {
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Something went wrong. And we are reporting a custom error message.');
            },
        },

        headers: {
            accept: "application/json",
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};
