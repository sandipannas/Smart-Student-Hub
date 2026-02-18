import express from "express"
import authJWT from "../middlewares/auth.middleware.js";
import { addStudent,addStudentsInBulk } from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/authRole.middleware.js";
import upload from "../middlewares/multer.middleware.js";

//Update the route if required accordingly

const router=express.Router();

//router.get("/get_all_students",authJWT,authAdmin,getStudents)

router.post("/add_students",authJWT,addStudent)
router.post("/addStudentsInBulk",authJWT,upload.single("file"),addStudentsInBulk);

//router.get("/details",authJWT,authAdmin,getDetails)//created to get all details about admin to display on frontend

//router.delete("/delete_students",authJWT,authAdmin,deleteStudents)

//router.put("/update_students",authJWT,authAdmin,getStudents)

//router.put("/validate_certificates",authJWT,authAdmin,verifyCertificates)

//router.post("/create_attendence",authJWT,authAdmin,createAttendence)

//router.post("/create_event",authJWT,authAdmin,createEvent)

//router.put("/update_event",authJWT,authAdmin,updateEvent)

//router.delete("/delete_event",authJWT,authAdmin,deleteEvent)

//router.get("/get_all_pending_validation",authJWT,authAdmin,allPendingValidation)

//router.get("/get_all_classes",authJWT,authAdmin,allClasses)

export default router;