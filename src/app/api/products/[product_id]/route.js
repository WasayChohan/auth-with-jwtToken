import Connection from "@/database/config";
import Product from "@/models/product";
import { NextResponse } from "next/server";

Connection();

export async function PUT(request, content) {
  const productId = content.params.product_id;
  const filter = { _id: productId };
  const payload = await request.json();
  console.log(payload);
  const result = await Product.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}

export async function GET(request, content) {
  const productId = content.params.product_id;
  const record = { _id: productId };
  const result = await Product.findById(record);
  return NextResponse.json({ result, success: true });
}

export async function DELETE(request, content) {
  const productId = content.params.product_id;
  const record = { _id: productId };
  const result = await Product.deleteOne(record);
  return NextResponse.json({ result, success: true });
}
