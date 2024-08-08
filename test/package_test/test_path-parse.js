async function test() {
    let srequire = require('srequire').srequire;
    var pathParse = await srequire('path-parse');
    let path = await pathParse('/home/user/dir/file.txt');
    console.log(path);
}
test();