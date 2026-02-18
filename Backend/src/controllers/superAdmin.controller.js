//logical libraries
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


//helper function
import { generateJWT } from "../util/JWT.js";
import parseCsvBuffer from "../util/parseCsvBuffer.js";

//importing models
import User from "../models/authentication/user.model.js";
import Admin from "../models/roles/admin.model.js";
import Institute from "../models/distribution/institute.model.js";


//getting the admins of the institute of the superAdmin (superAdmin action)
export const getAllAdmins = async (req, res) => {
  const instituteId = req.user.institute;

  try {
    const adminProfiles = await Admin.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $match: {
          "userDetails.institute": new mongoose.Types.ObjectId(instituteId),
        },
      },
      {
        $project: {
          // Exclude the password from the user details
          "userDetails.password": 0,
        },
      },
    ]);

    res.status(200).json(adminProfiles);
  } catch (error) {
    console.log("error occured while getting all admins", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getAllTeachers = async (req, res) => {
}

//adding a new admin (superAdmin action)
export const addAdmin = async (req, res) => {
  const {
    employeeId, //must
    email, //must
    password, //must
    firstName, //must
    lastName, //must
    department, //must
    designation, //must
    dateOfJoining, //must
    experience,
    qualification,
  } = req.body;

  //declaring a session
  const session = await mongoose.startSession();

  try {
    //starting the session
    session.startTransaction();

    //have to add input validation(working on it)

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
          role: "admin",
          institute: req.user.institute,
        },
      ],
      { session }
    );

    //creating the admin
    const [newAdmin] = await Admin.create(
      [
        {
          user: newUser._id,
          adminId: `admin-${employeeId}`,
          department,
          designation,
          dateOfJoining,
          experience,
          qualification,
        },
      ],
      { session }
    );

    //updating the number of admins in the institute
    institute.totalAdmins += 1;
    await institute.save({ session });

    //if everything goes well
    await session.commitTransaction();

    //this is for the superAdmin so we dont need a admin token
    //const token = generateJWT(newUser._id,res);

    res.status(201).json({
      message: "Admin added successfully",
      //token,
      admin: newAdmin, //sending the admin related data
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

    console.log("error occured while adding admin", error);

    return res.status(500).json({
      message: "problem occured while creating admin",
    });
  } finally {
    //ending the session
    session.endSession();
  }
};

//updating an admin (superAdmin action)
export const updateAdmin = (req, res) => {};

//deleting an admin (superAdmin action)
export const deleteAdmin = (req, res) => {};

//superAdmin can add admins in bulk using csv file
export const addAdminsInBulk = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const session = await mongoose.startSession();
  let createdCount = 0;

  try {
    const adminsToAdd = await parseCsvBuffer(req.file.buffer);

    if (adminsToAdd.length === 0) {
      return res.status(400).json({ message: "No data found in the file" });
    }

    session.startTransaction();

    const institute = await Institute.findById(req.user.institute).session(session);
    if (!institute) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Institute not found" });
    }

    for (const adminData of adminsToAdd) {
      // Clean keys and values
      const cleanData = {};
      for (const key in adminData) {
        cleanData[key.trim()] = adminData[key] ? adminData[key].trim() : '';
      }

      const {
        employeeId,
        email,
        password,
        fullName,
        department,
        designation,
        dateOfJoining,
        experience,
        qualification,
      } = cleanData;

      console.log(cleanData)

      // Validate mandatory fields
      if (![employeeId, email, password, fullName, department, designation, dateOfJoining].every(v => v !== '')) {
        throw new Error(`Invalid data in CSV for email: ${email}. All mandatory fields are required.`);
      }

      // Convert date and experience
      const parsedDate = new Date(dateOfJoining.split('-').reverse().join('-')); // DD-MM-YYYY -> YYYY-MM-DD
      const expNum = Number(experience);
      if (isNaN(parsedDate.getTime())) throw new Error(`Invalid date format for email: ${email}`);
      if (isNaN(expNum) || expNum < 0) throw new Error(`Invalid experience for email: ${email}`);

      const existingUser = await User.findOne({ email }).session(session);
      if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await User.create(
        [{ email, password: hashedPassword, fullName, role: "admin", institute: req.user.institute }],
        { session }
      );

      await Admin.create(
        [{
          user: newUser._id,
          adminId: `admin-${employeeId}`,
          department,
          designation,
          dateOfJoining: parsedDate,
          experience: expNum,
          qualification,
        }],
        { session }
      );

      createdCount++;
    }

    institute.totalAdmins += createdCount;
    await institute.save({ session });

    await session.commitTransaction();

    return res.status(201).json({ 
      message:"Admins added successfully",
      createdCount,
      totalAdmins:institute.totalAdmins
     });

  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    console.log("error occurred while adding admins in bulk:", error);
    return res.status(500).json({ message: error.message || "Problem occurred while adding admins in bulk" });
  } finally {
    session.endSession();
  }
};

