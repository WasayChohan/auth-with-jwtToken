import Connection from "@/database/config";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { Grid } from "gridfs-stream";
import { MongoClient } from "mongodb";

Connection();

export async function GET() {
  let data = [];
  let success = true;
  try {
    data = await Product.find();
  } catch (error) {
    data = { result: "error" };
    success = false;
  }

  return NextResponse.json({ result: data, success: true });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const product = new Product(payload);
    await product.save();

    return NextResponse.json({ product, success: true });
  } catch (error) {
    console.log(error);
  }
}
