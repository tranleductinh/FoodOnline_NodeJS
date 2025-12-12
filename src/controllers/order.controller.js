import { addOrder, updateOrder, getAllOrders, getOrderById, changeStatusOrder } from "../services/order.service.js";

export const addOrderController = async (req, res) => {
    try {
        const user_id = req.user._id;
        console.log("body",req.body)
        const order = await addOrder(user_id, req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderController = async (req, res) => {
    try {
        const order = await updateOrder(req.params.id, req.body.status);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderByIdController = async (req, res) => {
    try {
        const order = await getOrderById(req.user._id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const changeStatusOrderController = async (req, res) => {
    try {
        const order = await changeStatusOrder(req.params.id, req.body.status);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};