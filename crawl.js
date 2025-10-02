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

module.exports = {normalizeURL}