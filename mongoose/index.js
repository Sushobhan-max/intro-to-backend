import express from 'express'
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

await mongoose.connect('mongodb://localhost:27017/mytododatabase'); //we can give any name to our database
const app = express()
const port = 3000


app.get('/', (req, res) => {
    const todo = new Todo({
        // title: , // title will take default value as we have not provided any value
        desc: 'this is a sample todo',
        isDone: 1, // we can also use true/ false and 0/1 also store boolean values
        createdAt: 5
    });
    todo.save();
    res.send('Hello World!')

    //     ⭐ RULE of Mongoose Casting
    // Schema Type	What happens if wrong type supplied?
    // String	Almost anything can be cast to string → safe
    // Number	Only numeric values work → wrong value → CastError
    // Boolean	Can convert "true" "false" 1 0 → safe-ish
    // Date	Needs valid date → invalid string → error
    // ObjectId	Needs valid MongoDB ID → invalid → error
})

app.get('/a', async (req,res) => {
    const todo = await Todo.find({}); // to find all todos
    //res.json(todo) // to send json response when useung .find 

    const filteredTodo = todo.map(item => ({
        title: item.title,
        desc: item.desc
    }));

    res.json(filteredTodo); // to send specific field in json response
    // because .find returns an array of objects so we use map to iterate through each object
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
