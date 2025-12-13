import { addOrder, updateOrder, getAllOrders, getOrderById, changeStatusOrder } from "../services/order.service.js";
import { getUser } from "../services/user.service.js";
import { getIO } from "../socket/socket.js";
import { success ,error } from "../utils/response.js";
export const addOrderController = async (req, res) => {
    try {
        const user_id = req.user._id;
        console.log("body",req.body)
        const order = await addOrder(user_id, req.body);
        const user = await getUser(user_id);
        try {
            const io = getIO();
            io.to("user").emit("data socket");
            io.to("admin").emit("NEW ORDER", { message: `Có đơn hàng mới từ ${user.name}` });
        } catch (err) {
            return error(res, err.errorCode, err.message, err.status);
        }
        return success(res, order, "Order added successfully", 201);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrders();
        return success(res, orders, "Orders fetched successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
};

export const updateOrderController = async (req, res) => {
    try {
        const order = await updateOrder(req.params.id, req.body.status);
        return success(res, order, "Order updated successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
};

export const getOrderByIdController = async (req, res) => {
    try {
        const order = await getOrderById(req.user._id);
        return success(res, order, "Order fetched successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
};

export const changeStatusOrderController = async (req, res) => {
    try {
        const order = await changeStatusOrder(req.params.id, req.body.status);
        return success(res, order, "Order updated successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
};