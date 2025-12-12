import mongoose, { mongo } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      set: v => Number(v.toFixed(2))
    },
    category: {
      type: String,
    },
    image_url: {
      type: String,
      default:
        "https://www.shutterstock.com/shutterstock/videos/1102880351/thumb/1.jpg?ip=x480",
    },
    is_available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Food = mongoose.model("Food", foodSchema);
export default Food;
