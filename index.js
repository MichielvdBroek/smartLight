const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var Devs = [];
Devs.push({
    'name' : 'Michiel',
    'age': 19
});
Devs.push({
    'name' : 'Bas',
    'age': 22
});
Devs.push({
    'name' : 'Simon',
    'age': 21
});
Devs.push({
    'name' : 'Milan',
    'age': 20
});


//=> do on return from function.
//************************
//*define server         *
//************************
const server = http.createServer((req, res) => {
    res.statusCode = 200;
//    res.setHeader('Content-type', 'text/plain');
//type plain text
    res.setHeader('Content-type', 'text/html');
//type html text
    res.write('<h1> bas is een faggot <\h1>');
    
    res.end();
});

//************************
//*define firebase       *
//************************
var firebase = require('firebase');
firebase.initializeApp({
  apiKey: "AIzaSyAuLNhAnNdl6PFprTubZA_qS4is2moV9Uw",
  serviceAccount: "./smartLight-b35ad744a03e.json",
  databaseURL: "https://smartlight-188310.firebaseio.com",
});


//************************
//*define testfunction   *
//************************
/*function printHello(name)
{
    if (name === "Michiel")
    {
        console.log("are you my god?");
    }
    console.log("hello " + name + ". How are you?\n");
};*/


//printHello("Michiel");
//printHello("Bas");
console.log('\n\n');

server.listen(port, hostname, () => {
    console.log(hostname + ": " + "server started on port " + port);
});

var firebaseRef = firebase.database().ref();
var devNamesRef = firebaseRef.child('devs');


//************************
//*clear 'devs' in db    *
//************************
firebaseRef.update({
    'devs': null
});

//************************
//*push devs to in db    *
//************************
for (var i = 0; i < 4; i++) 
{
    var devNamesEntry = devNamesRef.push();
    
    console.log("a push key for the database has been created: " + devNamesEntry.key);
    devNamesEntry.set({
        name: Devs[i].name,
        age: Devs[i].age
    });
}
