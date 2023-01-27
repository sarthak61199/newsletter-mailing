import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const addMail = (req, res) => {
  const { email } = req.body;
  const id = uuidv4();
  db.query("INSERT INTO `emails` VALUE (?, ?)", [id, email], (err) => {
    if (err) {
      res.json({ error: true, message: "Something went wrong." });
    } else {
      res.json({ error: false, message: "Email added successfully!" });
    }
  });
};
