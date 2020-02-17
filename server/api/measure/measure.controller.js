const {Router} = require('express');
const measureService = require('./measure.service');

class MeasureController {
    initialize(){
        const router = Router();

        this.routes(router)

        return router;
    }

    routes(router){
        router.post('/',measureService.analyze)
    }
}
module.exports = new MeasureController();