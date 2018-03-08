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


    //Delete Many documents
    db.collection('Todos').deleteMany({
        name:"Akash Bhandwalkar"
    }).then((result)=>{
        console.log(JSON.stringify(result, undefined,2));
    })

     //Delete single documents
     db.collection('Todos').deleteOne({
        name:"Akash Bhandwalkar"
    }).then((result)=>{
        console.log(JSON.stringify(result, undefined,2));
    });

     //Delete single documents but callback receive relevent data
    db.collection('Todos').findOneAndDelete({
        flag:true
    }).then( (result)=>{
        console.log(JSON.stringify(result, undefined, 2));
    })
    .catch( (error)=>{
        console.log("error-->", error);
    })

    client.close();
});