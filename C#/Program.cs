using Microsoft.EntityFrameworkCore;
//using Database.TimescaleHelper;
namespace backendLampica
{

    class Program
    {
        
        static void Main(string[] args)
        {

            // Create a new instance of our helper class. This class
            // contains all of the methods for interacting with
            // TimescaleDB for this tutorial
            TimescaleHelper ts = new TimescaleHelper();
            Mqtt lampica = new Mqtt();


            var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddDatabaseDeveloperPageExceptionFilter();
            var app = builder.Build();
            //provjera povezanosti s bazom podataka
            ts.CheckDatabaseConnection();
            app.MapPost("/webAppConnected", () => lampica.WebAppConnected());
            app.MapPost("/ledOn", () => InsertState(true));
            app.MapPost("/ledOff", () => InsertState(false));
            app.MapPost("/redOn", () => ChangeColor("redOn"));
            app.MapPost("/greenOn", () => ChangeColor("greenOn"));
            app.MapPost("/blueOn", () => ChangeColor("blueOn"));
            app.MapPost("/yellowOn", () => ChangeColor("yellowOn"));
            app.MapPost("/purpleOn", () => ChangeColor("purpleOn"));
            app.MapPost("/cyanOn", () => ChangeColor("cyanOn"));
            app.MapPost("/whiteOn", () => ChangeColor("whiteOn"));
            app.MapPost("/rgbOn", () => ChangeColor("rgbOn"));
            app.MapPost("/dimm25", () => lampica.ChangeProperty("dimm25"));
            app.MapPost("/dimm50", () => lampica.ChangeProperty("dimm50"));
            app.MapPost("/dimm75", () => lampica.ChangeProperty("dimm75"));
            app.MapPost("/dimm100", () => lampica.ChangeProperty("dimm100"));
            app.MapGet("/data", () => ts.getData());
            app.MapGet("/checkState", () => ts.checkState());

            app.Run();

            void InsertState(bool state)
            {
                ts.InsertState(state);
                lampica.ChangeState(state);
            }

            void ChangeColor(string color)
            {
                ts.ChangeColor(color);
                lampica.ChangeProperty(color);
            }
        }


    }
}
