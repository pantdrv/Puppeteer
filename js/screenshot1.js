var selector = 'your selector (id or class)';
//var selector1 = 'input[class="report active"]'
const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1500, height: 1000 })
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

        await page.goto('page url', { waitUntil: 'networkidle0', timeout: 1150000 }); // wait until page load
        await page.type('#username', "superadmin");
        await page.type('#password', "abcd");
        //await page.setCacheEnabled(true);

        await Promise.all([
            //page.click("#loginForm > input[type = submit]: nth - child(7)"),
            await page.evaluate((selector) => document.querySelector(selector).click(), selector),
            page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 1500000 }),
            //page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 915000 }),

            //await page.waitFor(80000),
        ]);
        // click and wait for navigation
        // await page.addStyleTag({ url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' });

        // await page.addStyleTag({ url: 'https://truopssit83.sdgc.com/TruOps/resources/layoutcss/truops.css' });
        //await page.addStyleTag({ url: 'https://truopssit83.sdgc.com/TruOps/resources/layoutcss/bootstrap.css' });

        //page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 1150000 }),


    ]);
await page.waitFor(10000);
const localStorageData = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        json[key] = localStorage.getItem(key);
    }
    return json;
});

console.log(localStorageData)


await page.evaluate(() => {
        let dom = document.getElementById("report-page");
        console.log(dom);
        dom.style.display = 'block';
    })
    //await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }), ])
const element = await page.$(".report");
const text = await page.evaluate(element => element.textContent, element);
// await text.click();
await element.click();
console.log(text);
const found = await page.evaluate(() => window.find("Truops"));
console.log(found);



const nodeChildren = await page.$eval('.savedReport', (uiElement) => {
    return uiElement.children;
});
console.log(nodeChildren);
const ch = await page.evaluate(() => {
    let d = document.getElementsByClassName("savedReport")[0];
    return d.children;


})
console.log(ch)




//await page.click('.dropdown__field');
//await page.click('.dropdown__list > div:nth-child(8)');
//await page.waitForSelector('.dropdown reportList open');
//await page.select('.dropdown reportList open', 'Cerner');
//await page.click('.dropdown-menu savedReport');


await page.evaluate(() => {
    let d = document.getElementsByClassName("topheader")[0];
    d.style.display = 'none'
});

await page.screenshot({
    path: "./screenshot.png",
    type: "jpeg",
    fullPage: true
});
//await page.addStyleTag({ url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' });

// await page.addStyleTag({ url: 'https://truopssit83.sdgc.com/TruOps/resources/layoutcss/truops.css' });
// await page.addStyleTag({ url: 'https://truopssit83.sdgc.com/TruOps/resources/layoutcss/bootstrap.css' });


//await page.addStyleTag({ content: '.tlyPageGuideWelcome{opacity: .0}' })
//await page.addStyleTag({ content: '.body{background: red}' })

//page.addStyleTag({ 'content': '@page {size: auto}' })
// await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 100000 }),


await page.pdf({
    path: "./demo1.pdf",
    format: "A4",
    printBackground: true,
    PreferCSSPageSize: true,
    width: '6.8cm',
    margin: {

        left: "0cm"
    }
});
}
catch (err) {
    console.log(err.message)
} finally {
    await page.close();
    await browser.close();
}
}

main()