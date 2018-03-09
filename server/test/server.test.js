const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { ObjectID } = require('mongodb');
const { Todo } = require('./../models/Todo');

var _todos = [{
    _id: new ObjectID(),
    text:"Akash"
},{
    _id: new ObjectID(),    
    text:"Vivek"
}];

const LENGTH = _todos.length;

beforeEach((done)=>{
    Todo.remove({}).then( ()=>{
       Todo.insertMany(_todos)
        .then((docs)=>{
            done();
        })
    })
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = "Test todo test";
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text:text})
                    .then((todos)=>{
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((e)=>{
                        done(e);
                    })
            })

    });

    it('should not create a new todo', (done)=>{
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(LENGTH);
                    done();
                }).catch((e)=>{done(e)})
            })
    })
});

describe('GET /todos', ()=>{

    it('should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /todos/:id', ()=>{
    
        it('should return todo back', (done)=>{
            request(app)
                .get(`/todos/${_todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.text).toBe(_todos[0].text);
                })
                .end(done);
        });

        it('should return invalid id', (done)=>{
            request(app)
                .get('/todo/1')
                .expect(404)
                .end(done)
        })

        it('should return null', (done)=>{
            request(app)
                .get("/todos/5aa24165c2c2aac2440a92ej")
                .expect(404)
                .expect((res)=>{
                    if(!res){
                        return done();
                    }
                })
                .end(done);
        })
    })