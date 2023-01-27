import React, { useState } from "react";
import { sendMail } from "../api";
import toast, { Toaster } from "react-hot-toast";

function Compose() {
  const [emailContent, setEmailContent] = useState("");
  const handleChange = (e) => {
    setEmailContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      emailContent,
    };
    const data = await sendMail(payload);
    console.log(data);
    if (!data.error) {
      toast.success(data.message, {
        iconTheme: {
          primary: "#386fa4",
          secondary: "#fff",
        },
      });
    } else {
      toast.error(data.message, {
        iconTheme: {
          primary: "#F8719D",
          secondary: "#fff",
        },
      });
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      <h1 className="md:text-5xl text-white text-center mb-10 mt-10 text-3xl">
        Compose an Email
      </h1>
      <div className="flex max-w-[1220px] h-[650px] justify-center mx-auto my-0 gap-5">
        <form className="flex-1">
          <textarea
            name="emailContent"
            className="w-full h-full p-4 border-solid border-2 border-[#386fa4] outline-none, text-xl"
            style={{ fontFamily: "monospace" }}
            value={emailContent}
            onChange={handleChange}
          />
        </form>
        <aside
          className="flex-1 bg-[#386fa4] text-white overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: emailContent }}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#386fa4] text-white px-5 py-2 flex mx-auto mt-10"
      >
        Send Email!
      </button>
    </>
  );
}

export default Compose;
