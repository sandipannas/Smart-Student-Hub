import express from "express";
import authJWT from "../middlewares/auth.middleware.js";
import {authSuperAdmin} from "../middlewares/authRole.middleware.js";
import {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  addAdminsInBulk
} from "../controllers/superAdmin.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();


router.get("/getAllAdmins",authJWT,getAllAdmins);

router.post("/addAdmin",authJWT,addAdmin);

router.post("/addAdminsInBulk",authJWT,upload.single("file"),addAdminsInBulk);

router.put("/updateAdmin",authJWT,updateAdmin);

router.delete("/deleteAdmin",authJWT,deleteAdmin);



export default router;
