const {normalizeURL} =  require("./crawl");
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
