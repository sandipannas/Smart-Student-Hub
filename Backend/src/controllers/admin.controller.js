//logical libraries
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

//helping fuctions
import parseCsvBuffer from "../util/parseCsvBuffer.js";

//importing models
import Institute from "../models/distribution/institute.model.js";
import User from "../models/authentication/user.model.js";
import Student from "../models/roles/student.model.js";
import Admin from "../models/roles/admin.model.js";

// adding a new student (admin action)
export const addStudent = async (req, res) => {
  const {
    email, //must
    password, //must
    studentId, //must
    firstName, //must
    lastName, //must
    address,
    contact,
    parentName,
    parentContact,
    department, //must
    dateOfBirth, //must
    course, //must
    semester,
    batch, //must
    gender, //must
    bloodGroup,
  } = req.body;

  //declaring a session
  const session = await mongoose.startSession();

  try {
    //starting the session
    session.startTransaction();

    //have to add input validation(working on it)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !studentId ||
      !department ||
      !dateOfBirth ||
      !course ||
      !batch ||
      !gender
    ) {
      //aborting the transaction
      await session.abortTransaction();
      return res.status(400).json({
        //bad Request
        message: "All fields are Required",
      });
    }

    //finding the institute
    const institute = await Institute.findById(req.user.institute).session(
      session
    );

    //if institute does not exist
    if (!institute) {
      //rolling back the transaction
      session.abortTransaction();

      return res.status(404).json({
        message: "Institute not found",
      });
    }

    //finding if a user with the same email exists or not
    const existingUser = await User.findOne({ email }).session(session);

    //if user exists
    if (existingUser) {
      //rolling back the transaction
      session.abortTransaction();

      return res.status(400).json({
        email: existingUser.email,
        message: "user already exists",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //trimming the firstName and lastName into fullName
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    //creating the user
    const [newUser] = await User.create(
      [
        {
          email,
          password: hashedPassword,
          fullName,
          role: "student",
          institute: req.user.institute,
        },
      ],
      { session }
    );

    //creating the admin
    const [newStudent] = await Student.create(
      [
        {
          user: newUser._id,
          studentId,
          semester,
          department,
          batch,
          dateOfBirth,
          address,
          contact,
          parentName,
          parentContact,
          gender,
          bloodGroup,
          course,
          trackedBy: [req.user._id],
        },
      ],
      { session }
    );

    //updating the number of students in the institute
    institute.totalStudents += 1;
    await institute.save({ session });

    //if everything goes well
    await session.commitTransaction();

    //this is for the admin so we dont need a student token
    //const token = generateJWT(newUser._id,res);

    res.status(201).json({
      message: "Student added successfully",
      //token,
      student: newStudent, //sending the admin related data
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      }, //sending the user related data
    });
  } catch (error) {
    // Only try to abort if the transaction is still active
    if (session.inTransaction()) {
      session.abortTransaction();
    }

    console.log("error occured while adding student", error);

    return res.status(500).json({
      message: "problem occured while creating student try again",
    });
  } finally {
    //ending the session
    session.endSession();
  }
};

//adding students in bulk (admin action)
export const addStudentsInBulk = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const session = await mongoose.startSession();
  let createdCount = 0;

  try {
    const studentsToAdd = await parseCsvBuffer(req.file.buffer);

    if (studentsToAdd.length === 0) {
      return res.status(400).json({ message: "No data found in the file" });
    }

    session.startTransaction();

    const institute = await Institute.findById(req.user.institute).session(
      session
    );
    if (!institute) {
      session.abortTransaction();
      return res.status(404).json({ message: "Institute not found" });
    }

    for (const studentData of studentsToAdd) {
      const cleanData = {};
      for (const key in studentData) {
        cleanData[key.trim()] = studentData[key] ? studentData[key].trim() : "";
      }

      const {
        email, //must
        password, //must
        studentId, //must
        fullName, //must
        address,
        contact,
        parentName,
        parentContact,
        department, //must
        dateOfBirth, //must
        course, //must
        semester,
        batch, //must
        gender, //must
        bloodGroup,
      } = cleanData;

      //have to add input validation(working on it)
      if (
        !fullName ||
        !email ||
        !password ||
        !studentId ||
        !department ||
        !dateOfBirth ||
        !course ||
        !batch ||
        !gender ||
        !parentName ||
        !parentContact
      ) {
        //aborting the transaction
        await session.abortTransaction();
        return res.status(400).json({
          //bad Request
          message: "All fields are Required",
        });
      }

      const existingUser = await User.findOne({ email }).session(session);

      if (existingUser) {
        session.abortTransaction();
        return res.status(400).json({
          email: existingUser.email,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const [newUser] = await User.create(
        [
          {
            email,
            password: hashedPassword,
            fullName,
            role: "student",
            institute: req.user.institute,
          },
        ],
        { session }
      );
      //dateOfBirth was of string type and in the Db it was of Date type hence the issue
      function parseDateString(dateStr) {
        // dateStr = "13-09-2004"
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed
      }

      const dob = parseDateString(dateOfBirth);

      const [newStudent] = await Student.create(
        [
          {
            user: newUser._id,
            studentId,
            semester,
            department,
            batch,
            dateOfBirth: dob,
            address,
            contact,
            parentName,
            parentContact,
            gender,
            bloodGroup,
            course,
            trackedBy: [req.user._id],
          },
        ],
        { session }
      );
      createdCount++;
    }

    institute.totalStudents += createdCount;
    await institute.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Students added successfully",
      createdCount,
      totalStudents: institute.totalStudents,
    });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    console.log("error occured while adding students", error);
    return res.status(500).json({
      message: "problem occured while creating students try again",
    });
  } finally {
    session.endSession();
  }
};

//to get details of admin
{
  /*export const getDetails=async(req,res)=>{
    const adminId=req.user.id;
    console.log(adminId)
    try{
      const admin=await Admin.findOne({user:adminId})
      if(!admin){
        return res.status(404).json({
          message: "Admin not found"
          })
          }
          
          return res.status(200).json({admin})
          } catch(err){
            console.log("error occured while getting details", err);
            
            return res.status(500).json({
              success: false,
              message: "Problem occurred while getting details",
              error: err.message
              });
              } 
              };*/
}
