async function test() {
    let srequire = require('srequire').srequire;
    var extend = await srequire('extend-shallow');
    var obj = {};
    let obj1 = await extend(obj, { a: 'b' }, { c: 'd' });
    console.log(obj1);

}
test();