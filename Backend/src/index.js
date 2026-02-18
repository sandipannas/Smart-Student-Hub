import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import superAdminRoute from "./routes/superAdmin.route.js";
import adminRoute from "./routes/admin.route.js";
//import studentRoute from './routes/student.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cognitive-campus.onrender.com"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "api is working",
  });
});

app.use("/api/auth", userRoute);
app.use("/api/actions/superAdmin", superAdminRoute);
app.use("/api/actions/admin", adminRoute);
//app.use('/api/actions/student',studentRoute) work in progress

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
