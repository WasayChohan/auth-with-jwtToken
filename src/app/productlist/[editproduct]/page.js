"use client";
import React, { useEffect, useState } from "react";
import "../../style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Addproduct(props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProductDetail();
    // console.log(props);
  }, []);

  const getProductDetail = async () => {
    let productId = props.params.editproduct;
    // console.log(productId);
    let productData = await fetch(
      "http://localhost:3000/api/products/" + productId
    );

    productData = await productData.json();
    let result = productData.result;
    if (productData.success) {
      setName(result.name);
      setPrice(result.price);
      setCompany(result.company);
      setColor(result.color);
      setCategory(result.category);
    }
    // console.log(productData);
  };

  const updateProduct = async () => {
    let productId = props.params.editproduct;
    let data = await fetch("http://localhost:3000/api/products/" + productId, {
      method: "PUT",
      body: JSON.stringify({ name, price, company, color, category }),
    });

    data = await data.json();
    if (data.result) {
      alert("Product updated successfully");
      router.push("/productlist");
    }
  };

  return (
    <div className="client-page">
      <h1>UPDATE PRODUCT</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        className="input"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        className="input"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="company"
        className="input"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="color"
        className="input"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="category"
        className="input"
      />

      <button className="btn" onClick={updateProduct}>
        update product
      </button>
      <Link href="/productlist">Go Back To Product List</Link>
    </div>
  );
}

export default Addproduct;
