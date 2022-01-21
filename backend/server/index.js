const express = require('express')
const { addNewTodo, getTodosList, deleteTodo, updateTodo } = require('./modules/todo')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// APIs

app.post("/V1/API/todo", (req,res)=>{
    addNewTodo(req,res);
})


app.get("/V1/API/todo", (req,res)=>{
    getTodosList(req,res);
})


app.delete("/V1/API/todo", (req,res)=>{
    deleteTodo(req,res);
})


app.put("/V1/API/todo", (req,res)=>{
    updateTodo(req,res);
})


app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`)
})