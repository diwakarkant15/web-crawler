const {crawler} = require('./crawl');

async function main(){
     const baseURL = process.argv[2];
    if(process.argv.length < 3){
        console.log("no websites provided");
        process.exit(1);
    }
    else if(process.argv.length > 3){
        console.log("too many args");
        process.exit(1);
    }else {
    console.log(`Starting crawl of ${baseURL}`)
    }
    const pages = await crawler(baseURL, baseURL, {});
    for(const page of Object.entries(pages)){
        console.log(page);
        
    }
}

main();
