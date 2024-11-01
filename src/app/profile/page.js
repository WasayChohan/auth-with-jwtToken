"use client";

import { useState } from "react";
import Link from "next/link";
import "../login/page.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  // const onLogOut = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  // Call API
  const onLogOut = async () => {
    const response = await axios.get("/api/users/logout");

    if (response.status === 200) {
      router.push("/login");
    }
  };

  return (
    <div className="login">
      <div className="signin-container">
        <h2>Welcome to profile page</h2>
        <p>your kaam Area</p>

        <button onClick={onLogOut}>Log out</button>
      </div>
    </div>
  );
}
