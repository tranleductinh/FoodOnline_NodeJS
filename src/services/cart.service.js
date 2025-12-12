import Cart from "../models/cart.model.js";
import Food from "../models/food.model.js";
import User from "../models/user.model.js";

export const addCart = async (user_id, items) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      error.errorCode = "USER_NOT_FOUND";
      throw error;
    }

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      for (const item of items) {
        const food = await Food.findById(item.food_id);
        if (!food) {
          const error = new Error("Food not found");
          error.status = 404;
          error.errorCode = "FOOD_NOT_FOUND";
          throw error;
        }
      }

      cart = await Cart.create({
        user_id,
        items: items.map((item) => ({
          food_id: item.food_id,
          quantity: item.quantity || 1,
        })),
      });

      return cart;
    }

    for (const newItem of items) {
      const food = await Food.findById(newItem.food_id);
      if (!food) {
        const error = new Error("Food not found");
        error.status = 404;
        error.errorCode = "FOOD_NOT_FOUND";
        throw error;
      }

      const existItem = cart.items.find((item) =>
        item.food_id.equals(newItem.food_id)
      );

      if (existItem) {
        existItem.quantity += newItem.quantity || 1;
      } else {
        cart.items.push({
          food_id: newItem.food_id,
          quantity: newItem.quantity || 1,
        });
      }
    }
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (user_id) => {
  try {
    const cart = await Cart.findOne({ user_id }).populate(
      "items.food_id",
      "name price image_url"
    );

    if (!cart) {
      const error = new Error("Cart not found");
      error.status = 404;
      error.errorCode = "CART_NOT_FOUND";
      throw error;
    }

    return cart;
  } catch (error) {
    throw error;
  }
};

export const minusCart = async (user_id, food_id) => {
  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      const error = new Error("Cart not found");
      error.status = 404;
      error.errorCode = "CART_NOT_FOUND";
      throw error;
    }
    const item = cart.items.find(
      (item) => item.food_id.toString() === food_id.toString()
    );
    if (!item) {
      const error = new Error("Item not found in cart");
      error.status = 404;
      error.errorCode = "ITEM_NOT_FOUND";
      throw error;
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.food_id.toString() !== food_id.toString()
      );
    }
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (user_id, food_id) => {
  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      const error = new Error("Cart not found");
      error.status = 404;
      error.errorCode = "CART_NOT_FOUND";
      throw error;
    }
    const item = cart.items.find(
      (item) => item.food_id.toString() === food_id.toString()
    );
    if (!item) {
      const error = new Error("Item not found in cart");
      error.status = 404;
      error.errorCode = "ITEM_NOT_FOUND";
      throw error;
    }
    cart.items = cart.items.filter(
      (item) => item.food_id.toString() !== food_id.toString()
    );
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteAllCart = async (user_id) => {
  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      const error = new Error("Cart not found");
      error.status = 404;
      error.errorCode = "CART_NOT_FOUND";
      throw error;
    }
    cart.items = [];
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
    
};
