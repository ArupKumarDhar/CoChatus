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
    <div className="flex">
      {/* Left-side */}
      <ToastContainer />
      <div className="w-2/4 flex flex-col items-end">
        <div className="mr-[69px] mt-[70px]">
          <h1 className="font-nunito font-bold text-[34px] text-[#11175D] mb-[13px]">
            Get started with easily register
          </h1>
          <p className="font-nunito font-regular text-[20.34px] text-[#000000] opacity-[0.5] mb-[61px]">
            Free register and you can enjoy it
          </p>

          {/* Email input part here */}
          <div className="relative">
            {emailError ? (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-[368px] h-20 pl-[52px] font-nunito font-semibold text-red-600 text-xl outline-none  mb-14  placeholder:text-red-600"
                type="email"
                value={email}
                placeholder={emailError}
                onChange={handleEmail}
              />
            ) : (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-[368px] border-opacity-[0.3] h-20 pl-[52px] font-nunito font-semibold text-[#11175D] text-xl outline-1 outline-primary mb-14"
                type="email"
                value={email}
                onChange={handleEmail}
              />
            )}

            {emailError ? (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-red-600  ">
                Email Address
              </p>
            ) : (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Email Address
              </p>
            )}
          </div>

          {/* Full name input part here */}
          <div className="relative">
            {nameError ? (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-[368px]  h-20 pl-[52px] font-nunito font-semibold text-red-600 text-xl  mb-14  outline-none placeholder:text-red-600 "
                placeholder={nameError}
                type="text"
                value={name}
                onChange={handleName}
              />
            ) : (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-[368px] border-opacity-[0.3] h-20 pl-[52px] font-nunito font-semibold text-[#11175D] text-xl  mb-14 outline-primary outline-1 "
                type="text"
                value={name}
                onChange={handleName}
              />
            )}
            {nameError ? (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-[13.76px] text-red-600 ">
                Full name
              </p>
            ) : (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Full name
              </p>
            )}
          </div>

          {/* Password input part here */}
          <div className="relative w-[368px]">
            {passwordError ? (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-red-600 w-[368px] h-20 pl-[52px] font-nunito font-semibold text-red-600 text-xl  mb-14  outline-none placeholder:text-red-600"
                type={!showpassword ? "text" : "password"}
                value={password}
                placeholder={passwordError}
                onChange={handlePassword}
              />
            ) : (
              <input
                className=" border-[1.72px] border-solid rounded-lg border-[#11175D] w-[368px] border-opacity-[0.3] h-20 pl-[52px] pr-[60px] font-nunito font-semibold text-[#11175D] text-xl  mb-14 outline-primary outline-1"
                type={!showpassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
              />
            )}
            {passwordError ? (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-[13.76px] text-red-600 ">
                Password
              </p>
            ) : (
              <p className="absolute top-[-12px] left-[34.4px] px-[18.2px] bg-white font-nunito font-regular text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Password
              </p>
            )}
            {password ? (
              !showpassword ? (
                <HiEye
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[25px] right-[25px] text-[26.38px] text-[#03014C] opacity-50 cursor-pointer "
                />
              ) : (
                <HiEyeOff
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[25px] right-[25px] text-[26.38px] text-[#03014C] opacity-50 cursor-pointer"
                />
              )
            ) : (
              ""
            )}
          </div>
          <button
            className="w-[368px] h-20 bg-primary rounded-full  font-nunito font-regular text-[20.64px] text-white mb-[35px]"
            onClick={handleClick}
          >
            Sign up
          </button>
          <p className="font-opensans text-[13.34px] text-[#03014C] font-regular text-center w-[368px]">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="font-opensans text-[13.34px] text-[#EA6C00] cursor-pointer font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right-side */}
      <div className="w-2/4">
        <picture>
          <img
            className="h-screen w-full object-cover"
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
