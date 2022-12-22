using System;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace MqttTest
{
    class Mqtt_publish
    {
        MqttClient client;
        private void mqttConnect(){
            client = new MqttClient("broker.hivemq.com");
            client.Connect("newID");
            Response.Write("Connected");
        }

        private void mqttPublish(string message){
            client.Publish(Encoding.UTF8.GetBytes(message));
        }

        private void mqttDisconnect(){
            client.Disconnect();
        }
    }
}
