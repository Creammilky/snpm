const http = require('http');
var serialize = require('serialize-javascript');

function deserialize(serializedJavascript) {
  return eval('(' + serializedJavascript + ')');
}
const sneder_path = process.env.SNPM_ROOT + '/sender';
const fs = require('fs');
let jsonstring = fs.readFileSync(sneder_path + '/package-snpm.json', 'utf8');
let package_snpm = JSON.parse(jsonstring);

let flag = false;
var result;
function RPC(port_id, module_name, method_name, args) {
  return new Promise((resolve, reject) => {
    let str = serialize({
      ModuleName: module_name,
      MethodName: method_name,
      ArgNum: args.length,
      Args: args
    });
    /*str = serialize({
      ModuleName: module_name,
      MethodName: method_name,
      ArgNum: args.length,
      Args: args
    });*/
    const options = {
      hostname: 'localhost',
      port: port_id,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // 根据服务器期望的Content-Type设置
      },
    };
    const req = http.request(options, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        /*let obj = deserialize(chunk);
        if (obj['type'] == 'string') {
          result = obj['value'];
        }
        else result = eval(obj['value']);*/
        //console.log(`Response: ${chunk}`);
        data += chunk;
      });
      res.on('end', () => {
        var result;
        console.log("End of Response");
        try {
          let obj = deserialize(data);
          if (obj['type'] == 'string') {
            resolve(obj['value']);
          }
          else resolve(eval(obj['value']));
          //callback(result);
        } catch (e) {
          console.error(`Response with error: ${e.message}`);
        }
      });
    });
    req.on('error', (e) => {
      console.error(`Request with error: ${e.message}`);
    });
    // 发送请求体
    req.write(str);
    req.end();
  });
  //return result;
}

async function sync_rpc(module_name, method_name, args) {
  /*const fs = require('fs');
  let jsonstring = fs.readFileSync('./package-snpm.json', 'utf8');
  let package_snpm = JSON.parse(jsonstring);*/
  var port_id = 0;
  for (key in package_snpm) {
    if (key == module_name) {
      port_id = package_snpm[key];
      console.log('The port id is ' + port_id);
    }
    else if (module_name == '' && method_name == 'require' && key == args[0]) {
      port_id = package_snpm[key];
      console.log('The port id is ' + port_id);
    }
  }
  if (port_id == 0) {
    console.log('No Container can provide the service');
    return null;
  }
  res = await RPC(port_id, module_name, method_name, args);
  //console.log("I got the result, is " + res);
  return res;
}
module.exports = {
  RPC: sync_rpc
}
// 发送请求体
/*req.write(str);
req.end();*/