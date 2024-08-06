const http = require('http');
var serialize = require('serialize-javascript');

function deserialize(serializedJavascript) {
  return eval('(' + serializedJavascript + ')');
}
let flag = false;
var result;
function RPC(port_id, module_name, method_name, args, callback) {
  /*return new Promise((resolve, reject) => {
    let str = serialize({
      ModuleName: module_name,
      MethodName: method_name,
      ArgNum: args.length,
      Args: args
    });*/
  str = serialize({
    ModuleName: module_name,
    MethodName: method_name,
    ArgNum: args.length,
    Args: args
  });
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
      console.log(`Response: ${chunk}`);
      data += chunk;
    });
    res.on('end', () => {
      var result;
      console.log("End of Response");
      try {
        let obj = deserialize(data);
        if (obj['type'] == 'string') {
          result = obj['value'];
        }
        else result = eval(obj['value']);
        callback(result);
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
  //return result;
}

/*async function sync_rpc(port_id, module_name, method_name, args) {
  res = await RPC(port_id, module_name, method_name, args);
  console.log("I got the result, is " + res);
  return res;
}*/
/*
function rpc(port_id, module_name, method_name, args, cb) {
  var res;
  RPC(port_id, module_name, method_name, args)
    .then(result => {
      cb(result);
    })
    .catch(error => {
      console.error("An error occurred: ", error);
    });
  return res;
}
*/
module.exports = {
  RPC: RPC
}
// 发送请求体
/*req.write(str);
req.end();*/