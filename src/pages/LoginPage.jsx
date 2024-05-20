import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function LoginPage() {
  const { user, handleUserLogin } = useAuth();
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handelShowPassword = () => {
    setPassword(!password);
  };

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="conatiner  flex justify-center items-center h-screen mx-auto bg-black">
      <div className=" flex justify-center items-start sm:w-1/2 ">
        <div className="form-wrapper bg-zinc-950 rounded-lg pt-4 pb-6 px-7 sm:max-w-md w-full">
          <div className="form-field">
            <p className="text-white text-2xl my-4  mx-auto indie-flower-regular  ">
              Login{" "}
            </p>
            <form
              onSubmit={(e) => handleUserLogin(e, credentials)}
              className="border p-4 rounded-lg flex flex-col gap-5"
            >
              <div className="field-wrapper flex flex-wrap py-2 px-2 items-center justify-between mx-auto  w-full">
                <label className="font-semibold uppercase text-white/70  pl-2 pb-2">
                  Email :{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your Email.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70  mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.email}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="field-wrapper relative flex flex-wrap py-2 px-2 items-center justify-between mx-auto  w-full">
                <label className="font-semibold uppercase text-white/70  pl-2 pb-2">
                  Password :{" "}
                </label>
                <input
                  type={password ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your Password.."
                  className="outline-none rounded-md px-3 py-1 bg-zinc-700  text-white/70  mx-2 mb-2 w-full cursor-pointer"
                  value={credentials.password}
                  onChange={handleChangeInput}
                />
                <span
                  onClick={handelShowPassword}
                  className="absolute top-12 left-[88%] -translate-x-1 text-white cursor-pointer"
                >
                  {password ? <IoEye /> : <IoEyeOff />}
                </span>
              </div>

              <div className="field-wrapper text-right">
                <input
                  type="submit"
                  value="Log in"
                  className="text-white bg-cyan-700 cursor-pointer  px-4 py-2 rounded-lg hover:bg-cyan-800 transition-all"
                />
              </div>
            </form>
            <p className="cursor-default text-white/40 text-right p-4">
              Don't have an accout? &nbsp;
              <Link
                to="/register"
                className=" text-teal-500 hover:text-teal-800  transition-all"
              >
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block logo wrapper sm:w-1/2">
        <div className=" w-full">
          <img src="/logo.svg" alt="logo" width={600} height={600} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
