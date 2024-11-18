"use client";
import React, { useState } from "react";
import "../style.css";

function Addproduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // New state for the image file

  const addProducts = async () => {
    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("company", company);
    formData.append("color", color);
    formData.append("category", category);
    formData.append("image", image); // Append the image file

    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: formData, // Use FormData as the body
    });

    result = await result.json();
    if (result.success) {
      alert("New product added");
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
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Handle file input
        className="input"
      />

      <button onClick={addProducts} className="btn">
        Add Product
      </button>
    </div>
  );
}

export default Addproduct;
