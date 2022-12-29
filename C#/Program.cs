using System;

namespace Leapwise22v2{
    class Program{
        static void Main(string[] args){
            string topic = "SmartLight/turningOnOff";
            string message = "ledOn";
            Mqtt lampica = new Mqtt();

            // Pozivanje metode za spajanje na broker
            lampica.MqttConnect();

            // Pozivanje metode za slanje mqtt poruke
            lampica.MqttPublish(topic, message);

            // Pozivanje metode za odspajanje sa brokera
            string disconnectMessage = "ledOff";
            lampica.MqttDisconnect(topic, disconnectMessage);
        }
    }
}