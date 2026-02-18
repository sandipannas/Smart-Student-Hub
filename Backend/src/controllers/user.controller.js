//logical libraries
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//helping functions
import {generateJWT} from "../util/JWT.js"
import {uploadOnCloudinary} from "../util/cloudinary.js" 

//importing models
import User from "../models/authentication/user.model.js";
import Admin from "../models/roles/admin.model.js";
import Student from "../models/roles/student.model.js";
import Institute from "../models/distribution/institute.model.js";

export const registerUserWithInstitute = async (req, res) => {
  const { 
         fullName,          //must
         email,             //must
         password ,         //must
         instituteName ,    //must
         instituteEmail ,   //must
         address ,          //not mandatory
         contactNumber ,    //not mandatory
         website,           //not mandatory
         profilePicture ,   //not mandatory
        } = req.body;

     //declaring a session
     const session = await mongoose.startSession();

  try {
    //starting the transaction
     session.startTransaction();

    //checking the mandatory fields are not null
    if (!fullName || !email || !password || !instituteName || !instituteEmail ) {
      //aborting the transaction
      await session.abortTransaction();
      return res.status(400).json({ //bad Request
        message: "All fields are Required" 
      });
    }

    //checking if the a user with a same email is already present 
    const user = await User.findOne({ email });
    if (user) {
      //aborting the transaction
      await session.abortTransaction();
      return res.status(400).json({ 
        message: "Email is already registered, try to Log In" 
      });
    }

    //hashing the user given password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    
    //Creating the Institute (without a superAdmin yet)
    const [newInstitute] = await Institute.create([{
        instituteName,
        instituteEmail,
        address,
        contactNumber,
        website,
    }],{ session });

    //Creating a new user of role superAdmin in the database
    const [newUser] = await User.create([{
        fullName,
        email,
        password:hashedPassword,
        role:"superAdmin",
        institute:newInstitute._id,
        profilePicture

    }],{ session });

    //Update the Institute with the superAdmin's ID
    newInstitute.superAdmin = newUser._id;
    await newInstitute.save({ session });
 
    //if everything goes well, commiting the transaction
    await session.commitTransaction();

    const token = generateJWT(newUser._id,res)
        
    res.status(201).json({
        id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePicture: newUser.profilePicture,
        role:"superAdmin",
        token: token, // Send token in response body as fallback (browsers sometime block cookies)
        message:"Institute and Super Admin created successfully",
    })

  } catch(error) {

    // Only try to abort if the transaction is still active
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    console.log("error occured during institute and super admin creation",error);
    
    return res.status(500).json({
      message:"problem occured during Account creation"
  })
}
finally{
  //ending the session
  session.endSession();
}
};

export const login = async (req, res) => {

  const { email , password }=req.body;

  try{
    //checking if the user exists
    const userExist = await User.findOne({email});
    
    //if the user does not exist
    if(!userExist){
        return res.status(400).json({ //bad request
            message:"Invalid Credentials"
        })
    }

    //checking if the password is correct
    const passwordCorrect = await bcrypt.compare(password,userExist.password);
    
    //if the password is incorrect
    if(!passwordCorrect){
        return res.status(400).json({ //bad request
            message:"Invalid Credentials"
        })
    }

    //if the user is authenticated:-
    //generating a token
    const token = generateJWT(userExist._id,res);
    
    res.status(200).json({
        id:userExist._id,
        fullName:userExist.fullName,
        email:userExist.email,
        profilePicture:userExist.profilePicture,
        role:userExist.role,
        token: token, // Send token in response body as fallback because some browsers block cookies
        message:"Successfully Loged In"
    })
  }
  catch(error){
    console.log("error occured during login process",error);
    res.status(500).json({
        message:"internal server error"
    })
  }
};

export const logout = (req, res) => {
  try{
    res.cookie("jwt","",{ maxAge:0 });
    return res.status(200).json({ message:"logged out successfully"})
  } catch(error){
    console.log("Error in logout controller",error);
    res.status(500).json({ message:"Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if(req.user.role==="admin"){
      const admin=await Admin.findOne({user:userId})

      if(!admin){
        return res.status(404).json({
          message:"User not found"
        })
      }

      return res.status(200).json({admin})

    }  if(req.user.role==="student"){
      const student=await Student.findOne({user:userId})

      if(!student){
        return res.status(404).json({
          message:"User not found"
        })
      }

      return res.status(200).json({student})
    }  if(req.user.role==="superAdmin"){

      return res.status(200).json({
        message:"superAdmin"
      })
    }
    
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfilePicture = async(req ,res)=>{
   
   // multer middleware will store the file in req.file.buffer
   if (!req.file) {
    return res.status(400).json({ message: "No file was uploaded." });
   }

   let response;

   try {

    response = await uploadOnCloudinary(req.file.buffer,"profile_pictures"); //profile_pictures is the folder name

    //saving the secure URL to the User model
    const user = await User.findById(req.user._id);
    user.profilePicture = response.secure_url;
    await user.save();
    
    return res.status(200).json({
      profilePicture: user.profilePicture, //only sending the profile picture because all the other data is already present
    });
   }

   catch(error){
    console.log("error occured while updating profile picture",error);

     // If the upload succeeded but the DB save failed then delete the file in cloudinary
     if (response) {
      try {
          // Cloudinary files are identified by their public_id
          await cloudinary.uploader.destroy(response.public_id);
      } catch (cleanupError) {
          console.log("failed to clean up the cloudinary file", cleanupError);
      }
    }

    res.status(500).json({
        message:"internal server error"
    })
   }
};

export const updateName = async(req,res)=>{
    const { newFullName } = req.body;
    const userId=req.user._id;
    try{
        if(!newFullName){
            return res.status(400).json({
                message:"new name is required"
            })
        }
    const updatedUser = await User.findByIdAndUpdate(userId,{fullName:newFullName},{new:true}).select('-password');

    //in case user is not present in database
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
  }
    
    //all good sending the updated user data
    res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("problem occured while updating name",error);
        return res.status(500).json({
            message:"internal server error"
        })
    }
};

export const updatePassword = async(req,res)=>{
   const {oldPassword,newPassword} = req.body;
   const userId = req.user._id;
   
   
   
  try{
    if(!oldPassword || !newPassword){
        return res.status(400).json({
            message:'Both old and new password are required'
        })
    }

    const user = await User.findById(userId);
    if(!user){
     return res.status(404).json({
         message:"User not found"
     })
    }
    const password = user.password;

    const passwordCorrect= await bcrypt.compare(oldPassword,password);

    if(!passwordCorrect){
        return res.status(400).json({
            message:"incorrect password"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);
    
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message:"Password updated successfully"
    });
  }
  catch(error){
    console.log("problem occured while updating the password",error);
    return res.status(500).json({
        message : "internal server error"
  })
  }

};

