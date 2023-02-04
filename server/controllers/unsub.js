import { db } from "../db.js";

export const unsub = async (req, res) => {
  const { id } = req.body;
  db.query("SELECT * FROM `emails` WHERE id = ?", [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: true, message: "Something went wrong" });
    if (result.length === 0)
      return res.status(409).json({
        error: false,
        message: "You have already unsubscribed from our Newsletter.",
      });
    db.query("DELETE from emails WHERE id = ?", [id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: true, message: "Something went wrong" });
      return res.status(200).json({
        error: false,
        message:
          "You have successfully unsubscribed. Hope to see you in future 😔",
      });
    });
  });
};
