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


            
            var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddDatabaseDeveloperPageExceptionFilter();
            var app = builder.Build();
            app.MapGet("/", () =>"Hello!");
            app.MapPost("/ledOn", () => ts.InsertState(true));
            app.MapPost("/ledOff", () => ts.InsertState(false));
            app.MapPost("/redOn", () => ts.ChangeColor("redOn"));
            app.MapPost("/greenOn", () => ts.ChangeColor("greenOn"));
            app.MapPost("/blueOn", () => ts.ChangeColor("blueOn"));
            app.MapPost("/yellowOn", () => ts.ChangeColor("yellowOn"));
            app.MapPost("/purpleOn", () => ts.ChangeColor("purpleOn"));
            app.MapPost("/cyanOn", () => ts.ChangeColor("cyanOn"));
            app.MapPost("/whiteOn", () => ts.ChangeColor("whiteOn"));
            app.MapGet("/data", () => ts.getData());

            app.Run();
        }


    }
}