import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const orderItemSchema = new mongoose.Schema(
  {
    food_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => `ORD-${uuidv4().slice(0,3)}`,
        required: true
    },
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    total_amount: {
        type: Number,
        required: true,
        set: v => Number(v.toFixed(2))
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid','completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});
const Order = mongoose.model('Order', orderSchema);    
export default Order