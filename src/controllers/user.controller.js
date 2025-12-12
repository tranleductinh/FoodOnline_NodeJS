import { success, error } from "../utils/response.js";
import { getAllUsers } from "../services/user.service.js";
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return success(res, users, "Users fetched successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};
