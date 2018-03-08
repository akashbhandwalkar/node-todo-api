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
    //Updates all record of given condition
    db.collection('Todos').UpdateMany({
        name: "Akash Bhandwalkar"
    },{
        $set:{
            name:"Akash Dada"
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log("result-->", JSON.stringify(result, undefined, 2));
    })
    .catch( (error)=>{
        console.log("error-->", error);
    });


    //set given data
    db.collection('Todos').findOneAndUpdate({
        name: "Akash Bhandwalkar"
    },{
        $set:{
            name:"Akash Dada"
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log("result-->", JSON.stringify(result, undefined, 2));
    })
    .catch( (error)=>{
        console.log("error-->", error);
    });


    //increment given document
    db.collection('Todos').findOneAndUpdate({
        _id:new ObjectID("5aa187cdf7f3f150d10f3d2e")
    },{
        $inc:{
            age:5
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log("result-->", JSON.stringify(result, undefined, 2));
    })
    .catch( (error)=>{
        console.log("error-->", error);
    });

 

    client.close();
});