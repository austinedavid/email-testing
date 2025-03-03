import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export const SingleMessage = async (req, res) => {
  const { subject, message, email } = req.body;
  try {
    // Gmail SMTP transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.senderAddress,
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
      subject, // Subject line
      template: "singleteacher",
      context: {
        message,
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
};
