async function test() {
    let srequire = require('srequire').srequire;
    var mime = await srequire('mime-types');
    let t1 = await mime.lookup('txt');                    // ⇨ 'text/plain'
    console.log(t1);
}
test();