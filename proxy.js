module.exports = {
    '/api': {
        target: 'http://47.98.48.130:8083',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    },
    '/wx': {
        target: 'http://47.98.48.130:8083',
        changeOrigin: true,
    }
};