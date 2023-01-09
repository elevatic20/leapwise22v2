#!/usr/bin/python
import paho.mqtt.client as mqtt
from flask import Flask, render_template
import RPi.GPIO as GPIO
import time
from time import sleep

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#pinout glavna ledica - 27:red, 22:green, 23:blue
pinList1 = [27, 22, 23]

for i in pinList1:
    GPIO.setup(i, GPIO.OUT)

#pinout statusna ledica - 5:red, 6:green, 12:blue
pinList2 = [5, 6, 12]

for i in pinList2:
    GPIO.setup(i, GPIO.OUT)
    
MQTT_SERVER = "broker.hivemq.com"
MQTT_PATH = "SmartLight/turningOnOff"

def on_connect(client, userdata, flags, rc):
    print("Connection code:" +str(rc))
    client.subscribe(MQTT_PATH)
    
    #gasenje glavne ledice prilikom pokretanja programa
    GPIO.output(27, GPIO.HIGH)
    GPIO.output(22, GPIO.HIGH)
    GPIO.output(23, GPIO.HIGH)
    
    #signal statusne ledice prilikom pokretanja programa, ako je uspjeno spojeno blinka zeleno
    GPIO.output(5, GPIO.HIGH)
    GPIO.output(6, GPIO.HIGH)
    GPIO.output(12, GPIO.HIGH)
    sleep(1)
    i = 0
    while i < 4:
        GPIO.output(6, GPIO.LOW)
        sleep(0.2)
        GPIO.output(6, GPIO.HIGH)
        sleep(0.2)
        i += 1

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

    #stringovi - ledOn:upali ledicu, redOn:upali crvenu, greenOn:upali zelenu, blueOn:upali plavu
    #nekajOff:isto kak i gore samo kaj gasi

    if str(msg.payload) == "b'vuzgiBlaz'":
        pwm = GPIO.PWM(27, 1000)
        pwm.start(0)
        while True:
            for duty in (0, 101, 1)
                pwm.ChangeDutyCycle(duty)
                sleep(0.01)
            sleep(1)

            for duty in (100, -1, -1)
                pwm.ChangeDutyCycle(duty)
                sleep(0.01)
    
    if str(msg.payload) == "b'ledOn'":
        GPIO.output(27, GPIO.LOW)
        GPIO.output(22, GPIO.LOW)
        GPIO.output(23, GPIO.LOW)
        
    if str(msg.payload) == "b'ledOff'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
    
    if str(msg.payload) == "b'redOn'":
        GPIO.output(27, GPIO.LOW)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
        
    if str(msg.payload) == "b'redOff'":
        GPIO.output(27, GPIO.HIGH)
        
    if str(msg.payload) == "b'greenOn'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.LOW)
        GPIO.output(23, GPIO.HIGH)
        
        
    if str(msg.payload) == "b'greenOff'":
        GPIO.output(22, GPIO.HIGH)
        
    if str(msg.payload) == "b'blueOn'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.LOW)
        
    if str(msg.payload) == "b'blueOff'":
        GPIO.output(23, GPIO.HIGH)
    
    if str(msg.payload) == "b'yellowOn'":
        GPIO.output(27, GPIO.LOW)
        GPIO.output(22, GPIO.LOW)
        GPIO.output(23, GPIO.HIGH)
        
    if str(msg.payload) == "b'yellowOff'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
        
    if str(msg.payload) == "b'purpleOn'":
        GPIO.output(27, GPIO.LOW)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.LOW)
        
    if str(msg.payload) == "b'purpleOff'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
        
    if str(msg.payload) == "b'cyanOn'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.LOW)
        GPIO.output(23, GPIO.LOW)
        
    if str(msg.payload) == "b'cyanOff'":
        GPIO.output(27, GPIO.HIGH)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
    
    #signal o krivoj poruci, druga ledica blinka crveno
    if str(msg.payload) != "b'ledOn'" and str(msg.payload) != "b'ledOff'" and str(msg.payload) != "b'redOn'" and str(msg.payload) != "b'redOff'"\
       and str(msg.payload) != "b'greenOn'" and str(msg.payload) != "b'greenOff'" and str(msg.payload) != "b'blueOn'" and str(msg.payload) != "b'blueOff'"\
       and str(msg.payload) != "b'webAppConnected'" and str(msg.payload) != "b'yellowOn'"  and str(msg.payload) != "b'yellowOff'" and str(msg.payload) != "b'purpleOn'"\
       and str(msg.payload) != "b'purpleOff'" and str(msg.payload) != "b'cyanOn'" and str(msg.payload) != "b'cyanOff'":
        i = 0
        while i < 5:
            GPIO.output(5, GPIO.LOW)
            sleep(0.2)
            GPIO.output(5, GPIO.HIGH)
            sleep(0.2)
            i += 1
    
    if str(msg.payload) == "b'webAppConnected'":
        i = 0
        while i < 5:
            GPIO.output(12, GPIO.LOW)
            sleep(0.2)
            GPIO.output(12, GPIO.HIGH)
            sleep(0.2)
            i += 1
    
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(MQTT_SERVER)

client.loop_forever()
