import express from "express";
import dotenv from "dotenv";
import { ResetPassword } from "./controllers/resetpassword.js";
dotenv.config();
import { SingleMessage } from "./controllers/singleteacher.js";
import { createCourse } from "./controllers/courses.js";
import multer from "multer";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/message", ResetPassword);
app.post("/message-to-singleTeacher", SingleMessage);
app.post("/courses", multer().none(), createCourse);
app.get("/testing", (req, res) => {
  return res.send("hello world!!!");
});

app.listen(PORT, () => {
  console.log("app is running now");
});
