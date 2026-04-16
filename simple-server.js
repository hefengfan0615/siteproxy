
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8080;

const server = http.createServer((req, res) =&gt; {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index_www.netptop.com.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = 'text/html';

    fs.readFile(filePath, (error, content) =&gt; {
        if (error) {
            if(error.code == 'ENOENT'){
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('&lt;h1&gt;404 Not Found&lt;/h1&gt;', 'utf-8');
            }
            else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () =&gt; {
    console.log(`Server running at http://localhost:${PORT}/`);
});
