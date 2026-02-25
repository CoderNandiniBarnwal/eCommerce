//Login.jsx

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
  } = useAuthContext();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8001/user/login", {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.success) {
        loginUser(response.data);

        navigate("/");
        toast.success("User Login successfully");
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dkt1t22qc/image/upload/v1742357451/Prestataires_Documents/cynbxx4vxvgv2wrpakiq.jpg"
      />
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dkt1t22qc/image/upload/v1742357451/Prestataires_Documents/cynbxx4vxvgv2wrpakiq.jpg)",
        }}
      >
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            <div
              className="w-80 rounded-[20px] bg-white p-8"
              style={{ boxShadow: "#00000057 1px 3px 4px" }}
            >
              <h1
                className="mb-4 text-center text-3xl font-bold text-black"
                style={{ textShadow: "#00000063 0px 3px 5px" }}
              >
                Welcome Back !
              </h1>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email address"
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 placeholder:text-[#000000]"
                  style={{ boxShadow: "rgb(0 0 0 / 21%) 0px 7px 5px 0px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 placeholder:text-[#000000]"
                  style={{ boxShadow: "rgb(0 0 0 / 21%) 0px 7px 5px 0px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4 pt-2">
                <span className="ml-2 cursor-pointer text-[10px] text-[#228CE0] hover:underline">
                  Forget Password?
                </span>
              </div>
              <div className="mb-4 flex justify-center">
                <button
                  className="h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-[#7336FF] to-[#3269FF] text-white shadow-md shadow-blue-950"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              </div>
              <div className="text-center text-[#969696]">
                Don't have an account?
                <Link to="/register">
                  <span className="cursor-pointer text-[#7337FF] hover:underline">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
