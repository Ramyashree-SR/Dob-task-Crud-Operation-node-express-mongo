const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userAsStudent=require('../models/userSchema')

let register = async (req, res, next) => {
    let { firstName, lastName, email, password} = req.body
    try {
        let emailExists = await userAsStudent.findOne({ email: email })
        if (emailExists) {
            res.status(401).json({
                error: true,
                message: "Email already exists",
                data: null
            })
        } else {
            let saltRounds = 10;
            //salting
            let salt = await bcrypt.genSalt(saltRounds)
            // console.log("salt",salt);
            let hashedPassword = await bcrypt.hash(password, salt)
            // console.log("hashedPassword",hashedPassword);

            await userAsStudent.insertMany([{ firstName, lastName, email, password: hashedPassword}])

            res.status(200).json({
                error: false,
                message: "User registered successfully",
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}

let login=async(req,res,next)=>{
    let{email,password}=req.body
    try{
      let userData=await userAsStudent.findOne({email:email}).lean()
       if(userData){
        let{firstName,lastName,email}=userData
        isPasswordMatch=await bcrypt.compare(password,userData.password)
        if(isPasswordMatch){
            let payload={firstName,lastName,email}
            let token=jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'10h'
            })
            res.status(200).json({
                error:false,
                message:"Login Successfull",
                data:{
                    firstName,lastName,email,token
                }
            })
        }else{
            res.status(400).json({
                error:false,
                message:"Invalid Password",
                data:null
            })
        }
        }else{
            res.status(400).json({
                error:false,
                message:"Email ID Does not Exist ,Please create an Account",
                data:null
            })
        }
    }
    catch(err){
        console.log(err);
        next(err)
    }
}

// const verify = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
  
//       jwt.verify(token, "mySecretKey", (err, userData) => {
//         if (err) {
//           return res.status(403).json("Token is not valid!");
//         }
  
//         req.userData = userData;
//         next();
//       });
//     } else {
//       res.status(401).json("You are not authenticated!");
//     }
//   };

module.exports={
    register,
    login,
   
}