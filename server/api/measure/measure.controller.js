const {Router} = require('express');
const measureService = require('./measure.service');

module.exports = class MeasureController {
    static initialize(){
        const router = Router();

        this.routes(router)

        return router;
    }

    static routes(router){
        router.post('/measure',measureService.analyze)
    }
}