async function test() {
    let srequire = require('srequire').srequire;
    var isExtendable = await srequire('is-extendable');
    function f1() {
        console.log("Here");
    }
    console.log(await isExtendable(f1));
    let arr = [1, 2, 3];
    console.log(await isExtendable(arr));
}
test();