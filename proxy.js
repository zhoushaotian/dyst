const LOCAL_URI = 'http://192.168.9.154:8089';
const REMOTE_URI = 'http://txqjd.com';
const HOST_URI = 'http://8dnhqz.natappfree.cc';

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