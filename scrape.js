const request = require("request");
const cheerio = require("cheerio");
request("https://www.hamrodoctor.com/blood_donors/index/page:2",(error,response,html)=>{
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        const siteHeading = $(".tg-directposthead > h3 > a");
        // console.log(siteHeading.text());
        siteHeading.each((i,el)=>{
            const item = $(el).text();
            const link = $(el).attr("href");
            console.log(link);
        })
    }
})
 