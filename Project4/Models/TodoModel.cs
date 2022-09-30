using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Project4.Models
{
    public class TodoModel 
    {
       public ObjectId Id { get; set; }
       public string name { get; set; }
    }
}
