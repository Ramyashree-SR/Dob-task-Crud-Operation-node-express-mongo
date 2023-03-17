const mongoose=require('mongoose')

let schema=mongoose.Schema

const userSchema=new schema({
    firstName:{
        type:String,
        minLength:8,
        maxLength:200
    },
    lastName:{
        type:String,
        minLength:5,
        maxLength:200
    },
    email:{
        type:String,
        minLength:10,
        maxLength:200,
        required:true,
    },
    password:{
        type:String,
        minLength:6,
        maxLength:100
  
  }
},{timeStamp:true})

module.exports=mongoose.model('userCollection',userSchema)