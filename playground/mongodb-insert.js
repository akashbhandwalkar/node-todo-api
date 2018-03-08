// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');
var obj = new ObjectID();
console.log("obj-->", obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error,client)=>{
    
if(error){
        return console.log("Unable to conncect", error);
    }else{
        console.log("conncected-->",client);

    };
    const db = client.db("TodoApp");
    db.collection('Todos').insertOne({
        id:1,
        name: "Akash Bhandwalkar"
    }, (error, result)=>{
        if(error){
            console.log("unable to save");
        }else{
            console.log("successfully executed the function!", JSON.stringify(result));
        }
    });

 

    client.close();
});