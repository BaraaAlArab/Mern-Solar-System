import bcryptjs from "bcryptjs";
import {errorHandler} from "../Utils/errors.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Update User
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  const {username, password, email, profilePicture, tele} = req.body;

  if (password && password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }

  try {
    const updateData = {
      username: username || undefined,
      email: email || undefined,
      profilePicture: profilePicture || undefined,
      tele: tele || undefined,
    };

    if (password) {
      updateData.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {$set: updateData},
      {new: true, runValidators: true},
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const {password: pwd, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({success: true, message: "User has been deleted"});
  } catch (error) {
    next(error);
  }
};

// Signout
export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({success: true, message: "User has been signed out"});
  } catch (error) {
    next(error);
  }
};

// Get Users
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({createdAt: sortDirection})
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map(({password, ...rest}) => rest);

    const totalUsers = await User.countDocuments();
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const lastMonthUsers = await User.countDocuments({
      createdAt: {$gte: oneMonthAgo},
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

// Get User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const {password, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Register
export const register = async (req, res, next) => {
  const {username, password, tele, email} = req.body;

  if (!username || !password || !tele || !email) {
    return res
      .status(400)
      .json({success: false, message: "All fields are required"});
  }

  try {
    const userExists = await User.findOne({email});

    if (userExists) {
      return res
        .status(400)
        .json({success: false, message: "User already exists"});
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword, tele});

    await newUser.save();
    res.status(201).json({success: true, message: "Signup successful"});
  } catch (error) {
    next(error);
  }
};

// Sign In
export const signin = async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Invalid email"});
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_Code,
      {expiresIn: "1h"}, // Token expiration can be added here
    );

    const {password: pass, ...rest} = user._doc;
    res.status(200).cookie("access_token", token, {httpOnly: true}).json(rest);
  } catch (error) {
    next(error);
  }
};

