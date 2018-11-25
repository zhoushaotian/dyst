const LOCAL_URI = 'http://192.168.9.154:8089';
const REMOTE_URI = 'http://cp.sjpjd.com:8083';
const HOST_URI = 'http://dl.sjpjd.com';

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
    },
    '/client/1': {
        target: REMOTE_URI,
        changeOrigin: true,
    }
};