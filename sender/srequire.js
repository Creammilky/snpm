async function srequire(module_name) {
    const fs = require('fs');
    const sneder_path = process.env.SNPM_ROOT + '/sender';
    let jsonstring = fs.readFileSync(sneder_path + '/package-snpm.json', 'utf8');
    let package_snpm = JSON.parse(jsonstring);
    var port_id = 0;
    for (key in package_snpm) {
        if (key == module_name) {
            port_id = package_snpm[key];
        }
    }
    let rpc = require('./remote_func').RPC;
    res = await rpc('', 'require', [module_name]);
    console.log('res is ' + res);
    if (typeof res == 'function') {
        let sfunc = (...args) => rpc(module_name, '', args);
        //console.log('error!!!!!');
        //return res;
        return sfunc;
    }
    else if (typeof res == 'object') {
        let smod = Object.entries(res).reduce((acc, [key, value]) => {
            if (typeof value === "function") {
                acc[key] = (...args) => rpc(module_name, key, args);
            }
            else {
                acc[key] = value;
            }
            return acc;
        }, {});
        return smod;
    }
    else {
        console.log('Error in srequire');
        return null;
    }
}
module.exports = {
    srequire: srequire
}