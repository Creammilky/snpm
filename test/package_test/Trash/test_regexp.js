async function test() {
    let srequire = require('srequire').srequire;
    let reg = await srequire('path-to-regexp');
    //let pathToRegexp = reg.pathToRegexp;
    //const regexp = await pathToRegexp("/foo/:bar");
    //console.log(regexp);
    /*let match = reg.match;
    const fn = await match("/user/:id");
    let res = fn("/user/123");;
    console.log(res);
    let parse = reg.parse;
    const data = await parse("/foo/:bar");
    console.log(data);
    let compile = reg.compile;
    const toPath = await compile("/user/:id");
    let path1 = toPath({ id: "name" }); //=> "/user/name"
    let path2 = toPath({ id: "café" });
    console.log(path1);
    console.log(path2);*/
}
test();