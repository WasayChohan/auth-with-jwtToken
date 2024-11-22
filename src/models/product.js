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
    type: String, // Store the image filename or path
    required: true,
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
