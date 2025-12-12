import {
  addCart,
  minusCart,
  getCart,
  deleteCart,
  deleteAllCart,
} from "../services/cart.service.js";
import { success, error } from "../utils/response.js";

export const addCartController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { _id } = req.body;
    const items = [{ food_id: _id }];
    const cart = await addCart(user_id, items);
    return success(res, cart, "Cart updated successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const minusCartController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { _id } = req.body;
    const cart = await minusCart(user_id, _id);
    return success(res, cart, "Cart updated successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const getCartController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const cart = await getCart(user_id);
    return success(res, cart, "Cart fetched successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { _id } = req.params;
    const cart = await deleteCart(user_id, _id);
    return success(res, cart, "Cart deleted successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const deleteAllCartController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const cart = await deleteAllCart(user_id);
    return success(res, cart, "Cart deleted successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};
