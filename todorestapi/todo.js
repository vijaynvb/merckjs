import express, { json } from "express";

const app = express();
const PORT = 3000;

let todos =[{
    id: 1,
    task: "learn js",
    desccription: "Study JS",
    status: false
},
{
    id: 2,
    task: "learn Nodejs",
    desccription: "Study Node JS",
    status: false
}]

app.use(json());

app.get("/todos", (req, res) => {
    res.json(todos);
   });

app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) 
        return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
});

app.post("/todos", (req, res) => {
    const newTodo = req.body;
    console.log(newTodo);
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).json(newTodo);
   });

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
   });
   
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1)
        return res.status(404).json({ error: "Todo not found" });
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
   });
   

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
   