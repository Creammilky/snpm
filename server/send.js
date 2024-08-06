let rpc = require('./remote_func').RPC;

rpc(8080, '@zerodep/string-padleft', 'stringPadLeft', ['abc', 10], print_res);

function print_res(res) {
    console.log("I got the result @send.js, is " + res);
}