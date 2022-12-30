import paho.mqtt.publish as publish

LED = input()

print(LED)

publish.single("SmartLight/turningOnOff", str(LED), hostname="test.mosquitto.org")

print("Done")