import Food from "../models/food.model.js";

export const addFood = async ( data ) => {
  try {
    const food = await Food.create( data );
    return food;
  } catch (error) {
    throw error;
  }
};

export const updateFood = async (_id,  data ) => {
  try {
    const food = await Food.findByIdAndUpdate(_id, data, { new: true });
    if(!food) {
      const errors = new Error();
      errors.message = "Food not found";
      errors.status = 404;
      errors.errorCode = "FOOD_NOT_FOUND";
      throw errors;
    }
    return food;
  } catch (error) {
    throw error;
  }
};

export const deleteFood = async (_id) => {
  try {
    const food = await Food.findByIdAndDelete(_id);
    if (!food) {
      const errors = new Error();
      errors.message = "Food not found";
      errors.status = 404;
      errors.errorCode = "FOOD_NOT_FOUND";
      throw errors;
    }
    return food;
  } catch (error) {
    throw error;
  }
};

export const getAllFoods = async () => {
  try {
    const foods = await Food.find({});
    return foods;
  } catch (error) {
    throw error;
  }
};

export const changeAvailable = async (id, is_available) => {
  try {
    const food = await Food.findByIdAndUpdate(id, { is_available }, { new: true });
    if (!food) {
      const errors = new Error();
      errors.message = "Food not found";
      errors.status = 404;
      errors.errorCode = "FOOD_NOT_FOUND";
      throw errors;
    }
    return food;
  } catch (error) {
    throw error;
  }
};
