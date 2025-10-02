const {crawler} = require('./crawl');

function main(){
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
    crawler(baseURL);
}

main();
