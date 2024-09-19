import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
