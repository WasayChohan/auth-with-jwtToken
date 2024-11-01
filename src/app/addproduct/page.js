"use client";
import { useState } from "react";
import "../style.css";
export default function Page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = async () => {
    console.log(name, price, company, color, category);
    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, company, color, category }),
    });
    result = await result.json();
    if (result.success) {
      alert("New product added");
    }

    setName("");
    setPrice("");
    setCompany("");
    setColor("");
    setCategory("");
  };
  return (
    <div className="client-page">
      <h1>Add products</h1>
      <input
        className="input"
        type="text"
        placeholder="Enter product  name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter product  company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter product  color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button className="btn" onClick={addProduct}>
        {" "}
        Add Product
      </button>
    </div>
  );
}
