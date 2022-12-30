using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace backendLampica
{
    public class Mqtt
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        MqttClient client = new MqttClient("broker.hivemq.com");
        public void MqttConnect()
        {   // Spajanje na brokea
            try { 
                
                client.Connect(Guid.NewGuid().ToString());
                log.Info("Connected to broker");
            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske pri spajanju na brokera: \n" + ex);
            }    
            
        }

        public void MqttPublish(string topic, string message)
        {
            // Slanje poruke na topic
            try
            {
                byte[] data = Encoding.UTF8.GetBytes(message);
                client.Publish(topic, data, MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);

            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske pri slanju poruke na broker: \n" + ex);
            }
            
        }

        public void MqttDisconnect(string topic, string message)
        {
            // Odspajanje sa brokera
            // Spavanje od 1 sekunde, zbog kasnjenja poruke
            try { 
                Thread.Sleep(2000);
                byte[] data = Encoding.UTF8.GetBytes(message);
                client.Publish(topic, data, MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);
                client.Disconnect();
                log.Info("Disconnected from broker");
            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske pri odspajanju s brokera");
            }
            
        }
    }
}
