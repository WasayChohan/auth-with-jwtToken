"use client";

import { useState } from "react";
import Link from "next/link";
import "../login/page.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { email: "", password: "" };
export default function Login() {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert("please fill all fields");
      return;
    }

    // Call API
    try {
      console.log("data", data);
      const response = await axios.post("/api/users/login", data);

      setData(defaultData);

      if (response.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit="">
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
          <button onClick={(e) => onLogin(e)}>Sign In</button>
        </form>
        <p>
          New here? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
