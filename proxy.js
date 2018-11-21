const LOCAL_URI = 'http://192.168.9.154:8089';
const REMOTE_URI = 'http://47.98.48.130:8083';

module.exports = {
    '/api': {
        target: REMOTE_URI,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    },
    '/wx': {
        target: REMOTE_URI,
        changeOrigin: true,
    }
};