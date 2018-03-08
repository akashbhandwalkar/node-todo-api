var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodoApp");

var Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required:true,
        minLength:1,
        trim: true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then((result)=>{
//     console.log("saved todo", result);
    
// })
// .catch((error)=>{
//     console.log("unable to save todo", error);
// });

var anotherTodo = new Todo({
    text: ' Hello Hunny'
});


anotherTodo.save()
    .then((result)=>{
        console.log("saved==>", result);
    })
    .catch((error)=>{
        console.log("unable to save becasue  --> ", error);
    })