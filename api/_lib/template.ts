
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(image: string) {
    let background = 'rgba(0,0,0,.74)';
    let foreground = '#d32e79';

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: url(${image});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .kodadot-logo {
        position: fixed;
        top: 40px;
        right: 60px;
        width: 128px;
        height: 128px;
        object-fit: contain;
        z-index: 2;
    }

    .price {
        background: ${foreground};
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 50px;
        font-style: normal;
        padding: 15px 20px;
        border-radius: 10px;
        position: fixed;
        left: 60px;
        bottom: 215px;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: 80px;
        font-style: normal;
        color: white;
        line-height: 1.8;
        background: rgba(0,0,0,.6);
        text-align: center;
        padding: 15px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    let { text, image, price } = parsedReq;

    let priceHtml = price && price !== 'undefined' ? '<div class="price">'+price+'</div>' : '';
    
    if( image === 'undefined' ){
        image = 'https://nft.kodadot.xyz/kodadot_carbonless.jpg';
    }

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss( image )}
    </style>
    <body>
        <div>
            <div class="imageWrapper">    
               ${ priceHtml }
               <div class="heading">${emojify(sanitizeHtml(text))}</div>
               <img class="kodadot-logo" src="data:image/png;base64,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" />
            </div>
        </div>
    </body>
</html>`;
}

// function getImage(src: string) {
//     return `<img
//         class="image"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//     />`
// }
