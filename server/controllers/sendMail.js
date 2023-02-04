import handlebars from "handlebars";
import { db } from "../db.js";
import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

export const sendMail = async (req, res) => {
  const { emailContent } = req.body;
  const template = handlebars.compile(emailContent);
  db.query("SELECT * from `emails`", (err, results) => {
    if (err) {
      res.status(500).json({ error: false, message: "Something went wrong" });
      return;
    } else if (results.length !== 0) {
      results.forEach((item) => {
        const replacements = {
          unsubLink: `http://localhost:5173/unsub/${item.id}`,
        };
        const emailToSend = template(replacements);
        const msg = {
          to: item.email,
          from: "donotreplynewsletter57@gmail.com",
          subject: "Newsletter - January, 2023",
          html: emailToSend,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      });
      res
        .status(200)
        .json({ error: false, message: "Email sent Successfully!" });
      return;
    } else {
      res
        .status(202)
        .json({ error: false, message: "No users to send email to" });
      return;
    }
  });
};
