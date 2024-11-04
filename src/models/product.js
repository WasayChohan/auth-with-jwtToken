import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },

  company: {
    type: String,
  },

  color: {
    type: String,
  },

  category: {
    type: String,
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
