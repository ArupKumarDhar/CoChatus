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
      <div className="flex justify-center pt-[100px] tablet:pt-[50px] laptop:pt-[100px] desktop:pt-[150px]">
        <picture>
          <img
            className=" w-[150px] laptop:w-[200px] desktop:w-[300px] "
            src="images/cochatus.png"
            alt="logo"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Input part here */}
      <div className="flex justify-center px-2.5 laptop:px-0  ">
        <div className=" mt-[30px] tablet:mt-[15px] laptop:mt-0 px-8 bg-white shadow-xl rounded-[15px]">
          <div className="  mt-8">
            <h2 className="font-opensans font-bold text-[#03014C] desktop:text-[25px] mb-1 ">
              Reset Your Password
            </h2>
            <p className="  desktop:w-[518px] font-nunito font-normal desktop:text-[20px] text-black opacity-80">
              Please enter your email address and reset your password.
            </p>
            <div className="mt-8">
              {emailError ? (
                <input
                  className=" border-[1.72px] border-solid rounded-lg border-red-600 w-full laptop:w-[414px] py-[10px] laptop:py-[15px] desktop:w-[518px] desktop:h-20 px-[20px] laptop:px-[52px] font-nunito font-regular text-red-600 desktop:text-xl outline-none  mb-8  placeholder:text-red-600"
                  type="email"
                  value={email}
                  placeholder={emailError}
                  onChange={handleEmail}
                />
              ) : (
                <input
                  className=" border-[1.72px] border-solid rounded-lg border-[#11175D] py-[10px] w-full laptop:w-[414px] laptop:py-[15px] desktop:w-[518px] border-opacity-[0.3] desktop:h-20 px-[20px] laptop:px-[52px] font-nunito font-regular text-[#11175D] desktop:text-xl outline-1 outline-primary mb-8"
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={handleEmail}
                />
              )}

              <div className="flex flex-row justify-end mb-11">
                <Link
                  to="/login"
                  className=" px-[10px] laptop:px-[15px] desktop:px-[20px] py-[8px] laptop:py-[8px] desktop:py-[10px] text-[#4B4F56] bg-[#E4E6EB] rounded-[6px]  font-nunito font-bold text-[12px] laptop:text-[15px] desktop:text-[20.64px]"
                >
                  Cancle
                </Link>

                <button
                  className="px-[10px] laptop:px-[15px] py-[8px] laptop:py-[8px]  desktop:px-[20px] desktop:py-[10px] ml-5  bg-primary rounded-[6px]  font-nunito font-regular text-[12px] laptop:text-[15px] desktop:text-[20.64px] text-white"
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
