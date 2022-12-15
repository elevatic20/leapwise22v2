var mqtt;
var reconnectTimeout = 2000;
var host = "broker.hivemq.com";
var port = 8000;

function onConnect() {
    console.log("Connected");
    message = new Paho.MQTT.Message("webAppConnected");
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);
    ledOff = new Paho.MQTT.Message("ledOff");
    ledOff.destinationName = "SmartLight/turningOnOff";
    mqtt.send(ledOff);
}


function MQTTconnect() {
    console.log("Connected to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, "mosquitto1");
    var options = {
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.connect(options);
}


document.getElementById('red').onclick = function () {

    console.log(red);
    message = new Paho.MQTT.Message("redOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);
}

document.getElementById('green').onclick = function () {

    console.log(green);
    message = new Paho.MQTT.Message("greenOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

var blue = false;
document.getElementById('blue').onclick = function () {

    console.log(blue);
    message = new Paho.MQTT.Message("blueOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

document.getElementById('yellow').onclick = function () {

    console.log(yellow);
    message = new Paho.MQTT.Message("yellowOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

var purple = false;
document.getElementById('purple').onclick = function () {

    console.log(purple);
    message = new Paho.MQTT.Message("purpleOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

document.getElementById('cyan').onclick = function () {

    console.log(cyan);
    message = new Paho.MQTT.Message("cyanOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

document.getElementById('white').onclick = function () {

    console.log(white);
    message = new Paho.MQTT.Message("ledOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

document.getElementById('klizac').onclick = function () {

    console.log(klizac);
    message = new Paho.MQTT.Message("ledOn");
    console.log(message);
    message.destinationName = "SmartLight/turningOnOff";
    mqtt.send(message);

}

var klizac = false;
document.getElementById('klizac').onclick = function () {
    if (!klizac) {
        console.log(klizac);
        message = new Paho.MQTT.Message("ledOn");
        console.log(message);
        message.destinationName = "SmartLight/turningOnOff";
        mqtt.send(message);
        klizac = true;
    }
    else {
        console.log(klizac);
        message = new Paho.MQTT.Message("ledOff");
        console.log(message);
        message.destinationName = "SmartLight/turningOnOff";
        mqtt.send(message);
        klizac = false;
    }
}

/* function redOn(){
    var pressed = true;
    if (pressed){
        console.log("redOn");
        message = new Paho.MQTT.Message("redOn");
        message.destinationName = "SmartLight/turningOnOff";
        mqtt.send(message);
        pressed = false;
    }
    else{
        console.log("redOff");
        message = new Paho.MQTT.Message("redOff");
        message.destinationName = "SmartLight/turningOnOff";
        mqtt.send(message);
        pressed = true;
    }
} */