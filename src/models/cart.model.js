import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema(
  {
    food_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [cartItemSchema],
        required: true
    }
}, {
    timestamps: true
});
const Cart = mongoose.model('Cart', cartSchema);
export default Cart