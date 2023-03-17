const mongoose=require('mongoose')
let schema=mongoose.Schema

const StudentSchema=new schema({
    name:{
        type:String,
        minLength:5,
        maxLength:15
    },
    section:{
       type:String,
       minLength:1,
       maxlength:10
    },
    rollNo:{
        type:Number,
        min:5,
        max:100000000
    },
    extraCuricular:{
        type:String,
        minLength:5,
        maxLength:200
    },
    email:{
        type:String,
        minLength:10,
        maxLength:200
    }
})

module.exports=mongoose.model('userDetails',StudentSchema)