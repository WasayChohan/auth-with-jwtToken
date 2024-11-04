import Connection from "@/database/config";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

Connection();

export async function GET() {
  try {
    const data = await Product.find();
    return NextResponse.json({ result: data });
  } catch (error) {
    console.log(error);
  }
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
