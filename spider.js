const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const WritableStream = fs.createWriteStream("data.csv");
WritableStream.write(`Name,address,phoneno,bloodgroup \n`);
for (var i = 1; i <= 117; i++) {
  request(
    `https://www.hamrodoctor.com/blood_donors/index/page:${i}`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const siteHeading = $("#tg-content .tg-servicelocation>.bloodcard");
        siteHeading.each((i, el) => {
          const donerName = $(el)
            .find(".tg-directposthead>h3>a")
            .text()
            .replace(/\s\s+/g, "");
          const address = $(el)
            .find(".tg-subjects")
            .text()
            .replace(/\s\s+/g, "");
          let phoneNo = $(el)
            .find(".bloodcard  div:nth-child(4) a")
            .attr("href")
            .replace(/\s\s+/g, "");
          phoneNo = phoneNo.replace("tel:", ""); //phone no
          const bloodGroup = $(el)
            .find(".bloodcard > .tg-directpost> figure img")
            .attr("alt")
            .replace(/\s\s+/g, "");
          WritableStream.write(
            `${donerName},${address},${phoneNo},${bloodGroup} \n`
          );
        });
      }
    }
  );
}
