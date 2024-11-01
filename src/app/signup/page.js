"use client";
import { useState } from "react";
import Link from "next/link";
import "../signup/page.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { username: "", email: "", password: "" };
export default function SignUp() {
  const [data, setData] = useState(defaultData);

  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password) {
      alert("please fill all fields");
      return;
    }

    // Call API

    try {
      const response = await axios.post("/api/users/register", data);

      setData(defaultData);

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit="">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={(e) => onValueChange(e)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => onValueChange(e)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => onValueChange(e)}
            required
          />
          <button onClick={(e) => onRegister(e)}>Submit</button>
        </form>
        <p>
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
