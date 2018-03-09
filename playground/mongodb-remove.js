const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/User');
const {  ObjectID } = require('mongodb');

var id ="5aa2388864f70cb825853953";

if(!ObjectID.isValid(id)){
    return console.log("ID INVALID");
}

//remove all 
Todo.remove().then( (todo)=>{
    console.log("todo-->", todo)
}).catch((e)=>{
    console.log("error-->", e);
})

//remove one of given condition 
Todo.findOneAndRemove().then( (todo)=>{
    console.log("todo-->", todo)
}).catch((e)=>{
    console.log("error-->", e);
})

//find and remove
Todo.findByIdAndRemove(id).then( ()=>{

})
.catch((e)=>{
    console.log("error-->", e);
})


