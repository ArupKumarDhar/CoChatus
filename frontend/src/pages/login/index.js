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
    <div className="md:flex">
      {/* Left-side */}
      <ToastContainer />

      <div className="  w-full md:w-2/4 md:flex md:flex-col md:items-end">
        <div className="mx-2.5 laptop:mx-0 desktop:mx-0 md:mr-[80px] laptop:mr-[110px] desktop:mr-[140px] mt-[100px] md:mt-[60px] laptop:mt-[80px] desktop:mt-[120px]">
          <h1 className="font-nunito font-bold mb-[50px] text-[25px] text-left laptop:text-[25px] desktop:text-[34px] text-[#11175D]  desktop:mb-[50px]">
            Login to your account!
          </h1>
          {/* Login with google account */}
          <div className="mb-[54px] relative">
            <button
              onClick={handleGoogleSignIn}
              className=" pl-[70px] pr-[60px] border-[1px] border-solid font-opensans text-[11px] laptop:text-[13px] desktop:text-[20px] font-regular text-[#03014C] border-opacity-30 rounded-[9px] border-[#03014C] py-[10px] laptop:py-[15px] desktop:py-[24px] "
            >
              Login with Google
            </button>
            <FcGoogle className="absolute left-0 top-[12px] text-[16px] laptop:top-[15px] desktop:top-[25px] laptop:text-[21px] desktop:text-[30px] ml-[30px] cursor-pointer" />
          </div>
          {/* Email input part here */}
          <div className="relative">
            {emailError ? (
              <input
                className="border-b-[1.72px] pr-[40px] laptop:pr-[40px] desktop:pr-[60px] border-solid  border-red-600 w-full laptop:w-[280px] desktop:w-[368px] py-[10px] laptop:py-[15px] desktop:h-20  font-nunito font-regular text-red-600 text-[12px] laptop:text-[15px] desktop:text-xl outline-none  mb-8 laptop:mb-10  desktop:mb-14  placeholder:text-red-600"
                type="email"
                value={email}
                placeholder={emailError}
                onChange={handleEmail}
              />
            ) : (
              <input
                className=" border-b-[1.72px] border-solid pr-[40px] laptop:pr-[40px] desktop:pr-[60px]  border-[#11175D] w-full laptop:w-[280px] desktop:w-[368px] py-[10px] laptop:py-[15px] desktop:h-20 border-opacity-[0.3]  font-nunito font-regular text-[#11175D] text-[12px] laptop:text-[15px] desktop:text-xl outline-none mb-8 laptop:mb-10  desktop:mb-14 "
                type="email"
                value={email}
                onChange={handleEmail}
              />
            )}

            {emailError ? (
              <p className="absolute top-[-12px] text-[12px] laptop:text-[13.76px]  bg-white font-nunito font-regular text-red-600  ">
                Email Address
              </p>
            ) : (
              <p className="absolute top-[-12px]   bg-white font-nunito font-regular text-[12px] laptop:text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Email Address
              </p>
            )}
          </div>

          {/* Password input part here */}
          <div className="relative w-full laptop:w-[280px] desktop:w-[368px]">
            {passwordError ? (
              <input
                className=" border-b-[1.72px] pr-[40px] laptop:pr-[40px] desktop:pr-[60px] border-solid border-red-600 w-full laptop:w-[280px] desktop:w-[368px] py-[10px] laptop:py-[15px] desktop:h-20  font-nunito font-regular text-red-600 text-[12px] laptop:text-[15px] desktop:text-xl mb-8 laptop:mb-10  desktop:mb-14  outline-none placeholder:text-red-600"
                type={!showpassword ? "text" : "password"}
                value={password}
                placeholder={passwordError}
                onChange={handlePassword}
              />
            ) : (
              <input
                className=" border-b-[1.72px] border-solid pr-[40px] laptop:pr-[40px] desktop:pr-[60px]  border-[#11175D] w-full laptop:w-[280px] desktop:w-[368px] py-[10px] laptop:py-[15px] desktop:h-20 border-opacity-[0.3]  font-nunito font-regular text-[#11175D] text-[12px] laptop:text-[15px] desktop:text-xl outline-none mb-8 laptop:mb-10  desktop:mb-14 "
                type={!showpassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
              />
            )}
            {passwordError ? (
              <p className="absolute top-[-12px]  bg-white font-nunito font-regular text-[12px] laptop:text-[13.76px] text-red-600 ">
                Password
              </p>
            ) : (
              <p className="absolute top-[-12px]  bg-white font-nunito font-regular text-[12px] laptop:text-[13.76px] text-[#11175D] text-opacity-[70%]">
                Password
              </p>
            )}
            {password ? (
              !showpassword ? (
                <HiEye
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[9px] laptop:top-[16px] desktop:top-[25px] right-[15px] laptop:right-[15px] desktop:right-[25px] text-[18px] laptop:text-[20px] desktop:text-[26.38px] text-[#03014C] opacity-50 cursor-pointer "
                />
              ) : (
                <HiEyeOff
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-[9px] laptop:top-[16px] desktop:top-[25px] right-[15px] laptop:right-[15px] desktop:right-[25px] text-[18px] laptop:text-[20px] desktop:text-[26.38px] text-[#03014C] opacity-50 cursor-pointer"
                />
              )
            ) : (
              ""
            )}
          </div>
          <button
            className=" w-full laptop:w-[280px] desktop:w-[368px] py-[10px] laptop:py-[15px] desktop:h-20 bg-primary rounded-[9px]  font-nunito font-regular text-[12px] laptop:text-[15px] desktop:text-[20.64px] text-white mb-[20px] laptop:mb-[25px] desktop:mb-[35px]"
            onClick={handleClick}
          >
            Login to Continue
          </button>
          <p className="font-opensans text-[12px] desktop:text-[13.34px] text-[#03014C] font-regular text-center w-full laptop:w-[280px] desktop:w-[368px]">
            Don’t have an account ?{" "}
            <Link
              to={"/registration"}
              className="font-opensans ext-[12px] desktop:text-[13.34px] text-[#EA6C00] cursor-pointer font-bold"
            >
              Sign up
            </Link>
          </p>
          <div className=" w-full laptop:w-[280px] desktop:w-[368px] flex justify-center mt-[10px]">
            <Link
              to={"/forgotpassword"}
              className="font-opensans text-[12px] desktop:text-[13.34px] text-[#03014C]   cursor-pointer font-bold"
            >
              Forgotten Password?
            </Link>
          </div>
        </div>
      </div>

      {/* Right-side */}
      <div className="w-2/4 hidden md:block">
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
