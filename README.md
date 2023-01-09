# Leapwise project - smart bulb

Prijedlog zadatka: Praćenje statusa rasvjetnog tijela

Svrha zadatka:
Omogućiti studentima rad na problemu koji emulira sve segmente IoT projekta u stvarnom
svijetu.

Opis zadatka:
Potrebno je napraviti aplikaciju koja će omogućiti praćenje stanja rasvjetnog tijela te
omogućiti upravljanje istim.
Zadatak se sastoji od sljedećih dijelova:
- Rasvjetnog tijela
- Komunikacijskog modula preko kojega rasvjetno tijelo komunicira (kako se radi o
zadatku koji nije u komercijalne svrhe komunikacija će biti ograničena na otvorene
komunikacijske protokole kratkog dometa, npr. Bluetooth, Zigbee itd.)
- Odabir te konfiguracija integracijskog kanala (npr. MQTT, AMQP, CoAP itd.) koristeći
postojeće open source brokere, npr VerneMQ.
- Izrada aplikacije u programskom jeziku po izboru (npr. Java, Kotlin, Python itd.) koja
omogućuje primanje i slanje podataka od i prema komunikacijskom modulu,
odnosno dekodiranje i enkodiranje poruka.
- Izrade aplikacije za perzistenciju podataka dobivenih sa rasvjetnog tijela koja koristi
jednu od standardnih time-series baza podataka (npr. Timescale, InfluxDB itd.)
- Izrada korisničkog sučelja koje služi za prikaz i upravljanje rasvjetnim tijelom (npr.
React.js, AngularJS itd.)
Minimalni podaci koje je potrebno pratiti:
- Status rasvjetnog tijela
- Razina dimminga (ukoliko rasvjetno tijelo podržava funkcionalnost)
Bonus:
- Postavljanje aplikacija na jedan od cloud servisa (npr. Google, MS Azure, AWS)

