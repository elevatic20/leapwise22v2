using System;
using Npgsql;
using System.Collections.Generic;
using Newtonsoft.Json;


namespace backendLampica
{

    // This class contains all of the methods needed to complete the
    // quick-start, providing a sample of each database operation in total
    // to refer to later.
    
    public class TimescaleHelper
    {
        string topic = "SmartLight/turningOnOff";
        string message = "ledOn";
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
            public int Monday;
            public int Tuesday;
            public int Wednesday;
            public int Thursday;
            public int Friday;
            public int Saturday;
            public int Sunday;
                
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
                log.Info("Doslo je do pogreske tijekom uspostavljanja veze: \n" + ex);
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
                using (var conn = getConnection())
                {
                    using (var command = new NpgsqlCommand("INSERT INTO lampica (stanje, vrijeme) VALUES (@state, @time)", conn))
                    {
                        
                        command.Parameters.AddWithValue("state", state);
                        command.Parameters.AddWithValue("time", DateTime.Now);
                        int nRows = command.ExecuteNonQuery();

                        log.Info(String.Format("Number of rows inserted={0}", nRows));
                    }
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
                int prethodniDan = 0;
                DateTime prethodnoVrijeme = DateTime.Now;
                DateTime[] tjedan = new DateTime[7];
                for (int i = 0; i <= 6; i++)
                {
                    tjedan[i] = pon.AddDays(i);
                }

                bool upaljena = false;

                var conn = getConnection();
                using (var cmd = new NpgsqlCommand("SELECT stanje, vrijeme from lampica WHERE vrijeme BETWEEN @pon AND @ned ORDER BY id ", conn))
                {
                    cmd.Parameters.AddWithValue("pon", pon);
                    cmd.Parameters.AddWithValue("ned", ned);
                    using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            dan = rdr.GetDateTime(1).DayOfWeek - pon.DayOfWeek;
                            //ako je pritisnut gumb on, i lampica prije toga vec nije bila upaljena
                            
                            if (rdr.GetBoolean(0) == true && upaljena == false)
                            {
                                upaljena = true;
                                tjedan[dan] = tjedan[dan].AddHours(-rdr.GetDateTime(1).Hour);
                                tjedan[dan] = tjedan[dan].AddMinutes(-rdr.GetDateTime(1).Minute);
                                tjedan[dan] = tjedan[dan].AddSeconds(-rdr.GetDateTime(1).Second);
                                
                            }//ako je pritisnut gumb off 
                            else
                            {
                                if (dan != prethodniDan && upaljena == true)
                                {
                                    tjedan[dan - 1] = tjedan[dan - 1].AddDays(1);
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



                            prethodniDan = rdr.GetDateTime(1).DayOfWeek - pon.DayOfWeek;
                            prethodnoVrijeme = rdr.GetDateTime(1);
                        }
                        if (upaljena == true)
                        {
                            tjedan[dan] = tjedan[dan].AddHours(datum.Hour);
                            tjedan[dan] = tjedan[dan].AddMinutes(datum.Minute);
                            tjedan[dan] = tjedan[dan].AddSeconds(datum.Second);
                        }
                        //log.Info("Ukupno vrijeme upaljene lampice:");
                        for (int i = 0; i <= 6; i++)
                        {
                            //log.Info(tjedan[i]);
                            vrijednosti = vrijednosti + " " + tjedan[i].Hour;
                        }

                        podaci podatak = new podaci()
                        {
                            Monday = tjedan[0].Hour,
                            Tuesday = tjedan[1].Hour,
                            Wednesday = tjedan[2].Hour,
                            Thursday = tjedan[3].Hour,
                            Friday= tjedan[4].Hour,
                            Saturday= tjedan[5].Hour,
                            Sunday= tjedan[6].Hour,


                        };
                        vrijednosti = JsonConvert.SerializeObject(podatak);

                    }

                }
                conn.Close();
                log.Info("Uspjesno su prikazani podaci");
            }
            catch(Exception ex)
            {
                log.Info("Doslo je do pogreske kod dohvacanja podataka iz baze podataka: \n" + ex);
            }


            return vrijednosti;
        }
       


    }

}