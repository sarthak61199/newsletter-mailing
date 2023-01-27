import React, { useState } from "react";
import EmailCamp from "../assets/email_camp.svg";
import { addEmail } from "../api";
import toast, { Toaster } from "react-hot-toast";

function SendMail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!handleValidation()) {
      const payload = {
        email,
      };
      const data = await addEmail(payload);
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
    }
  };

  const handleValidation = () => {
    let isError = false;
    let validation = {};
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "" || email.length === 0) {
      validation["email"] = "Email ID is required.";
      isError = true;
    } else if (!emailReg.test(email)) {
      validation["emailValid"] = "Please enter a valid Email ID.";
      isError = true;
    }
    setError(validation);
    return isError;
  };

  return (
    <>
      <Toaster position="top-right" />
      <h1 className="md:text-5xl text-white text-center mb-10 mt-10 text-3xl">
        Join my Newsletter!
      </h1>
      <p className="text-white text-center md:text-xl text-md mb-10">
        Subscribe to my newsletter to get details on the latest technology
        trends and stay upto date with them!
      </p>
      <div className="flex justify-center">
        <img src={EmailCamp} alt="logo" className="h-40 w-40 mb-10" />
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col min-w-2xl gap-5 justify-center bg-white px-10 py-8 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              className={`px-4 py-2 border-solid border-2 ${
                Object.keys(error).length !== 0 && isSubmit
                  ? "border-red-400"
                  : "border-[#386fa4]"
              } outline-none`}
              value={email}
              onChange={handleChange}
            />
            {Object.keys(error).length !== 0 ? (
              <p className="text-sm text-red-400 mt-1 ml-1">
                {error?.["emailValid"] || error?.["email"]}
              </p>
            ) : (
              " "
            )}
          </div>
          <input
            type="submit"
            value="Subscribe"
            className="bg-[#386fa4] text-white px-5 py-2"
          />
        </form>
      </div>
    </>
  );
}

export default SendMail;
