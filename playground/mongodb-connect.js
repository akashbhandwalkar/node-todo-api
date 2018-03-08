// const MongoClient = require('mongodb').MongoClient;

const { MongoClient } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error,client)=>{
    
if(error){
        return console.log("Unable to conncect", error);
    }else{
        console.log("conncected-->",client);

    };
    

    client.close();
});