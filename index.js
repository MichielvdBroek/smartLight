const http = require('http');
var firebase = require('firebase');
var mqtt = require('mqtt');

const hostname = '127.0.0.1';
const port = 3000;

var sections = [];
var lights = [];
var sensors = [];

sections.push(
    {'id' : 1, 'modeid' : 1, 'red' : 0, 'green' : 0, 'blue' : 0},
    {'id' : 2, 'modeid' : 2, 'red' : 255, 'green' : 0, 'blue' : 0},
    {'id' : 3, 'modeid' : 3, 'red' : 0, 'green' : 255, 'blue' : 0}
);

lights.push(
    {'id' : 1, 'sid' : 1},
    {'id' : 2, 'sid' : 1},
    {'id' : 3, 'sid' : 1},
    {'id' : 4, 'sid' : 2},
    {'id' : 5, 'sid' : 2},
    {'id' : 6, 'sid' : 3}
);

sensors.push(
    {'id' : 1, 'sid' : 1, 'sound' : 3.1415, 'people' : 2},
    {'id' : 2, 'sid' : 2, 'sound' : 31.415, 'people' : 3},
    {'id' : 3, 'sid' : 3, 'sound' : 0, 'people' : 0}
);
/*var html = `
<h1> some text\n <\h1>
<h6> input text: <input type="text" name="inputText"><br> </h6>
`;
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
    res.write(html);
    
    res.end();
});

//************************
//*set up server/webpage *
//************************
/*server.listen(port, hostname, () => {
    console.log(hostname + ": " + "server started on port " + port);
});
*/

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

//************************
//*define firebase       *
//************************
firebase.initializeApp({
  apiKey: "AIzaSyAuLNhAnNdl6PFprTubZA_qS4is2moV9Uw",
  serviceAccount: "./smartLight-b35ad744a03e.json",
  databaseURL: "https://smartlight-188310.firebaseio.com",
});


//************************
//*define mqtt client    *
//************************
//username i339492_smartlight
//pass Ccp1UA1u1XG6A1
var client = mqtt.connect('mqtt://test.mosquitto.org');
//var client = mqtt.connect('mqtt://mqtt.fhict.nl/'); //needs log in data, how?!

//************************
//*sub client to mqtt    *
//************************
client.on('connect', function() {
    client.subscribe('private/i123456');
    client.publish('private/i123456', 'connected');

});

//*************************************
//*if a message comes in, print it    *
//*************************************
client.on('message', function(topic, message) {
    console.log(topic.toString() + ": " + message.toString());
//    client.end();
});

//************************
//*set up firebase refs  *
//************************
var firebaseRef = firebase.database().ref();
var dataRef = firebaseRef.child('data');

//************************
//*clear 'devs' in db    *
//************************
//firebaseRef.update({
//    'data': null
//});

//************************
//*push devs to in db    *
//************************

for (var i = 0; i < 3; i++) 
{
    var sectionRef = dataRef.child('section/' + sections[i].id);
    var pushKey = sectionRef.push();

    var message = {
        id : sections[i].id,
        modeid : sections[i].modeid,
        red : sections[i].red,
        green : sections[i].green,
        blue : sections[i].blue
    };

    sectionRef.update(message);
}

for (var i = 0; i < 6; i++) 
{
    var lightRef = dataRef.child('lights/' + lights[i].id);
    var pushKey = lightRef.push();

    var message = {
        id : lights[i].id,
        sid : lights[i].sid
    };

    lightRef.update(message);
}


for (var i = 0; i < 3; i++) 
{
    var sensorRef = dataRef.child('sensor/' + sensors[i].id);
    var pushKey = sensorRef.push();

    var message = {

        id : sensors[i].id,
        sid : sensors[i].sid,
        sound : sensors[i].sound,
        people : sensors[i].people
    };

    sensorRef.update(message);
}

var data;
dataRef.on('value', function(snapshot)
{
    data = snapshot.val();
    console.log(data, "\n");
});

var sendmqttMessage = function(){
    client.publish('private/i123456', 'can i say something?');
    //setTimeout(sendmqttMessage, 1000);
};

setTimeout(sendmqttMessage, 4000);

//server moet data kunnen ontvangen op een script.
//er runt dus een script als server. wanneer deze data ontvangt wordt deze afgehandeld
//data opties:
    //"read", "current mode/huidige licht kleur/lampIDs"
