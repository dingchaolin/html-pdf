const pdf = require('html-pdf');
const fs = require("fs")
const dirname = Date.now() + '.pdf';
const options = {
    format: 'A4',
    orientation: 'portrait',
    paginationOffset: 1,
    "header": {
        "height": "45mm",
        "contents": `<div style="border-bottom: 1px solid #000000">你好</div>`
    },
    footer: {
        "height": "28mm",
        "contents": {
            first: '',
            default: `<div style="width:100%;text-align:center;"><span style="color: #444;">{{page}}</span></div><div style="color: #808080">你好</div>`
        }
    },
    "zoomFactor": "1",
    "type": "pdf",
    "phantomPath": "./node_modules/phantomjs/bin/phantomjs", // PhantomJS binary which should get downloaded automatically
    "phantomArgs": [], // array of strings used as phantomjs args e.g. ["--ignore-ssl-errors=yes"]
    //"script": '/', // Absolute path to a custom phantomjs script, use the file in lib/scripts as example
    "timeout": 30000,
};

let createPdf = function (htmlPath, options) {
    return new Promise((resolve, reject) => {
        var html = fs.readFileSync(htmlPath, 'utf8')
        pdf.create(html, options).toFile('./' + dirname, (err, res) => {
            if (res) {
                resolve(dirname);
            }
            if( err ){
                console.log(err)
            }
        })
    });
};




function test( htmlPath, options ){
    createPdf(htmlPath, options).then((ret)=>{
        console.log( ret )
    })
}

test("./test.html", options)