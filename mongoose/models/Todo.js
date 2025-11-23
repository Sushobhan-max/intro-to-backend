import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, default: 'My Todo Title'},
        desc: String,
        isDone: Boolean,
        createdAt: Number,
    },
    {
        collection: "myTodosCollection" // specify collection name
    }
);

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;