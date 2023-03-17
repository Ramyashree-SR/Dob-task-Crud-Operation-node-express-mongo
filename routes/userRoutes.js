const express=require('express')
let route=express.Router()

const userRoute=require('../controllers/userDetails')
// const auth=require('../Authentication/auth')

route.post('/register',userRoute.register)
route.post('/login',userRoute.login)


module.exports=route