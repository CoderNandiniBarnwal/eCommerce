//DeleteCart.jsx
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { isLogoutOpen, setIsLogoutOpen, setRole } = useAuthContext();
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const response = await axios.delete(`http://localhost:8001/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      setRole("");
      setIsLogoutOpen(false);

      toast.success("User logout successfully");
      navigate("/login");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isLogoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>

            <p className="text-gray-600 mb-5">Are you sure to logout?</p>

            <div className="flex justify-between px-6">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => logoutUser()}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
