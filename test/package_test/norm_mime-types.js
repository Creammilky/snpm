var mime = require('mime-types')
let t1 = mime.lookup('txt');                    // ⇨ 'text/plain'
console.log(t1);