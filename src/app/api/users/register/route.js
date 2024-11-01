import User from "@/models/user";
import bcryptjs from "bcryptjs";
import Connection from "@/database/config";
import { NextRequest, NextResponse } from "next/server";

Connection();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new Response("username, email, password id required", {
        status: 401,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return new Response("username is already exist", { status: 400 });
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response("user saved successfully", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
