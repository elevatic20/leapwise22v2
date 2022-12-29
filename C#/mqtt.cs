using System;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Leapwise22v2
{
    public class Mqtt
    {
        MqttClient client = new MqttClient("broker.hivemq.com");
        public void MqttConnect(){
            // Spajanje na brokea
            client.Connect(Guid.NewGuid().ToString());
            Console.WriteLine("Connected");
        }

        public void MqttPublish(string topic, string message){
            // Slanje poruke na topic
            byte[] data = Encoding.UTF8.GetBytes(message);
            client.Publish(topic, data, MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);
        }

        public void MqttDisconnect(string topic, string message){
            // Odspajanje sa brokera
            // Spavanje od 1 sekunde, zbog kasnjenja poruke
            Thread.Sleep(2000);
            byte[] data = Encoding.UTF8.GetBytes(message);
            client.Publish(topic, data, MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);
            client.Disconnect();
            Console.WriteLine("Disconnected");
        }
    }
}