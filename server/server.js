var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User')
var  { ObjectID } = require('mongodb');
var app = express();
app.use(bodyParser()); //middleware convert string req.body to json
const port = process.env.PORT || 3000;

//Create Todos
app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save()
        .then((result)=>{
            res.status(200).send(result)
        })
        .catch((error)=>{
            res.status(400).send(error);
        })
});

//get Todos
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.status(200).send(todos);
    },(e)=>{
        res.status(400).send(e);
    });
})

//get todos by id
app.get('/todos/:id', (req, res)=>{
    console.log("params-->", req.params);
    if(ObjectID.isValid(req.params.id)){

        Todo.findById(req.params.id).then( (docs)=>{
            if(docs){
                res.status(200).send(docs)
            }else{
                res.status(404).send("No Todo");
            }
        }).catch((e)=>{
            res.status(404).send(e);
        })
    }else{
        res.status(404).send("Not valid object id");
    }
})

app.delete('/todos/:id', (req, res)=>{
   var id = req.params.id;
   if(!ObjectID.isValid(id)){
        res.status(404).send({error:"Invalid ID"});
   }
  Todo.findByIdAndRemove(id)
   .then((res)=>{
       if(!res){
            res.status(404).send();
       }
       res.status(200).send(res)
   }).catch((e)=>{
       res.status(500).send(e);
   })
})

app.listen(port, ()=>{
    console.log("Server started on 3000!");
});

module.exports = {
    app
}