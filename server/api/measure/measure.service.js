const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');

class MeasureService {
    async analyze(req,res){
        try {
            console.log(req.body,req.method)
            const {url} = req.body;

            const isInvalid = this.isValidUrl(url);
            if(!isInvalid) return res.json({error:"URL_INVALID"});


            const lhr = await this.SEOCheck(url)


            return res.json({data:lhr.lhr});
        } catch (e) {
            console.log(e);
            return res.json({error: true})
        }
    }
    isValidUrl(url){
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(url);
    }

    async SEOCheck(url){
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

module.exports = new MeasureService();