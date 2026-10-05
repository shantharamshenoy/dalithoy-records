const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'};

http.createServer((req,res)=>{
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(filePath,(err,stat)=>{
    if(err || !stat.isFile()){res.writeHead(404);return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'public, max-age=3600'});
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(port,()=>console.log(`Dalithoy Records site running on ${port}`));
