const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const {  ObjectID } = require('mongodb');

var id ="5aa2388864f70cb825853953";

if(!ObjectID.isValid(id)){
    return console.log("ID INVALID");
}

//way 1
Todo.find({
    _id:id
}).then( (todo)=>{
    console.log("todo-->", todo)
}).catch((e)=>{
    console.log("error-->", e);
})

//way 2
Todo.findOne({
    _id:id
}).then( (todo)=>{
    console.log("todo-->", todo)
}).catch((e)=>{
    console.log("error-->", e);
})


//way 3
Todo.findById(id).then( (todos)=>{
    console.log("find by id-->", todos);
})