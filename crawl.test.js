const {normalizeURL, getHTML_URL} =  require("./crawl");
//const {test, expect} = require("jest");

test('normalizeURL strip protocols(http&https)', ()=>{
    const input = 'https://boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'boot.dev/path';
    expect(expected).toEqual(actual);
})

test('normalizeURL with trailing slashes stripped off', ()=>{
    const input = 'https://boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'boot.dev/path';
    expect(expected).toEqual(actual);
})

test('normalizeURL strip capital letters', ()=>{
    const input = 'https://BOOT.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'boot.dev/path';
    expect(expected).toEqual(actual);
})

test('normalizeURL strip http', ()=>{
    const input = 'http://boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'boot.dev/path';
    expect(expected).toEqual(actual);
})

test('htmlURL selector Absolute', ()=>{ 
    const actualInputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/">Boot.dev blog</a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev';
    const actual = getHTML_URL(actualInputHTMLBody, baseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(expected).toEqual(actual);
})

test('htmlURL selector relative', ()=>{ 
    const actualInputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">Boot.dev blog</a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev';
    const actual = getHTML_URL(actualInputHTMLBody, baseURL);
    const expected = ["https://blog.boot.dev/path1/"];
    expect(expected).toEqual(actual);
})

test('htmlURL selector both absolute and relative', ()=>{ 
    const actualInputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">Boot.dev blog</a>
                <a href="https://blog.boot.dev/path2/">Boot.dev blog</a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev';
    const actual = getHTML_URL(actualInputHTMLBody, baseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    expect(expected).toEqual(actual);
})

test('htmlURL selector invalid urls', ()=>{ 
    const actualInputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Invalid Url</a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev';
    const actual = getHTML_URL(actualInputHTMLBody, baseURL);
    const expected = [];
    expect(expected).toEqual(actual);
})