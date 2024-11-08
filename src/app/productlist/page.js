"use client";
import React, { useEffect, useState } from "react";
import "../style.css";
import Link from "next/link";
import DeleteProduct from "../deleteproduct";
import { useRouter } from "next/navigation";

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/products", {
        cache: "no-cache",
      });
      const data = await response.json();
      setProducts(data.success ? data.result : []);
      console.log("Fetched products:", data.success ? data.result : []);
    };
    getData();
  }, []);

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      const responseData = await response.json();
      if (responseData.success) {
        alert("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== id)); // Remove the deleted product from the state
        router.push("/productlist"); // Redirect to the product list page
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="client-page">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Color</td>
            <td>Company</td>
            <td>Category</td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.color}</td>
              <td>{item.company}</td>
              <td>{item.category}</td>
              <td>
                {" "}
                <Link href={"productlist/" + item._id}>Edit</Link>{" "}
                <button onClick={() => deleteRecord(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
