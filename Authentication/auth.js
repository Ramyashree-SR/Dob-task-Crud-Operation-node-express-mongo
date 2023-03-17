const jwt = require('jsonwebtoken')

let verifyUser = (req, res,next) => {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ")[1]
        let payload=jwt.verify(token,process.env.SECRET_KEY)
        if(payload.email==="email"){
            next()
        }else{
            // res.json({
            //     error:true,
            //     message:"authorized",
            //     data:null
            // })
            next()
        }
    }else{
        res.json({
            error:true,
            message:"not authorized",
            data:null
        })
    }
}

module.exports={
    verifyUser 
}
