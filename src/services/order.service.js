import Food from "../models/food.model.js";
import Order from "../models/order.models.js";
import User from "../models/user.model.js";

export const addOrder = async (user_id, data) => {
  try {
    const { items, payment_method, total } = data;

    if (!user_id || !Array.isArray(items) || items.length === 0) {
      const error = new Error("Invalid order data");
      error.status = 400;
      error.errorCode = "INVALID_ORDER_DATA";
      throw error;
    }

    const user = await User.findById(user_id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      error.errorCode = "USER_NOT_FOUND";
      throw error;
    }

    const snapshot = [];

    for (const item of items) {
      const food = await Food.findById(item.food_id);
      if (!food) {
        const error = new Error("Food not found");
        error.status = 404;
        error.errorCode = "FOOD_NOT_FOUND";
        throw error;
      }

      snapshot.push({
        food_id: food._id,
        name: food.name,

        price: food.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user_id,
      items: snapshot,
      total_amount: total,
      payment_method,
      status: "pending",
    })

    return order;
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await Order.find({}).populate("user_id", "name email");
    return orders;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (user_id) => {
  try {
    const order = await Order.find({ user_id }).populate(
      "user_id",
      "name email"
    );
    return order;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (id, status) => {
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      const errors = new Error();
      errors.message = "Order not found";
      errors.status = 404;
      errors.errorCode = "ORDER_NOT_FOUND";
      throw errors;
    }
    return order;
  } catch (error) {
    throw error;
  }
};

export const changeStatusOrder = async (id, status) => {
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      const errors = new Error();
      errors.message = "Order not found";
      errors.status = 404;
      errors.errorCode = "ORDER_NOT_FOUND";
      throw errors;
    }
    return order;
  } catch (error) {
    throw error;
  }
};
