
const http = require('http');
const phone = process.env.CARLOS_TELEPHONE;
http.createServer((req, res) =>{
    console.log(phone);
    res.write('Server1');
    res.end()
}).listen(5000);