import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forgotpassword = () => {
  let navigate = useNavigate();
  const auth = getAuth();

  let [email, setEmail] = useState("");
  let [emailError, setEmailError] = useState("");
  let emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
  let handleEmail = (em) => {
    setEmail(em.target.value);
    setEmailError("");
  };

  let handleClick = () => {
    if (!email) {
      setEmailError("Email is required");
    } else {
      if (!emailRegex.test(email)) {
        setEmail("");
        setEmailError("Invalid email");
      }
    }
    if (emailError) {
      setEmail("");
    }
    if (email && emailRegex.test(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmail("");
          toast.success("Check email for reset your password");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setEmail("");
            setEmailError("Email address does not match");
          }
        });
    }
  };
  return (
    <div className="bg-[#F0F2F5] h-screen">
      {/* Logo part here */}
      <ToastContainer />
      <div className="flex justify-center pt-[150px]">
        <picture>
          <img
            className="w-[300px] "
            src="images/cochatus.png"
            alt="logo"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Input part here */}
      <div className="flex justify-center ">
        <div className="px-8 bg-white shadow-xl rounded-[15px]">
          <div className=" mt-8">
            <h2 className="font-opensans font-bold text-[#03014C] text-[25px] mb-1 ">
              Reset Your Password
            </h2>
            <p className=" w-[518px] font-nunito font-normal text-[20px] text-black opacity-80">
              Please enter your email address and reset your password.
            </p>
            <div className="mt-8">
              {emailError ? (
                <input
                  className=" border-[1.72px] border-solid rounded-lg border-red-600 w-[518px] h-20 pl-[52px] font-nunito font-semibold text-red-600 text-xl outline-none  mb-8  placeholder:text-red-600"
                  type="email"
                  value={email}
                  placeholder={emailError}
                  onChange={handleEmail}
                />
              ) : (
                <input
                  className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-[518px] border-opacity-[0.3] h-20 pl-[52px] font-nunito font-semibold text-[#11175D] text-xl outline-1 outline-primary mb-8"
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={handleEmail}
                />
              )}

              <div className="flex flex-row justify-end mb-11">
                <Link
                  to="/login"
                  className=" px-[20px] py-[10px] text-[#4B4F56] bg-[#E4E6EB] rounded-[6px]  font-nunito font-bold text-[20.64px]"
                >
                  Cancle
                </Link>

                <button
                  className=" px-[20px] py-[10px] ml-5  bg-primary rounded-[6px]  font-nunito font-regular text-[20.64px] text-white"
                  onClick={handleClick}
                >
                  Reset password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
