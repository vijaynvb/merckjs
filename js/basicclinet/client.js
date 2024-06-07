// http modeule to work like a client 

const http = require('http');

const options={
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain'
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.setEncoding('utf8');

    res.on('data', (chunk) => {data = data + chunk;} );

    res.on('end', () => console.log(data));
});

req.on('error', (e) => {console.log('problem with request:' + e.message)});

req.end();