import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  fileName: { type: String, required: true }, // Name of the file
  filePath: { type: String, required: true }, // Path to the file
  contentType: { type: String, required: true }, // MIME type
  uploadedAt: { type: Date, default: Date.now }, // Timestamp
});

const Image = mongoose.models.images || mongoose.model("images", imageSchema);

export default Image;
