const http = require("http");
const https = require("https");

http.createServer((req, res) => {
  const options = {
    hostname: "api-inference.huggingface.co",
    path: req.url,
    method: req.method,
    headers: req.headers,
  };
  options.headers["host"] = "api-inference.huggingface.co";

  const proxy = https.request(options, (r) => {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res);
  });

  req.pipe(proxy);
  proxy.on("error", (e) => res.end(e.message));
}).listen(3000);
