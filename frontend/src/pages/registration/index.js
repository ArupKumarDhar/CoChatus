import React, { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setpassword] = useState("");
  let [showpassword, setShowPassword] = useState(true);

  let [emailError, setEmailError] = useState("");
  let [nameError, setNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  let emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
  let passwordRegex = /^(?=.{8})/;

  const auth = getAuth();

  let handleEmail = (em) => {
    setEmail(em.target.value);
    setEmailError("");
  };

  let handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  let handlePassword = (e) => {
    setpassword(e.target.value);

    setPasswordError("");
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

    if (!name) {
      setNameError("Full name is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    } else {
      if (!passwordRegex.test(password)) {
        setpassword("");
        setPasswordError("Password must be eight digits");
      }
    }
    if (emailError) {
      setEmail("");
    }
    if (passwordError) {
      setpassword("");
    }
    if (
      email &&
      name &&
      password &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmail("");
          setName("");
          setpassword("");
          toast.success("Registration successfully and verify your email");
          sendEmailVerification(auth.currentUser);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setEmail("");
            setEmailError("Email is already in use");
          }
        });
    }
  };

  return (
    <div className="md:flex">
      {/* Left-side */}
      <ToastContainer />

      <div className="w-full px-2.5 md:px-0 md:w-2/4 md:flex md:flex-col md:items-end">
        <div className="  md:mr-[50px] laptop:mr-[69px] mt-[100px] md:mt-[50px] laptop:mt-[100px] desktop:mt-[150px]">
          <h1 className="font-nunito font-bold text-[20px] laptop:text-[25px] desktop:text-[34px] text-[#11175D]  desktop:mb-[13px]">

            Get started with easily register
          </h1>
          <p className="font-nunito font-regular text-[15px] laptop:text-[20.34px] text-[#000000] opacity-[0.5] mb-[30px] md:mb-[40px]">
            Free register and you can enjoy it
          </p>

          {/* Email input part here */}
          <div className="relative mt-[80px] md:mt-0">
            {emailError ? (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-full laptop:w-[280px] desktop:w-[368px]  py-[10px] md:py-[15px] px-[30px] desktop:h-20 desktop:pl-[52px] font-nunito font-regular text-red-600 text-[13px] laptop:text-[15px] desktop:text-xl outline-none mb-8 placeholder:text-red-600"

                type="email"
                value={email}
                placeholder={emailError}
                onChange={handleEmail}
              />
            ) : (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-full laptop:w-[280px] desktop:w-[368px] border-opacity-[0.3] py-[10px] md:py-[15px] px-[30px] desktop:h-20 desktop:pl-[52px] font-nunito font-regular text-[#11175D] text-[13px] laptop:text-[15px] desktop:text-xl outline-1 outline-primary mb-8 "

                type="email"
                value={email}
                onChange={handleEmail}
              />
            )}

            {emailError ? (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px]  bg-white font-nunito font-regular  text-red-600  ">
                Email Address
              </p>
            ) : (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] laptop:left-[25px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px] bg-white font-nunito font-regular  text-[#11175D] text-opacity-[70%]">
                Email Address
              </p>
            )}
          </div>

          {/* Full name input part here */}
          <div className="relative">
            {nameError ? (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-full laptop:w-[280px] desktop:w-[368px]  py-[10px] md:py-[15px] px-[30px] desktop:h-20 desktop:pl-[52px] font-nunito font-regular text-red-600 text-[13px] laptop:text-[15px] desktop:text-xl outline-none mb-8 placeholder:text-red-600 "

                placeholder={nameError}
                type="text"
                value={name}
                onChange={handleName}
              />
            ) : (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-full laptop:w-[280px] desktop:w-[368px] border-opacity-[0.3] py-[10px] md:py-[15px] px-[30px] desktop:h-20 desktop:pl-[52px] font-nunito font-regular text-[#11175D] text-[13px] laptop:text-[15px] desktop:text-xl outline-1 outline-primary mb-8 "

                type="text"
                value={name}
                onChange={handleName}
              />
            )}
            {nameError ? (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px]  bg-white font-nunito font-regular  text-red-600 ">
                Full name
              </p>
            ) : (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] laptop:left-[25px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px] bg-white font-nunito font-regular  text-[#11175D] text-opacity-[70%]">
                Full name
              </p>
            )}
          </div>

          {/* Password input part here */}
          <div className="relative w-full laptop:w-[280px] desktop:w-[368px]">
            {passwordError ? (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-full laptop:w-[280px] desktop:w-[368px]  py-[10px] md:py-[15px] px-[30px] desktop:h-20 desktop:pl-[52px] laptop:pr-[48px] desktop:pr-[63px] font-nunito font-regular text-red-600 text-[13px] laptop:text-[15px] desktop:text-xl outline-none mb-8 placeholder:text-red-600 "

                type={!showpassword ? "text" : "password"}
                value={password}
                placeholder={passwordError}
                onChange={handlePassword}
              />
            ) : (
              <input

                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-full laptop:w-[280px] desktop:w-[368px] border-opacity-[0.3] py-[10px] md:py-[15px] px-[30px] desktop:h-20 laptop:pr-[48px] desktop:pl-[52px] desktop:pr-[63px] font-nunito font-regular text-[#11175D] text-[13px] laptop:text-[15px] desktop:text-xl outline-1 outline-primary mb-8 "

                type={!showpassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
              />
            )}
            {passwordError ? (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px]  bg-white font-nunito font-regular  text-red-600 ">
                Password
              </p>
            ) : (
              <p className="absolute top-[-8px] laptop:top-[-8px] desktop:top-[-12px] left-[20px] px-[10px] laptop:left-[25px] desktop:left-[34.4px] desktop:px-[18.2px] text-[10px] laptop:text-[11px] desktop:text-[13.76px] bg-white font-nunito font-regular  text-[#11175D] text-opacity-[70%]">
                Password
              </p>
            )}
            {password ? (
              !showpassword ? (
                <HiEye
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[14px] md:top-[18px]  right-[15px] laptop:right-[20px] text-[15px] laptop:text-[18px] laptop:top-[18px] desktop:top-[25px] desktop:right-[25px] desktop:text-[26.38px] text-[#03014C] opacity-50 cursor-pointer "
                />
              ) : (
                <HiEyeOff
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[14px]  md:top-[18px]  right-[15px] laptop:right-[20px] text-[15px] laptop:text-[18px] laptop:top-[18px] desktop:top-[25px] desktop:right-[25px] desktop:text-[26.38px] text-[#03014C] opacity-50 cursor-pointer"
                />
              )
            ) : (
              ""
            )}
          </div>
          <button
            className="w-full laptop:w-[280px] desktop:w-[368px] py-[10px] md:py-[15px] px-[30px] desktop:h-20 laptop:pl-[52px] bg-primary rounded-full  font-nunito font-regular text-[15px] desktop:text-[20.64px] text-white mb-[35px]"
            onClick={handleClick}
          >
            Sign up
          </button>
          <p className="font-opensans text-[10px] laptop:text-[13.34px] text-[#03014C] font-regular text-center w-full laptop:w-[280px] desktop:w-[368px]">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="font-opensans text-[10px] laptop:text-[13.34px] text-[#EA6C00] cursor-pointer font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right-side */}
      <div className="w-2/4 hidden md:block ">
        <picture>
          <img
            className="h-screen w-screen object-cover"
            src="images/registration-img.webp"
            alt="registration-img"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
}

export default Registration;
