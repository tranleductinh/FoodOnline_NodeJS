import { addFood, updateFood, deleteFood, getAllFoods, changeAvailable } from "../services/food.service.js";
import { validationResult } from "express-validator";
import {success, error} from "../utils/response.js";
export const addFoodController = async(req,res) => {
    try {
        console.log("req",req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((e) => ({
                field: e.param,
                message: e.msg,
            }));
            return error(res, "VALIDATION_ERROR", formattedErrors[0].msg, null);
        }
        const food = await addFood(req.body);
        return success(res, food, "Food added successfully", 201);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
}

export const updateFoodController = async(req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((e) => ({
                field: e.param,
                message: e.msg,
            }));
            return error(res, "VALIDATION_ERROR", formattedErrors[0].msg, null);
        }
        const food = await updateFood(req.params.id,req.body);
        return success(res, food, "Food updated successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
}

export const deleteFoodController = async(req,res) => {
    try {
        const food = await deleteFood(req.params.id);
        return success(res, food, "Food deleted successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
}

export const getAllFoodsController = async(req,res) => {
    try {
        const foods = await getAllFoods();
        return success(res, foods, "Foods fetched successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
}

export const changeAvailableController = async(req,res) => {
    try {
        const food = await changeAvailable(req.params.id,req.body.is_available);
        return success(res, food, "Food updated successfully", 200);
    } catch (err) {
        return error(res, err.errorCode, err.message, err.status);
    }
}