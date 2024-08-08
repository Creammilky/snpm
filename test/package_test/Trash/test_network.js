async function test() {
    console.log('test');
    let srequire = require('srequire').srequire;
    var network = await srequire('network');
    let get_ip = network.get_private_ip;
    /*let ip = await get_ip(function (err, ip) {
        console.log(err || ip); // err may be 'No active network interface found'.
    })*/
    await network.get_private_ip(function (err, ip) {
        console.log(err || ip); // err may be 'No active network interface found'.
        console.log('aaaaaa');
    });
    console.log('done');
}
test();