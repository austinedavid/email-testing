import express from "express";
import dotenv from "dotenv";
import { ResetPassword } from "./controllers/resetpassword.js";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/message", ResetPassword);

app.listen(PORT, () => {
  console.log("app is running now");
});
