const {Router} = require('express');
const measureController = require('./measure/measure.controller');
const scrapingController = require('./scraping/scraping.controller');

module.exports = class Routes {
    static initialize(){
        const router = Router();

        this.routes(router);

        return router;
    }

    static routes(router){
        router.use('/measure',measureController.initialize())
        router.use('/scraping',scrapingController.initialize())
    }
}