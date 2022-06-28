const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    
    const usersController = require('../Controller/UsersController')
    
    app.route('/signIn').post(usersController.signIn);
    app.route('/signUp').post(usersController.signUp);
}