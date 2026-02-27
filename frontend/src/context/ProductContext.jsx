//ProductContext.jsx

import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [picture, setPicture] = useState(null);
  const [products, setProducts] = useState([]);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);
  const [editPicture, setEditPicture] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <ProductContext.Provider
      value={{
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
        products,
        setProducts,
        isDelOpen,
        setIsDelOpen,
        isEditOpen,
        setIsEditOpen,
        productId,
        setProductId,
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
        sort,
        setSort,
        search,
        setSearch,
        category,
        setCategory,
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);
