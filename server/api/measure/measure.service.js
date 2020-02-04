const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');

module.exports = class MeasureService {
    static async analyze(req,res){
        try {
            const {url} = req.body;

            const isInvalid = MeasureService.isValidUrl(url);
            if(!isInvalid) return res.json({error:"URL_INVALID"});


            const lhr = await MeasureService.SEOCheck(url)


            return res.json(lhr.lhr);
        } catch (e) {
            console.log(e);
            return res.json({error: true})
        }
    }
    static isValidUrl(url){
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(url);
    }

    static async SEOCheck(url){
        const opts = {
            chromeFlags: ['--headless'],
            logLevel: 'info',
            output: 'json',
        };

        // Launch chrome using chrome-launcher.
        const chrome = await chromeLauncher.launch(opts);
        opts.port = chrome.port;

        // Run Lighthouse.
        const lhr = await lighthouse(url, opts, null);
        await chrome.kill();
        return lhr;
    }
}