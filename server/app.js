const http = require('http');

function deserialize(serializedJavascript){
    return eval('(' + serializedJavascript + ')');
  }

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
    console.log('Received Request:', body);
    // 根据需要处理body...
    let obj=deserialize(body);
    console.log("Type is "+ typeof obj);
    console.log("str is "+obj['str']);
    // 发送响应
    res.end('Request Received');
  });
});

server.listen(8080, () => {
  console.log('Server is listening port 8080');
});

//Usage:curl -X POST -H "Content-Type: text/plain" --data "这是一段文本" http://localhost:8080