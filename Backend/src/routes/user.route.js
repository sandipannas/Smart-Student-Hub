import express from "express";
import authJWT from "../middlewares/auth.middleware.js";
import { 
    registerUserWithInstitute,
    login,
    updateName,
    updateProfilePicture,
    updatePassword,
    getCurrentUser,
    logout
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";


const router = express.Router();


router.get('/user/me',authJWT,getCurrentUser);
//a user can get their own profile information

router.post('/user/register',registerUserWithInstitute);
//a user will register an institute as well as become a super admin of that institute 

router.post('/user/login',login);
//a user can login to their account

router.put('/user/update_profilePicture',authJWT,upload.single('profilePicture'),updateProfilePicture);
//a user can update their profile picture

router.put('/user/update_name',authJWT,updateName);
//a user can update their name

router.put('/user/update_password',authJWT,updatePassword);
//a user can update their password

router.post('/user/logout',authJWT,logout);
//a user who is logged in  can logout from their account
export default router;