import express from "express";
import dotenv from "dotenv";
import { ResetPassword } from "./controllers/resetpassword.js";
dotenv.config();
import { SingleMessage } from "./controllers/singleteacher.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/message", ResetPassword);
app.post("/message-to-singleTeacher", SingleMessage);

app.listen(PORT, () => {
  console.log("app is running now");
});
