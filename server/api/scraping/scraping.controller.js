const {Router} = require('express');
const scrapingService = require('./scraping.service');

class ScrapingController {
    initialize(){
        const router = Router();

        this.routes(router)

        return router;
    }

    routes(router){
        router.post('/',scrapingService.scraping())
    }
}

module.exports =  new ScrapingController();