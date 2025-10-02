const {JSDOM} = require('jsdom');

function normalizeURL(url){
    const normalizedURL = new URL(url);
   // console.log(`${normalizedURL.hostname} ${normalizedURL.pathname} ${normalizedURL.protocol}`);
    
    const hostPath = `${normalizedURL.hostname}${normalizedURL.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }

    if(hostPath.length > 0){
        hostPath.toLowerCase();
    }

    return hostPath;
}

function getHTML_URL(htmlBody, baseURL){
    let url = [];
    const dom = new JSDOM(htmlBody);
    const urlLinks = dom.window.document.querySelectorAll('a');
    for(const urlLink of urlLinks){
        const urls = urlLink.href;
        if(urls[0] === '/') {
            try{
            const objURL = new URL(`${baseURL}${urls}`);
            url.push(objURL.href);
            }catch(e){
                console.log(`Error : ${e.message}`);
            }
        }
        else{
            try{
                const objURL = new URL(urls);
                url.push(objURL.href);
            }catch(e){
                console.log(`Error : ${e.message}`);
                
            }
        }
        
    }
    return url;   
}

async function crawler(baseURL){
    try{
    console.log(`actively crawling ${baseURL}`);
    
    const resp = await fetch(baseURL);
    if(resp.status > 399) {
        console.log(`Error in fetching with status : ${resp.status} on ${baseURL}`);
        return;
    }
    const contentType = resp.headers.get('content-type');
    if(!contentType.includes('text/html')){
         console.log(`response is non-html`);
         return;
    }
   // console.log(await resp.text());
    }catch(e){
        console.log(`Error in fetching : ${e.message} on ${baseURL}`);
        
    }
}

module.exports = {normalizeURL, getHTML_URL, crawler};