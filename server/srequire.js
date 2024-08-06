async function srequire(port_id, module_name) {
    let rpc = require('./remote_func').RPC;
    res = await rpc(port_id, '', 'require', [module_name]);
    if (typeof res == 'function') {
        let sfunc = (...args) => rpc(port_id, module_name, '', args);
        //console.log('error!!!!!');
        //return res;
        return sfunc;
    }
    else if (typeof res == 'object') {
        let smod = Object.entries(res).reduce((acc, [key, value]) => {
            if (typeof value === "function") {
                acc[key] = (...args) => rpc(port_id, module_name, key, args);
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