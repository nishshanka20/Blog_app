import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
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
    console.log(err);
    res.status(500).send("Error creating user");
  }
};
