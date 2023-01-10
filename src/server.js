const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const port = 8000

const user_collection1 = require('./userDatabase/userData')
require('./userDatabase/mongoose_connection')


const app = express()

app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(express.json())

let mainfolder = path.join(__dirname,"../")

app.get('/',(req,res)=>{
    res.sendFile(mainfolder+ "/index.html")

})
app.get('/register',(req,res)=>{
    res.sendFile(mainfolder+ "/register.html")
})
app.get('/index',(req,res)=>{
    res.sendFile(mainfolder+ "/index.html")

})
app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+ "/login.html")
})


app.post("/register",(req,res)=>{
    // console.log(req.body);
    const pass = req.body.psw;
    const cfpass = req.body.cfpsw;

    if(pass ==cfpass){
        let req_userdata = new user_collection1(req.body);

        // console.log(req_userdata)
    
        req_userdata.save();
    
        res.sendFile(mainfolder+"/login.html")
    }else{
        res.send("Password is not matching")
    }
   
})

app.post("/login",async(req,res)=>{
    try{
        const email =req.body.email;
        const pass = req.body.psw;
        console.log(`${email} and passwors is ${pass}`)

       const userEmail = await user_collection1.findOne({email:email})
       console.log(userEmail.email)

       console.log(userEmail.psw)
        if(userEmail.psw === pass){
            res.status(201).sendFile(mainfolder+"/index.html")
        }else{
            res.send("invalid login details");
        }

    }catch(error){
        res.status(400).send("invalid login Details")
    }
})


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
