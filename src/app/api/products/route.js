import { writeFile } from "fs/promises";
import path from "path";
import Product from "@/models/product";
import Connection from "@/database/config";
import { NextResponse } from "next/server";
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

export async function POST(req) {
  try {
    const data = await req.formData();

    // Extract product fields
    const name = data.get("name");
    const price = parseFloat(data.get("price"));
    const company = data.get("company");
    const color = data.get("color");
    const category = data.get("category");
    const file = data.get("file"); // Uploaded file

    if (!name || !price || !company || !color || !category || !file) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Save the file locally
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Save product data with image reference to MongoDB
    const product = new Product({
      name,
      price,
      company,
      color,
      category,
      image: `public/uploads/${filename}`, // Store the relative path
    });

    await product.save();

    return NextResponse.json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
