import User from "../models/userModel.js";

// get all users
export const getAllUsers = async () => {
  return await User.find({}, "-password");
};

// get single user by id
export const getUserById = async (id) => {
  return await User.findById(id, "-password");
};
