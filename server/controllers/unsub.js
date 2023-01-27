import { db } from "../db.js";

export const unsub = async (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM `emails` WHERE id = ?", [id], (err) => {
    if (!err) {
      res.status(202).json({ error: false, message: "Unsubscribed" });
    }
  });
};
