const express=require("express")
const app=express()
const loginroute=require("./login")
const fs=require("fs")

const bodyparser = require("body-parser")
const router = require("./login")




app.use(bodyparser.urlencoded({ extended: true }))



app.use("/login", (req, res, next) => {
  res.send(
    `
    <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
    <input type="text" name="username" id="username" placeholder="Enter your username">
    <button type="submit">Login</button>
  </form>
  `    
)
})



app.post(`/`,(req,res)=>{
  const message=req.body.message
  const username=req.body.username
 
 
  fs.appendFile("messages.txt",` \n ${username}:${message}`,(err)=>{
 
   err?console.log(err):res.redirect("/")
  })
 })


 app.use("/",(req,res)=>{

  fs.readFile("messages.txt",(err,data)=>{
    if (err) {
      console.log(err);
      data="no chats"
    }

    res.send(`${data} <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
  <input type="text" id="message" name="message" placeholder="Enter your message">
  <input type="hidden" id="username" name="username">

  <button type="submit">Send</button>
</form>`) 

  })

  
})


app.listen(3000)

