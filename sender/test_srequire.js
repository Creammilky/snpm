async function test() {
    console.log('test');
    let srequire = require('./srequire').srequire;
    //console.log('here');
    let PadPackage = await srequire('@zerodep/string-padleft');
    let PadLeft = PadPackage.stringPadLeft;
    let res = await PadLeft('abc', 10);
    console.log(res);
}
test();