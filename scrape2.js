const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');
const WritableStream = fs.createWriteStream('data.csv');
WritableStream.write(`Name,address,phoneno,bloodgroup,email \n`);
for (var i = 1; i <= 112; i++) {
    request(`https://www.hamrodoctor.com/blood_donors/index/page:${i}`, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const siteHeading = $("#tg-content .tg-servicelocation>.bloodcard");
            // console.log(siteHeading.text());
            siteHeading.each((i, el) => {
                // console.log(el.text());
                const name = $(el);
                const doneName = $(el).find('.tg-directposthead>h3>a').text().replace(/\s\s+/g, "");
                const address = $(el).find('.tg-subjects').text().replace(/\s\s+/g, "");
                var phoneno = $(el).find('.bloodcard  div:nth-child(4) a').attr("href").replace(/\s\s+/g, "");
                phoneno = phoneno.replace("tel:", ""); //phone no
                var bloodgroup = $(el).find(".bloodcard > .tg-directpost> figure img").attr("alt").replace(/\s\s+/g, "");
                var email = $(el).find(".bloodcard  div:nth-child(3) a").attr("href").replace(/\s\s+/g, "");
                WritableStream.write(`${doneName},${address},${phoneno},${bloodgroup},${email} \n`)
                /* data = {
                    name: doneName,
                    address: address,
                    phoneno:phoneno,
                    bloodgroup:bloodgroup,
                    email:email,
                }
                datainArray.push(data)
                var dataInString = JSON.stringify(datainArray);
                console.log(dataInString);
                WritableStream.write(dataInString); */
            })
        }
    })

}
