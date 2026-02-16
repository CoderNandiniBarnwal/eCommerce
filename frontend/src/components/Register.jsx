import React from "react";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [picture, setPicture] = useState();

  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:8001/user/register", {
  //       userName,
  //       email,
  //       password,
  //       role,
  //       picture,
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.response?.data || error.message);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("picture", picture);

      const response = await axios.post(
        "http://localhost:8001/user/register",
        formData,
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
        Welcome to My Company
      </h1>
      <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
          <label
            htmlFor="userName"
            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
          >
            userName:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-start flex-col justify-start">
          <label
            htmlFor="email"
            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-start flex-col justify-start">
          <label
            htmlFor="text"
            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label
            htmlFor="role"
            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
          >
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-start flex-col justify-start">
          <label
            htmlFor="picture"
            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
          >
            picture:
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            // value={picture}
            onChange={(e) => setPicture(e.target.files[0])}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
        </span>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Login
        </a>
      </div>
    </div>
  );
}

export default Register;
