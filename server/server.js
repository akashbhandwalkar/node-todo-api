var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User')

var app = express();
app.use(bodyParser()); //middleware convert string req.body to json


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

app.listen(3000, ()=>{
    console.log("Server started on 3000!");
});

module.exports = {
    app
}