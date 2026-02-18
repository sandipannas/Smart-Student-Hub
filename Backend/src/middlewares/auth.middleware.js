import jwt from 'jsonwebtoken'
import User from '../models/authentication//user.model.js'


const authJWT =async (req,res,next)=>{

   try{
    
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.jwt;
    

    //if token is not found in cookies, try to get it from Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    //if token is not found in cookies or Authorization header
    if(!token){
        return res.status(401).json({
            message:"Unauthorized user"
        })
    }

    //verifying the token
    const decoded = jwt.verify(token,process.env.JWT_PASSWORD);

    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");
    
    //if user is not found
    if(!user){
        return res.status(404).json({message:"unauthorized user"});
    }
    req.user=user;
    next();
   }
   catch(error){
    console.log("failed to authenticate",error)
    return res.status(401).json({
        message:"failed to authenticate"
    })
   }
}

export default authJWT;
