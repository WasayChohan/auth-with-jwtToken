import Connection from "@/database/config";
import Product from "@/models/product";
import multer from "multer";

import { NextRequest, NextResponse } from "next/server";

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

const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Route Configuration
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser for file uploads
  },
};

export async function POST(req) {
  try {
    // Wait for Multer to process the form data
    const form = upload.single("image"); // Expect a single 'image' file field

    const parsedForm = new Promise((resolve, reject) => {
      form(req, {}, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    await parsedForm; // Wait for the form processing to finish

    // Parse the rest of the fields from the form data
    const { name, price, company, color, category } = req.body;
    const imageFile = req.file;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new Product document with the image data as a Buffer
    const newProduct = new Product({
      name,
      price,
      company,
      color,
      category,
      image: {
        data: imageFile.buffer, // Store the image data as a Buffer
        contentType: imageFile.mimetype, // Store the MIME type (optional)
      },
    });

    // Save the product to MongoDB
    await newProduct.save();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to save product",
    });
  }
}
