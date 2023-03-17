const express=require('express')
const app=express()
require('dotenv').config()
require('./config/database')
const port=process.env.PORT||8000

 let studentdetails=require('./routes/StudentRoutes')
 let userDatas=require('./routes/userRoutes')
 app.use(express.urlencoded({extended:true}))
 app.use(express.json())
 app.use('/StudentDatabase',studentdetails)
 app.use('/userDatabase',userDatas)


 let date=new Date()
 console.log(date);

app.use((err,req,res,next)=>{
    res.status(500)
    res.json({
        err:true,
        message:err.message,
        data:null
    })

    
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})