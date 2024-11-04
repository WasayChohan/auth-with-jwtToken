"use client";
import React, { useState } from "react";
import "../style.css";

function Addproduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  const addProducts = async () => {
    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, company, color, category }),
    });
    result = await result.json();
    if (result.success) {
      alert("new product added");
    }
  };

  return (
    <div className="client-page">
      <h1>ADD PRODUCT</h1>

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

      <button onClick={addProducts} className="btn">
        add product
      </button>
    </div>
  );
}

export default Addproduct;
