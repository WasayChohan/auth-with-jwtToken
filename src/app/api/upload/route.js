import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import Image from "@/models/image"; // Image schema
import Connection from "@/database/config"; // Database connection

Connection(); // Establish connection to MongoDB

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded", success: false });
    }

    // Convert file to Buffer and save it to the public/uploads directory
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    // Save file metadata to the Image collection
    const newImage = await Image.create({
      fileName: file.name,
      filePath: `./public/uploads/${file.name}`,
      contentType: file.type,
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      image: newImage,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "File upload failed", success: false });
  }
}
