import axios from "axios";
import React, { useEffect, useState } from "react";

function ShowProduct() {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");

  function editProduct() {}
  function deleteProduct(id) {
    products.filter((itemToDlt) => itemToDlt.id !== id);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/product/getAllProduct",
        );

        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {products.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-xl transition"
        >
          <img
            src={item.picture}
            alt={item.name}
            className="h-40 w-full object-cover rounded"
          />

          <h2 className="text-lg font-bold mt-3">{item.name}</h2>
          <p className="text-gray-600 break-words">{item.description}</p>

          <div className="flex justify-between mt-3">
            <span className="font-bold text-green-600">₹ {item.price}</span>
            <span>Stock: {item.stock}</span>
          </div>

          {role === "seller" && (
            <div className="flex justify-between mt-3">
              <button
                className="font-bold text-yellow-600"
                onClick={() => editProduct(item.id)}
              >
                Edit
              </button>
              <button
                className="font-bold text-red-600"
                onClick={() => deleteProduct(item.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowProduct;
