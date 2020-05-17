const LOGIN_CONTROLLER=require('../controller/login.controller')

module.exports=(app)=>{
    app.post('/register', LOGIN_CONTROLLER.create);
    app.get('/login',LOGIN_CONTROLLER.findOne);
    // app.get('/details',LOGIN_CONTROLLER.getDetails)
    app.post('find/token',LOGIN_CONTROLLER.findToken)
}