var network = require('network');
let res = network.get_private_ip(function (err, ip) {
    console.log(err || ip); // err may be 'No active network interface found'.
})
console.log("Is" + res);