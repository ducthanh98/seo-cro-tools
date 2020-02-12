const {Router} = require('express');
const scrapingService = require('./scraping.service');

module.exports = class ScrapingController {
    static initialize(){
        const router = Router();

        this.routes(router)

        return router;
    }

    static routes(router){
        router.post('/',scrapingService.scraping)
    }
}