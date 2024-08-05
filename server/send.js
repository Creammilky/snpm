const http = require('http');
var serialize = require('serialize-javascript');

stR=serialize({
    str  : 'string',
    num  : 0,
    obj  : {foo: 'foo'},
    arr  : [1, 2, 3],
    bool : true,
    nil  : null,
    undef: undefined,
    inf  : Infinity,
    date : new Date("Thu, 28 Apr 2016 22:02:17 GMT"),
    map  : new Map([['hello', 'world']]),
    set  : new Set([123, 456]),
    fn   : function echo(arg) { return arg; },
    re   : /([^\s]+)/g,
    big  : BigInt(10),
    url  : new URL('https://example.com/'),
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
req.write(stR);
req.end();