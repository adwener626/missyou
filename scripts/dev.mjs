import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {extname, normalize, resolve} from 'node:path';

const root = resolve(process.cwd());
const port = Number(process.env.PORT) || 4173;
const types = {'.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = normalize(resolve(root, `.${requested}`));

  if (!file.startsWith(root)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  const stream = createReadStream(file);
  stream.on('open', () => {
    response.writeHead(200, {'Content-Type': types[extname(file)] ?? 'application/octet-stream'});
    stream.pipe(response);
  });
  stream.on('error', () => response.writeHead(404).end('Not found'));
}).listen(port, '127.0.0.1', () => {
  console.log(`ECHO WORLDS запущен: http://localhost:${port}`);
  console.log('Остановить сервер: Ctrl+C');
});
