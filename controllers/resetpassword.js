import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export const ResetPassword = async (req, res) => {
  const { name, link, email } = req.body;
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
      subject: "SchooledAfrika Reset Password", // Subject line
      template: "resetpass",
      context: {
        name,
        link,
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
