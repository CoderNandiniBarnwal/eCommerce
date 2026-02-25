//App.jsx

import Login from "./components/Login";
import Register from "./components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyMail from "./components/VerifyMail";
import Home from "./components/Home";
import AddProduct from "./components/seller/AddProduct";
import SellerRoute from "./components/seller/SellerRoute";
import { ProductProvider } from "./context/ProductContext";
import DeleteProduct from "./components/seller/DeleteProduct";
import UpdateProduct from "./components/seller/UpdateProduct";
import AddCart from "./components/buyer/AddCart";
import DeleteCart from "./components/buyer/DeleteCart";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/Logout";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";
import PaginateProduct from "./components/PaginateProduct";
import ShowProduct from "./components/ShowProduct";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <ToastContainer position="top-center" autoClose={1000} draggable />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<VerifyMail />} />
              <Route
                path="/addProduct"
                element={
                  <SellerRoute>
                    <AddProduct />
                  </SellerRoute>
                }
              />
              <Route
                path="/deleteproduct"
                element={
                  <SellerRoute>
                    <DeleteProduct />
                  </SellerRoute>
                }
              />
              <Route
                path="/updateproduct"
                element={
                  <SellerRoute>
                    <UpdateProduct />
                  </SellerRoute>
                }
              />
              <Route path="/addcart" element={<AddCart />} />
              <Route path="/deletecart" element={<DeleteCart />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/showproduct" element={<ShowProduct />} />
              <Route path="/paginate" element={<PaginateProduct />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
