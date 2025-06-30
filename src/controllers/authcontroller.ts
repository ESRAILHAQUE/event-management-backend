import { Request, Response } from "express";
import User from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, photoURL } = req.body;

  if (!name || !email || !password || !photoURL) {
   res.status(400).json({ message: "All fields are required." });
    return; 
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
     res.status(409).json({ message: "User already exists." });
     return;
  }

  // ✅ Hash the password using SHA256
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    photoURL,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        photoURL: newUser.photoURL,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};



export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  if (user.password !== hashedPassword) {
    res.status(401).json({ message: "Invalid credentials." });
    return;
  }

  // ✅ Generate JWT Token
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
    },
    token, // ✅ Include the token in the response
  });
};
