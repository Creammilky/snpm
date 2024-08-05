const http = require('http');
var serialize = require('serialize-javascript');

console.log(process.cwd());
/*
str = serialize({
  ModuleName: "@zerodep/string-padleft",
  MethodName: "stringPadLeft",
  ArgNum: 2,
  Args: ['abc', 10]
});
*/
str = serialize({
  ModuleName: "serialize-javascript",
  MethodName: "",
  ArgNum: 1,
  Args: [10]
});
const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain', // 根据服务器期望的Content-Type设置
  },
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Request with error: ${e.message}`);
});

// 发送请求体
req.write(str);
req.end();