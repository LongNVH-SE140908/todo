using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Project4.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static IMongoCollection<TodoModel> collection;
        public TodoController()
        {
            const string connectionString = "mongodb://44.211.194.0:27017";

            // Create a MongoClient object by using the connection string
            var client = new MongoClient(connectionString);

            //Use the MongoClient to access the server
            var database = client.GetDatabase("test");

            collection = database.GetCollection<TodoModel>("todo");


        }


        [HttpGet]
        public ActionResult Get()
        {
            return new JsonResult(collection.AsQueryable().ToList());
            
        }
        [HttpGet]
        public ActionResult Add(string name)
        {
            var issuccess = collection.InsertOneAsync(new TodoModel() { name = name }).IsCompleted;
            return issuccess ? Ok() : BadRequest();
        }

    }
}
