//DeleteProduct.jsx
import React from "react";
import { useProductContext } from "../../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteProduct() {
  const { products, setProducts, isDelOpen, setIsDelOpen, productId } =
    useProductContext();

  async function deleteItem(id) {
    console.log("Product ID from context:", id);
    try {
      const response = await axios.delete(
        `http://localhost:8001/product/deleteProduct/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      toast.success("Product deleted successfully");
      setProducts(products.filter((itemToDlt) => itemToDlt._id !== id));

      console.log(response);
      setIsDelOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isDelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>

            <p className="text-gray-600 mb-5">
              You want to delete this product?
            </p>

            <div className="flex justify-between px-6">
              <button
                onClick={() => setIsDelOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteItem(productId)}
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

export default DeleteProduct;
