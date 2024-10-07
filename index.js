import express from "express";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/war", (req, res) => {
  res.send("hello world");
});
app.post("/message", async (req, res) => {
  const { name, email } = req.body;
  try {
    // Gmail SMTP transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "austinedavid96@gmail.com",
        pass: process.env.Gmailpassword, // Use an app-specific password
      },
    });

    // handlebars option
    const handlebarOptions = {
      viewEngine: {
        defaultLayout: false,
      },
      viewPath: "views",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const messageObject = {
      from: "austinedavid96@gmail.com", // sender address
      to: [email], // list of receivers
      subject: "Hello ✔", // Subject line
      template: "resetpass",
      context: {
        name,
      },
    };

    transporter.sendMail(messageObject, (error, info) => {
      if (error) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(200).json({ message: info.messageId });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log("app is running now");
});
