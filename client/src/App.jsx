import React from "react";
import { Routes, Route } from "react-router-dom";
import SendMail from "./components/SendMail";
import Compose from "./components/Compose";
import Unsub from "./components/Unsub";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SendMail />}></Route>
      <Route path="/compose" element={<Compose />}></Route>
      <Route path="unsub/:id" element={<Unsub />}></Route>
    </Routes>
  );
}

export default App;
