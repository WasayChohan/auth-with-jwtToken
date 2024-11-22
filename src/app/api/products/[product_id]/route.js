import Connection from "@/database/config";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // Store uploaded files in the 'public/uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
  },
});

const upload = multer({ storage: storage }).single("file");

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
