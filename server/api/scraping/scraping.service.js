const axios = require('axios');

class ScrapingService {
    async scraping(req,res){
        try {
            const {url} = req.body;
            const isInvalid = this.isValidUrl(url);
            if(!isInvalid) return res.json({error:"URL_INVALID"});


            const source = await this.getHTML(url)


            return res.json({data:source});
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


    async getHTML(url){
       const body = await  axios.get(url);

       const matchUrlRegex = new RegExp('^.+?[^\\/:](?=[?\\/]|$)','gm');
       const baseUrl = url.match(matchUrlRegex);

        let html = body.data;


        html = this.convertToTrueUrl(html,baseUrl[0]);


       const listScript = this.getListSrc(html);


       html = this.removeScriptHasSrc(html);

       return {html:html,scripts:listScript};
    }


    convertToTrueUrl(html,url){
        html = html.replace(new RegExp('(src="\/)','g'),`src="${url}/`);
        html = html.replace(new RegExp('(href="\/)','g'),`href="${url}/`);
        return html
    }


    getListSrc(html){
        const scriptRegex = new RegExp(/<script.*?src="(.*?)"/,'g');
        let listScript = html.match(scriptRegex);

        listScript = listScript.map(script => {
            script = script.replace(new RegExp('<script.*?src="','g'),'');
            script = script.replace('"','');
            return script;
        })
        return listScript;
    }


    removeScriptHasSrc(html){
        const removeRegex = new RegExp(/(<script).+(src=").+(<\/script>)/,'g');
        html = html.replace(removeRegex,'');
        return html;
    }
}

module.exports = new ScrapingService();