import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const valideUser = await User.findOne({ username });
    if (!valideUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, valideUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign({ id: valideUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //separate password
    const { password: pass, ...rest } = valideUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ rest });
  } catch (error) {
    next(error);
  }
};
