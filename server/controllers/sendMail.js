import handlebars from "handlebars";
import { transporter } from "../mailConfig.js";
import { db } from "../db.js";

export const sendMail = async (req, res) => {
  const { emailContent } = req.body;
  const template = handlebars.compile(emailContent);
  db.query("SELECT * from `emails`", (err, results) => {
    if (err) {
      res.status(500).json({ error: false, message: "Something went wrong" });
      return;
    } else if (results.length !== 0) {
      results.forEach(async (item) => {
        const replacements = {
          unsubLink: `http://localhost:5173/unsub/${item.id}`,
        };
        const emailToSend = template(replacements);
        await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>',
          to: item.email,
          subject: "Newsletter - January, 2023",
          html: emailToSend,
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
