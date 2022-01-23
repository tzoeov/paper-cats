const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8083;

process.on('SIGINT', () => process.exit(1));

cors_proxy
    .createServer({
        originWhitelist: []
    })
    .listen(port, host, function () {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
