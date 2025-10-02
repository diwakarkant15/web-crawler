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

module.exports = {normalizeURL, getHTML_URL};