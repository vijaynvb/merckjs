const http = require("http");

// ip
// port
const PORT = 5000;
const HOST = "localhost";

const server = http.createServer(
    // lambda function
    (req,res) => {
        res.write("Hello World"); // in resonse body
        res.end();
    }
);

server.listen(PORT,HOST, ()=> {console.log("Server is Listening...")});