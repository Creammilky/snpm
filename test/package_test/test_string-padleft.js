async function test() {
    console.log('test');
    let srequire = require('srequire').srequire;
    let PadPackage = await srequire('@zerodep/string-padleft');
    let PadLeft = PadPackage.stringPadLeft;
    let res = await PadLeft('abc', 10);
    console.log(res);
    console.log("Done");
}
test();
