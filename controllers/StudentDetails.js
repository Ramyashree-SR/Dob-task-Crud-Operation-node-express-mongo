let studentData=require('../models/StudentSchema')


let getAllStudent=async(req,res,next)=>{
  if(req.headers['authorization']){  
      try{
       let dataOfStudent=await studentData.find().lean()
       res.json({
          error:false,
          message:"Data of All The student",
          data:dataOfStudent
        })
      }
      catch(err){
        next(err)
    }
  }
    else{
      res.json({
        error:false,
        message:"Login Again",
        data:null
      })
    }
  }

  let getOneStudent=async(req,res,next)=>{
    if(req.headers['authorization']){  
        try{
         let dataOfStudent=await studentData.findById(req.params.id).lean()
          res.json({
            error:false,
            message:"Data of one The student",
            data:dataOfStudent
          })
        }
      catch(err){
          next(err)
      }
    }
      else{
        res.json({
          error:false,
          message:"Login Again",
          data:null
        })
      }
    }
  

let StudentDataAdded=async(req,res,next)=>{
  if(req.headers['authorization']){  
    let {name,section,rollNo,extraCuricular,email}=req.body
    
    try{
   await studentData.insertMany([{name,section,rollNo,extraCuricular,email}])
    res.json({
      error:false,
      message:"New Data of The student",
      data:null
    })
  
  }catch(err){
    console.log(err);
   next(err)
}
  
}
else{
  res.json({
    error:false,
    message:"Login Again",
    data:null
  })
}
}

let StudentNewDataAdded=async(req,res,next)=>{
  if(req.headers['authorization']){  
    let {name,section,rollNo,extraCuricular,email}=req.body
    try{
   const student=await studentData.findOne({email:req.body.email})
   if(student){
    console.log(student);
    return res.json({
      success:false,
      message:"Student Already exists with the Email",
      data:student
    });
  
}else{
   let newData=await studentData.insertMany({name,section,rollNo,extraCuricular,email})
   res.json({
    success:true,
    message:"New Data of The student",
    data:{name,section,rollNo,extraCuricular,email}
  })
}
}catch(err){
    console.log(err);
   next(err)
}
  }
else{
  res.json({
    error:false,
    message:"Login Again",
    data:null
  })
}
}

  let EditedStudentData=async(req,res,next)=>{
    if(req.headers['authorization']){  
     let {_id,name,section,rollNo,extraCuricular,email}=req.body
    try{
        await studentData.updateOne({_id:_id},{
            $set:{
                name,
                section,
                rollNo,
                extraCuricular
            }
        })
        res.json({
          error:false,
          message:"Student Data edited Sucessfully",
          data:{name,section,rollNo,extraCuricular,email}
        })
    }catch(err){
      console.log(err);
        next(err)
    }
  }
  
    else{
      res.json({
        error:false,
        message:"Login Again",
        data:null
      })
    }
  }
  
  

  let DeleteStudentData=async(req,res,next)=>{
    if(req.headers['authorization']){  
    try{
      await studentData.deleteOne({_id:req.body._id})
         res.json({
           error:false,
           message:"Student Data is Deleted Sucessfully",
           data:null
         })
    }catch(err){
        next(err)
    }
  }else{
    res.json({
      error:false,
      message:"Login Again",
      data:null
    })
  }
  }



  module.exports={
    getOneStudent,
    getAllStudent,
    StudentDataAdded,
    StudentNewDataAdded,
    EditedStudentData,
    DeleteStudentData
  }