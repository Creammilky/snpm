async function test() {
    let srequire = require('./srequire').srequire;
    let smod = await srequire(8080, 'serialize-javascript');
    console.log(smod);
    //console.log(smod.toString());
    let res = await smod([1, 2, 3, 10]);
    console.log(res);
    console.log(typeof res);
}
test();