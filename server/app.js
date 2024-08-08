const args = process.argv.slice(2);
let port_id = args[0];

const http = require('http');
var serialize = require('serialize-javascript');

function deserialize(serializedJavascript) {
    return eval('(' + serializedJavascript + ')');
}

var obj, result;

/*const options = {
    hostname: 'localhost',
    port: port_id,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain', // 根据服务器期望的Content-Type设置
    },
};
const res_req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`Response: ${chunk}`);
    });
});
res_req.on('error', (e) => {
    console.error(`Request with error: ${e.message}`);
});*/

const server = http.createServer((req, res) => {
    let body = ''; // 用于存储请求体的变量

    // 设置响应头，告知客户端我们接受text/plain类型的请求体
    res.setHeader('Content-Type', 'text/plain');

    // 监听数据事件，逐段接收请求体
    req.on('data', chunk => {
        body += chunk.toString(); // 将接收到的数据块转换为字符串并累加
    });

    // 监听结束事件，当请求体接收完毕时触发
    req.on('end', () => {
        console.log('Received Function Call:', body);
        // 根据需要处理body...
        obj = deserialize(body);

        //console.log("Type is " + typeof obj);
        //console.log("ModuleName is " + obj['ModuleName']);
        //console.log(body);
        let ModuleName = obj['ModuleName'];
        let MethodName = obj['MethodName'];
        let ArgNum = obj['ArgNum'];
        let Args = obj['Args'];
        if (ModuleName == '' && MethodName == 'require') {
            result = require(...Args);
        }
        else {
            var mod = require(ModuleName);
            if (typeof mod == 'function') {
                result = mod(...Args);
                //console.log(result);
            }
            else {
                result = mod[MethodName](...Args);
            }
        }
        // 发送响应
        res_obj = {
            type: typeof result,
            value: result
        }
        //console.log('Response:', res_obj['value']);
        str = serialize(res_obj);
        console.log(str);
        res.end(str);
        //res_req.write(str);
        //res_req.end();
    });
});

/*server.listen(8080, () => {
    console.log('Server is listening port 8080');
});*/
server.listen(port_id, () => {
    console.log('Listener is listening port ' + port_id);
});