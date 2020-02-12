const axios = require('axios');
const fs = require('fs');
module.exports = class ScrapingService {
    static async scraping(req,res){
        try {
            const {url} = req.body;
            const isInvalid = ScrapingService.isValidUrl(url);
            if(!isInvalid) return res.json({error:"URL_INVALID"});


            const source = await ScrapingService.getHTML(url)


            return res.json({data:source});
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

    static async getHTML(url){
       const body = await  axios.get(url);

       const matchUrlRegex = new RegExp('^.+?[^\\/:](?=[?\\/]|$)','gm');
       const baseUrl = url.match(matchUrlRegex);

        let html = body.data;


        html = ScrapingService.convertToTrueUrl(html,baseUrl[0]);


       const listScript = ScrapingService.getListSrc(html);


       html = ScrapingService.removeScriptHasSrc(html);

       return {html:html,scripts:listScript};
    }

    static convertToTrueUrl(html,url){
        html = html.replace(new RegExp('(src="\/)','g'),`src="${url}/`);
        html = html.replace(new RegExp('(href="\/)','g'),`href="${url}/`);
        return html
    }

    static getListSrc(html){
        const scriptRegex = new RegExp(/<script.*?src="(.*?)"/,'g');
        let listScript = html.match(scriptRegex);

        listScript = listScript.map(script => {
            script = script.replace(new RegExp('<script.*?src="','g'),'');
            script = script.replace('"','');
            return script;
        })
        return listScript;
    }

    static removeScriptHasSrc(html){
        const removeRegex = new RegExp(/(<script).+(src=").+(<\/script>)/,'g');
        html = html.replace(removeRegex,'');
        return html;
    }
}