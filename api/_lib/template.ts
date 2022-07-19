
import { readFileSync } from 'fs';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(image: string) {
    let background = 'rgba(0,0,0,.74)';
    let foreground = '#363636';

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

    .label {
        background: ${foreground};
        color: white;
        display:inline-block;
        font-family: 'Inter', sans-serif;
        font-size: 50px;
        font-style: normal;
        padding: 12px 24px;
        border-radius: 12px;
        position: fixed;
    }

    .logo {
        display: inline-block;
        position: fixed;
        left: 60px;
        bottom: 60px;
        padding: 5px;
        text-align: center;
    }

    .logo img {
        display:block;
        margin: 0 -65px 0 0;
    }

    .label.price {
        right: 60px;
        bottom: 60px;
    }
    
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    let { image, price } = parsedReq;

    let priceHtml = price && price !== 'undefined' ? '<div class="label price">'+price+'</div>' : '';
    
    if( image === 'undefined' ){
        image = 'https://kodadot.xyz/kodadot_card_root.png';
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
               <div class="logo">
                    <img src="https://raw.githubusercontent.com/kodadot/kodadot-presskit/main/v3/KODA_v3_white.png" height=80 />
               </div>
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
