const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

//=> do on return from function.

const server = http.createServer((req, res) => {
    res.statusCode = 200;
//    res.setHeader('Content-type', 'text/plain');
//type plain text
    res.setHeader('Content-type', 'text/html');
//type html text
    res.write('<h1> bas is een faggot <\h1>');
    
    res.end();
});


function printHello(name)
{
    if (name === "Michiel")
    {
        console.log("are you my god?");
    }
    console.log("hello " + name + ". How are you?\n");
};



//main
server.listen(port, hostname, () => {
    console.log(hostname + ": " + "server started on port " + port);
});

console.log('\n\n');
printHello("Michiel");
printHello("Bas");