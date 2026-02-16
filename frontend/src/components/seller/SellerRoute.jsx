import React from "react";
import { Navigate } from "react-router-dom";

function SellerRoute({ children }) {
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.log("Token not found");
    return <Navigate to="/login" />;
  }
  if (role !== "seller") {
    console.log("Role must be seller to add the products");
    return <Navigate to="/" />;
  }
  return children;
}

export default SellerRoute;
