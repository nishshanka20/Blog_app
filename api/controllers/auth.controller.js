import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json("signup successfully");
  } catch (err) {
    next(err);
  }
};
