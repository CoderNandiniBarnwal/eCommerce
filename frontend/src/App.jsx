import Login from "./components/Login";
import Register from "./components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyMail from "./components/VerifyMail";
import Home from "./components/Home";
import AddProduct from "./components/seller/AddProduct";
import SellerRoute from "./components/seller/SellerRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/register" element=<Register /> />
        <Route path="/login" element=<Login /> />
        <Route path="/verify" element={<VerifyMail />} />
        <Route
          path="/addProduct"
          element={
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
