const express = require('express')
const { addNewTodo, getTodosList, deleteTodo, updateTodo } = require('./modules/todo')
const app = express()
const port = 8080 
const fs = require('fs');
var cors = require('cors')

const jwt = require('jsonwebtoken');

require('dotenv').config();


app.use(cors())


app.use(function(req,res,next){

  if (req.url==="/V1/API/auth") {
    next();
  }else{
    
  const token = (req.headers.authorization);

  if (token != null) {

    jwt.verify(token, process.env.secret, function(err, decoded) {
      console.log(decoded) // bar

      if (decoded != null) {
        next();
      } else {
        res.send({ message:"session expired." })
      }

    });

    
  }else{
    res.send({ message:"access denied. token is required" })
  }
  }


  
})



var morgan = require('morgan');
const { createAccount, auth } = require('./modules/auth');
app.use(morgan('combined', { stream : fs.createWriteStream('./logs/logs.txt') }))

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



app.post("/V1/API/create-account",(req,res)=>{
  createAccount(req,res);
})

app.post("/V1/API/auth",(req,res)=>{
  auth(req,res);
})


app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`)
})