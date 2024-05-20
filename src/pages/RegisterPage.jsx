import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function RegisterPage() {
  const { handleUserRegister } = useAuth();
  const [password, setPassword] = useState(false);
  const [Cpassword, setCPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handelShowPassword = () => {
    setPassword(!password);
  };
  const handelShowCPassword = () => {
    setCPassword(!Cpassword);
  };

  return (
    <div className="conatiner flex justify-center items-center h-screen  mx-auto bg-black">
      <div className=" flex justify-center items-start sm:w-1/2 ">
        <div className="form-wrapper bg-zinc-950  rounded-lg pt-4 pb-6 px-7 sm:max-w-md w-full">
          <div className="form-field">
            <p className="text-white text-2xl my-4  mx-auto indie-flower-regular ">
              Register{" "}
            </p>
            <form
              onSubmit={(e) => handleUserRegister(e, credentials)}
              className="border p-4 rounded-lg flex flex-col gap-5"
            >
              <div className="field-wrapper flex flex-wrap py-2 px-2 items-center justify-between mx-auto w-full">
                <label className="font-semibold uppercase text-white/70  pl-2 pb-2">
                  Name :{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your username.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70  mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="field-wrapper flex flex-wrap py-2 px-2 items-center justify-between mx-auto w-full">
                <label className="font-semibold uppercase text-white/70 pl-2 pb-2">
                  Email :{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70 mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.email}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="field-wrapper relative flex flex-wrap py-2 px-2 items-center justify-between mx-auto  w-full">
                <label className="font-semibold  text-white/70  pl-2 pb-2">
                  Create Password :{" "}
                </label>
                <input
                  type={password ? "text" : "password"}
                  name="password1"
                  required
                  placeholder="Create your Password.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70  mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.password1}
                  onChange={handleChangeInput}
                />
                <span
                  onClick={handelShowPassword}
                  className="absolute top-12 left-[88%] -translate-x-1 text-white cursor-pointer"
                >
                  {password ? <IoEye /> : <IoEyeOff />}
                </span>
              </div>

              <div className="field-wrapper relative flex flex-wrap py-2 px-2 items-center justify-between mx-auto  w-full">
                <label className="font-semibold  text-white/70  pl-2 pb-2">
                  Confirm Password :{" "}
                </label>
                <input
                  type={Cpassword ? "text" : "password"}
                  name="password2"
                  required
                  placeholder="Confirm  Password.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70  mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.password2}
                  onChange={handleChangeInput}
                />
                <span
                  onClick={handelShowCPassword}
                  className="absolute top-12 left-[88%] -translate-x-1 text-white cursor-pointer"
                >
                  {Cpassword ? <IoEye /> : <IoEyeOff />}
                </span>
              </div>

              <div className="field-wrapper text-right">
                <input
                  type="submit"
                  value="Register"
                  className="text-white bg-cyan-700 cursor-pointer  px-4 py-2 rounded-lg hover:bg-cyan-800 transition-all"
                />
              </div>
            </form>

            <p className="cursor-default text-white/40 text-right p-4">
              Already have an accout? &nbsp;
              <Link
                to="/login"
                className=" text-teal-500 hover:text-teal-800  transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block logo wrapper sm:w-1/2">
        <div className="w-full">
          <img src="/logo.svg" alt="logo" width={600} height={600} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
