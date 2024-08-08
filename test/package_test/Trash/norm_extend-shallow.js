var extend = require('extend-shallow');
let serialize = require('serialize-javascript');
console.log(serialize(extend));
var obj = {};
let obj1 = extend(obj, { a: 'b' }, { c: 'd' });
console.log(obj1);
