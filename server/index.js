import express from "express";
import cors from "cors";
import { addMail } from "./controllers/addMail.js";
import { sendMail } from "./controllers/sendMail.js";
import { unsub } from "./controllers/unsub.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/addMail", addMail);
app.post("/sendMail", sendMail);
app.delete("/unsub", unsub);

app.listen(3001, () => {
  console.log("connected to server");
});
