/*
let rpc = require('./remote_func').RPC;

rpc(8080, '@zerodep/string-padleft', 'stringPadLeft', ['abc', 10], print_res);

function print_res(res) {
    console.log("I got the result @send.js, is " + res);
}
    */
async function do_it() {
    let rpc = require('../server/remote_func').RPC;
    res = await rpc('@zerodep/string-padleft', 'stringPadLeft', ['abc', 10]);
    console.log("I got the result @send.js, is " + res);
}
do_it();