const LOCAL_URI = 'http://192.168.9.154:8089';
const REMOTE_URI = 'http://cp.sjpjd.com:8083';
const HOST_URI = 'http://8dnhqz.natappfree.cc';

module.exports = {
    '/api': {
        target: HOST_URI,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    },
    '/wx': {
        target: HOST_URI,
        changeOrigin: true,
    },
    '/client/1': {
        target: HOST_URI,
        changeOrigin: true,
    }
};