const { Router } = require('express')
const express=require('express')
let route=express.Router()

const studentRoutes=require('../controllers/StudentDetails')
const auth=require('../Authentication/auth')

route.get('/getStudent',auth.verifyUser,studentRoutes.getAllStudent)
route.get('/get-student/:id',auth.verifyUser,studentRoutes.getOneStudent)
route.post('/add-student',auth.verifyUser,studentRoutes.StudentDataAdded)
route.post('/added-student',auth.verifyUser,studentRoutes.StudentNewDataAdded)
route.put('/edit-student',auth.verifyUser,studentRoutes.EditedStudentData)
route.delete('/delete-student',auth.verifyUser,studentRoutes.DeleteStudentData)

module.exports=route