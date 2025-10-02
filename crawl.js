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

function getHTML_URL(htmlBody, baseURL) {
    let urls = [];
    const dom = new JSDOM(htmlBody);
    const urlLinks = dom.window.document.querySelectorAll('a');

    for (const urlLink of urlLinks) {
        const href = urlLink.getAttribute("href");
        if (!href) continue; // skip empty or malformed links

        try {
            const objURL = new URL(href, baseURL); // resolves both absolute and relative
            urls.push(objURL.href);
        } catch (e) {
            console.log(`Error parsing URL: ${e.message} -> ${href}`);
        }
    }
    return urls;
}


async function crawler(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling ${baseURL}`);

    try{    
    const resp = await fetch(currentURL);
    if(resp.status > 399) {
        console.log(`Error in fetching with status : ${resp.status} on ${currentURL}`);
        return pages;
    }
    const contentType = resp.headers.get('content-type');
    if(!contentType.includes('text/html')){
         console.log(`response is non-html`);
         return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getHTML_URL(htmlBody, currentURL);

    for(const nextURL of nextURLs){
        pages = await crawler(baseURL, nextURL, pages);
    }

   // console.log(await resp.text());
    }catch(e){
        console.log(`Error in fetching : ${e.message} on ${currentURL}`);
        
    }

    return pages;
}

module.exports = {normalizeURL, getHTML_URL, crawler};