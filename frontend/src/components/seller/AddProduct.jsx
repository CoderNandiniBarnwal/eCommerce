// AddProject.jsx

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

function AddProduct() {
  const {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    picture,
    setPicture,
  } = useProductContext();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("name", name);
      formData.append("picture", picture);
      console.log("LOCAL STORAGE-", localStorage.getItem("accessToken"));

      const response = await axios.post(
        "http://localhost:8001/product/addProduct",
        formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      console.log("Token:", localStorage.getItem("accessToken"));
      console.log("Role:", localStorage.getItem("role"));
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data); // 🔥 real backend error
    }
  };
  return (
    <>
      <form
        className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg"
        onSubmit={handleAdd}
      >
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows={5}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
            stock:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            placeholder="Enter product stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="picture"
          >
            picture:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="picture"
            type="file"
            placeholder="Enter product price"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddProduct;
