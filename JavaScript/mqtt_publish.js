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

            var red = false;
            document.getElementById('red').onclick = function() {
                if(!red){
                    console.log(red);
                    message = new Paho.MQTT.Message("redOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    red = true;
                    green = blue = yellow = purple = cyan = white = false;
                }
                else{
                    console.log(red);
                    message = new Paho.MQTT.Message("redOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    red = false;
                }
            }

            var green = false;
            document.getElementById('green').onclick = function() {
                if(!green){
                    console.log(green);
                    message = new Paho.MQTT.Message("greenOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    green = true;
                    white = red = blue = yellow = purple = cyan = false;
                }
                else{
                    console.log(green);
                    message = new Paho.MQTT.Message("greenOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    green = false;
                }
            }

            var blue = false;
            document.getElementById('blue').onclick = function() {
                if(!blue){
                    console.log(blue);
                    message = new Paho.MQTT.Message("blueOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    blue = true;
                    white = green = red = yellow = purple = cyan = false;
                }
                else{
                    console.log(blue);
                    message = new Paho.MQTT.Message("blueOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    blue = false;
                }
            }

            var yellow = false;
            document.getElementById('yellow').onclick = function() {
                if(!yellow){
                    console.log(yellow);
                    message = new Paho.MQTT.Message("yellowOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    yellow = true;
                    white = green = blue = red = purple = cyan = false;
                }
                else{
                    console.log(yellow);
                    message = new Paho.MQTT.Message("yellowOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    yellow = false;
                }
            }

            var purple = false;
            document.getElementById('purple').onclick = function() {
                if(!purple){
                    console.log(purple);
                    message = new Paho.MQTT.Message("purpleOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    purple = true;
                    white = green = blue = yellow = red = cyan = false;
                }
                else{
                    console.log(purple);
                    message = new Paho.MQTT.Message("purpleOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    purple = false;
                }
            }

            var cyan = false;
            document.getElementById('cyan').onclick = function() {
                if(!cyan){
                    console.log(cyan);
                    message = new Paho.MQTT.Message("cyanOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    cyan = true;
                    white = green = blue = yellow = purple = red = false;
                }
                else{
                    console.log(cyan);
                    message = new Paho.MQTT.Message("cyanOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    cyan = false;
                }
            }

            var white = false;
            document.getElementById('white').onclick = function() {
                if(!white){
                    console.log(white);
                    message = new Paho.MQTT.Message("ledOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    white = true;
                    red = green = blue = yellow = purple = red = false;
                }
                else{
                    console.log(white);
                    message = new Paho.MQTT.Message("ledOff");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    white = false;
                }
            }

            var klizac = false;
            document.getElementById('klizac').onclick = function() {
                if(!klizac){
                    console.log(klizac);
                    message = new Paho.MQTT.Message("ledOn");
                    console.log(message);
                    message.destinationName = "SmartLight/turningOnOff";
                    mqtt.send(message);
                    klizac = true;
                    green = blue = yellow = purple = red = false;
                }
                else{
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
            }*/