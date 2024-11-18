import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    data: Buffer,
    contentType: String, // Optional: can be used to store the image MIME type
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
