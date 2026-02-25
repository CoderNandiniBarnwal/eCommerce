// //UpdateProduct.jsx

import React from "react";
import { useProductContext } from "../../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateProduct() {
  const {
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    editPrice,
    setEditPrice,
    editStock,
    setEditStock,
    editPicture,
    setEditPicture,
    productId,
    isEditOpen,
    setIsEditOpen,
    products,
    setProducts,
  } = useProductContext();

  //   const handleEdit = async (id) => {
  //     console.log(editName, editDescription, editPrice, editStock);
  //     console.log(id);
  //     try {
  //       const formData = new FormData();
  //       formData.append("name", editName);
  //       formData.append("description", editDescription);
  //       formData.append("price", Number(editPrice));
  //       formData.append("stock", Number(editStock));
  //       formData.append("picture", editPicture);

  //       const response = await axios.put(
  //         `http://localhost:8001/product/updateProduct/${id}`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           },
  //         },
  //       );

  //       setProducts(
  //         products.map((itemToEdit) =>
  //           itemToEdit._id === id ? response.data.data : itemToEdit,
  //         ),
  //       );
  //       setIsEditOpen(false);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleEdit = async (id) => {
    try {
      console.log("Token:", localStorage.getItem("accessToken"));

      const formData = new FormData();
      formData.append("name", editName);
      formData.append("description", editDescription);
      formData.append("price", Number(editPrice));
      formData.append("stock", Number(editStock));
      if (editPicture) formData.append("picture", editPicture); // optional

      const response = await axios.put(
        `http://localhost:8001/product/updateProduct/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setProducts(
        products.map((item) => (item._id === id ? response.data.data : item)),
      );
      setIsEditOpen(false);
      console.log(response.data);

      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <>
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[400px] rounded-xl shadow-xl p-6 animate-fadeIn">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter product name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
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
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                price:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="number"
                placeholder="Enter product price"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="stock"
              >
                stock:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="number"
                placeholder="Enter product stock"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
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
                onChange={(e) => setEditPicture(e.target.files[0])}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[45%]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit(productId)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[45%]"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;
UpdateProduct.jsx;

UpdateProduct.jsx;
