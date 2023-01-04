using System;
using Npgsql;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Drawing;


namespace backendLampica
{

    // This class contains all of the methods needed to complete the
    // quick-start, providing a sample of each database operation in total
    // to refer to later.
    
    public class TimescaleHelper
    {
        string topic = "SmartLight/turningOnOff";
        Mqtt lampica = new Mqtt();
        

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        private static string Host = "";
        private static string User = "";
        private static string DBname = "";
        private static string Password = "";
        private static string Port = "";
        private static string conn_str = "";
        class podaci
        {
            public float Monday;
            public float Tuesday;
            public float Wednesday;
            public float Thursday;
            public float Friday;
            public float Saturday;
            public float Sunday;
                
        }

        class stanje
        {
            public bool zadnjeStanje;
            public string zadnjaBoja;
        }

        //
        // This is the constructor for our TimescaleHelper class
        //
        
        public TimescaleHelper(string host = "20.232.79.126", string user = "postgres",
            string dbname = "postgres", string password = "password", string port = "5432")
        {
            try {
                Host = host;
                User = user;
                DBname = dbname;
                Password = password;
                Port = port;
                // Build connection string using the parameters above
                conn_str = String.Format("Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
                                    Host,
                                    User,
                                    DBname,
                                    Port,
                                    Password); 
            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske kod parametara za spajanje na bazu podataka: \n" + ex);
            }
            
        }


        // Helper method to get a connection for the execute function
        NpgsqlConnection getConnection()
        {
            
            var Connection = new NpgsqlConnection(conn_str);
            try { 
                Connection.Open();
            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske tijekom uspostavljanja veze s bazom podataka: \n" + ex);
            }
            return Connection;
        }


        //
        // Procedure - Connecting .NET to TimescaleDB:
        // Check the connection TimescaleDB and verify that the extension
        // is installed in this database
        //
        public void CheckDatabaseConnection()
        {
            // get one connection for all SQL commands below
            using (var conn = getConnection())
            {


                var sql = "SELECT default_version, comment FROM pg_available_extensions WHERE name = 'timescaledb';";

                try {
                    using (var cmd = new NpgsqlCommand(sql, conn))
                    {
                        using NpgsqlDataReader rdr = cmd.ExecuteReader();


                        if (!rdr.HasRows)
                        {
                            log.Info("Missing TimescaleDB extension!");
                            conn.Close();
                            return;
                        }


                        while (rdr.Read())
                        {
                            log.Info("TimescaleDB Default Version: " +rdr.GetString(0)+"\n"+ rdr.GetString(1));
                        }
                        conn.Close();
                    }
                }
                catch(Exception ex) {
                    log.Info("Doslo je do pogreske kod provjere povezanosti s bazom podataka: \n" + ex);
                }
               
            }


        }

        public void InsertState(bool state)
        {
            try {
                int zadnjeStanje = -1;
                bool prazno = true;
                using (var conn = getConnection())
                {
                    using (var cmd = new NpgsqlCommand("SELECT stanje from lampica ORDER BY vrijeme DESC LIMIT 1", conn))
                    {
                        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                zadnjeStanje = Convert.ToInt32(rdr.GetBoolean(0));
                                prazno = false;
                                log.Info(zadnjeStanje);
                            }
                        }
                        
                    }
                    
                    using (var command = new NpgsqlCommand("INSERT INTO lampica (stanje, vrijeme) VALUES (@state, @time)", conn))
                    {
                        
                        command.Parameters.AddWithValue("state", state);
                        command.Parameters.AddWithValue("time", DateTime.Now);
                        
                        if ((zadnjeStanje == 1 && state == false && prazno != true) || (state == true && zadnjeStanje != Convert.ToInt32(state)))
                            command.ExecuteNonQuery();

                        log.Info("Unesen je novi podatak u bazu podataka");
                        
                    }
                    /*
                    using (var command = new NpgsqlCommand("INSERT INTO bojalampice (boja, vrijeme) VALUES (@color, @time)", conn))
                    {

                        command.Parameters.AddWithValue("color", "whiteOn");
                        command.Parameters.AddWithValue("time", DateTime.Now);

                        if (state == false)
                        {
                            command.ExecuteNonQuery();
                            lampica.MqttPublish(topic, "whiteOn");
                        }


                        log.Info("Pocetna boja je bijela");
                        
                    }*/

                    conn.Close();
                }
                lampica.MqttConnect();
                if (state == true)
                    lampica.MqttPublish(topic, "ledOn");
                else
                {
                    lampica.MqttPublish(topic, "ledOff");
                    lampica.MqttDisconnect(topic, "ledOff");
                }
            } 
            catch (Exception ex) {
                log.Info("Doslo je do pogreske pri unosu podataka u bazu podataka: \n" + ex);
            }
            
        }

        public void ChangeColor(string color)
        {
            try
            {

                using (var conn = getConnection())
                {
                    using (var command = new NpgsqlCommand("INSERT INTO bojalampice (boja, vrijeme) VALUES(@color, @time)", conn))
                    {
                        command.Parameters.AddWithValue("color", color);
                        command.Parameters.AddWithValue("time", DateTime.Now);
                        command.ExecuteNonQuery();
                        
                    }
                    conn.Close();
                }

                
                lampica.MqttPublish(topic, color);
                log.Info("Boja lampice je promijenjena na: " + color.Substring(0, color.Length-2));
            }
            catch (Exception ex)
            {
                log.Info("Doslo je do pogreske pri promjeni boje lampice: \n" + ex);
            }
            
        }

        public string getData()
        {
            string vrijednosti = "";
            try
            {
                DateTime datum = DateTime.Now;
                var razlika = datum.DayOfWeek - System.Threading.Thread.CurrentThread.CurrentCulture.DateTimeFormat.FirstDayOfWeek;
                DateTime prviDan = datum.AddDays(-razlika);
                DateTime pon = new DateTime(prviDan.Year, prviDan.Month, prviDan.Day, 0, 0, 0);
                DateTime ned = pon.AddDays(7);
                int dan = 0;
                DateTime[] tjedan = new DateTime[7];
                for (int i = 0; i <= 6; i++)
                {
                    tjedan[i] = pon.AddDays(i);
                }

                bool upaljena = false;

                using (var conn = getConnection())
                {
                    using (var cmd = new NpgsqlCommand("SELECT stanje, vrijeme from lampica WHERE vrijeme BETWEEN @pon AND @ned ORDER BY id ", conn))
                    {
                        cmd.Parameters.AddWithValue("pon", pon);
                        cmd.Parameters.AddWithValue("ned", ned);
                        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                dan = rdr.GetDateTime(1).DayOfWeek - (pon.DayOfWeek + 1);

                                //ako je pritisnut gumb on, i lampica prije toga vec nije bila upaljena


                                if (rdr.GetBoolean(0) == true && upaljena == false)
                                {
                                    tjedan[dan] = tjedan[dan].AddHours(-rdr.GetDateTime(1).Hour);
                                    tjedan[dan] = tjedan[dan].AddMinutes(-rdr.GetDateTime(1).Minute);
                                    tjedan[dan] = tjedan[dan].AddSeconds(-rdr.GetDateTime(1).Second);
                                    upaljena = true;

                                }
                                //ako je lampica prije pritiska gumba off bila sigurno upaljena
                                if (rdr.GetBoolean(0) == false && upaljena == true)
                                {
                                    upaljena = false;
                                    tjedan[dan] = tjedan[dan].AddHours(rdr.GetDateTime(1).Hour);
                                    tjedan[dan] = tjedan[dan].AddMinutes(rdr.GetDateTime(1).Minute);
                                    tjedan[dan] = tjedan[dan].AddSeconds(rdr.GetDateTime(1).Second);

                                }


                            }
                            if (upaljena == true)
                            {

                                tjedan[dan] = tjedan[dan].AddHours(datum.Hour);
                                tjedan[dan] = tjedan[dan].AddMinutes(datum.Minute);
                                tjedan[dan] = tjedan[dan].AddSeconds(datum.Second);

                            }

                            for (int i = 0; i <= 6; i++)
                            {


                                vrijednosti = vrijednosti + " " + tjedan[i].Hour;
                            }

                            podaci podatak = new podaci()
                            {
                                Monday = tjedan[0].Hour + (float)Math.Round(tjedan[0].Minute / 60.0f, 2),
                                Tuesday = tjedan[1].Hour + (float)Math.Round(tjedan[1].Minute / 60.0f, 2),
                                Wednesday = tjedan[2].Hour + (float)Math.Round(tjedan[2].Minute / 60.0f, 2),
                                Thursday = tjedan[3].Hour + (float)Math.Round(tjedan[3].Minute / 60.0f, 2),
                                Friday = tjedan[4].Hour + (float)Math.Round(tjedan[4].Minute / 60.0f, 2),
                                Saturday = tjedan[5].Hour + (float)Math.Round(tjedan[5].Minute / 60.0f, 2),
                                Sunday = tjedan[6].Hour + (float)Math.Round(tjedan[6].Minute / 60.0f, 2),


                            };
                            vrijednosti = JsonConvert.SerializeObject(podatak);

                        }
                        
                    }
                    conn.Close();
                }


                log.Info("Uspjesno su prikazani podaci za tekuci tjedan");
            }
            catch(Exception ex)
            {
                log.Info("Doslo je do pogreske kod dohvacanja podataka iz baze podataka: \n" + ex);
            }


            return vrijednosti;
        }

        public void WebAppConnected()
        {
            try
            {
                lampica.MqttConnect();
                lampica.MqttPublish(topic, "webAppConnected");
                //lampica.MqttPublish(topic, "ledOff");
                //InsertState(false);
                log.Info("Uspjesno povezivanje s lampicom!");
            }
            catch(Exception ex)
            {
                log.Info("Doslo je do pogreske kod uspostavljanja veze s lampicom: \n" + ex);
            }
            
        }

        public string checkState()
        {
            string vrijednost = "";
            try {
                
                stanje podatak = new stanje();
                podatak.zadnjeStanje = false;
                podatak.zadnjaBoja = "gray";
                using (var conn = getConnection())
                {
                    using (var cmd = new NpgsqlCommand("SELECT stanje from lampica ORDER BY vrijeme DESC LIMIT 1", conn))
                    {
                        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                podatak.zadnjeStanje = rdr.GetBoolean(0);
                            }
                        }
                        vrijednost = JsonConvert.SerializeObject(podatak);
                        
                    }
                    if(podatak.zadnjeStanje == true)
                        using (var cmd = new NpgsqlCommand("SELECT boja from bojalampice ORDER BY vrijeme DESC LIMIT 1", conn))
                        {
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    podatak.zadnjaBoja = rdr.GetString(0);
                                    switch (podatak.zadnjaBoja)
                                    {
                                        case "redOn": podatak.zadnjaBoja = "#ff0000"; break;
                                        case "greenOn": podatak.zadnjaBoja = "#00ff00"; break;
                                        case "blueOn": podatak.zadnjaBoja = "#0000ff"; break;
                                        case "yellowOn": podatak.zadnjaBoja = "#ffff00"; break;
                                        case "purpleOn": podatak.zadnjaBoja = "#b100b1"; break;
                                        case "whiteOn": podatak.zadnjaBoja = "#ffffff"; break;
                                        case "cyanOn": podatak.zadnjaBoja = "#00ffff"; break;
                                    
                                    }
                                }
                            }
                        vrijednost = JsonConvert.SerializeObject(podatak);
                        
                        }

                    log.Info("Uspjesno je provjereno zadnje stanje lampice");
                    conn.Close();
                }

            }
            catch(Exception ex) {
                log.Info("Doslo je do pogreske pri provjeri trenutnog stanja lampice: " + ex);
            }
            return vrijednost;
        }


    }

}
