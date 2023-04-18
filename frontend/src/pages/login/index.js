import React, { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setpassword] = useState("");
  let [showpassword, setShowPassword] = useState(true);
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  const auth = getAuth();

  let handleEmail = (em) => {
    setEmail(em.target.value);
    setEmailError("");
  };

  let handlePassword = (e) => {
    setpassword(e.target.value);

    setPasswordError("");
  };

  let handleClick = () => {
    if (!email) {
      setEmailError("Email is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }
    if (emailError) {
      setEmail("");
    }
    if (passwordError) {
      setpassword("");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Login successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setEmail("");
            setEmailError("Email not found");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setpassword("");
            setPasswordError("Password doesn't match");
          }
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex">
      {/* Left-side */}
      <ToastContainer />

      <div className="w-2/4 flex flex-col items-end">
        <div className="mr-[69px] mt-[80px]">
          <h1 className="font-opensans font-bold text-[34px] text-[#11175D] mb-[60px]">
            Login to your account!
          </h1>
          {/* Login with google account */}
          <div className="mb-[54px] relative">
            <button
              onClick={handleGoogleSignIn}
              className=" pl-[70px] pr-[60px] border-[1px] border-solid font-opensans text-[20px] font-semibold text-[#03014C] border-opacity-30 rounded-[9px] border-[#03014C] py-[24px] "
            >
              Login with Google
            </button>
            <FcGoogle className="absolute left-0 top-[25px] text-[30px] ml-[30px]" />
          </div>
          {/* Email input part here */}
          <div className="relative">
            {emailError ? (
              <input
                className="border-b-[1.72px] pr-[60px] border-solid  border-red-600 w-[368px] h-20  font-nunito font-regular text-red-600 text-xl outline-none  mb-14  placeholder:text-red-600"
                type="email"
                value={email}
                placeholder={emailError}
                onChange={handleEmail}
              />
            ) : (
              <input
                className=" border-b-[1.72px] border-solid pr-[60px]  border-[#11175D] w-[368px] border-opacity-[0.3] h-20  font-nunito font-regular text-[#11175D] text-xl outline-none mb-14 "
                type="email"
                value={email}
                onChange={handleEmail}
              />
            )}

            {emailError ? (
              <p className="absolute top-[-12px]   bg-white font-nunito font-regular text-red-600  ">
                Email Address
              </p>
            ) : (
              <p className="absolute top-[-12px]   bg-white font-nunito font-regular text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Email Address
              </p>
            )}
          </div>

          {/* Password input part here */}
          <div className="relative w-[368px]">
            {passwordError ? (
              <input
                className=" border-b-[1.72px] pr-[60px] border-solid border-red-600 w-[368px] h-20  font-nunito font-regular text-red-600 text-xl  mb-14  outline-none placeholder:text-red-600"
                type={!showpassword ? "text" : "password"}
                value={password}
                placeholder={passwordError}
                onChange={handlePassword}
              />
            ) : (
              <input
                className=" border-b-[1.72px] border-solid pr-[60px]  border-[#11175D] w-[368px] border-opacity-[0.3] h-20  font-nunito font-regular text-[#11175D] text-xl outline-none mb-14 "
                type={!showpassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
              />
            )}
            {passwordError ? (
              <p className="absolute top-[-12px]  bg-white font-nunito font-regular text-[13.76px] text-red-600 ">
                Password
              </p>
            ) : (
              <p className="absolute top-[-12px]  bg-white font-nunito font-regular text-[13.76px] text-[#11175D] text-opacity-[70%]">
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
            className="w-[368px] h-20 bg-primary rounded-[9px]  font-nunito font-regular text-[20.64px] text-white mb-[35px]"
            onClick={handleClick}
          >
            Login to Continue
          </button>
          <p className="font-opensans text-[13.34px] text-[#03014C] font-regular text-center w-[368px]">
            Don’t have an account ?{" "}
            <Link
              to={"/registration"}
              className="font-opensans text-[13.34px] text-[#EA6C00] cursor-pointer font-bold"
            >
              Sign up
            </Link>
          </p>
          <div className="w-[368px] flex justify-center mt-[10px]">
            <Link
              to={"/forgotpassword"}
              className="font-opensans text-[13.34px] text-[#03014C] text-center  cursor-pointer font-regular"
            >
              Forgotten Password?
            </Link>
          </div>
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

export default Login;
