const {Router} = require('express');
const measureController = require('./measure/measure.controller');

module.exports = class Routes {
    static initialize(){
        const router = Router();

        this.routes(router);

        return router;
    }

    static routes(router){
        router.use('/',measureController.initialize())
    }
}