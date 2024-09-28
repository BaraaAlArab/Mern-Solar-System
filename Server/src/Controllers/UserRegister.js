import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt_Code from "jsonwebtoken";

export const register = async (req, res, next) => {
  const {username, password, tele, email} = req.body;

  if (!username || !password || !tele || !email) {
    return (
      res.status(400), {success: false, message: "All fields are required"}
    );
  }
  try {
    const userExists = await User.findOne({email});

    if (userExists) {
      return res
        .status(400)
        .json({success: false, message: "User already exists"});
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      tele,
    });

    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

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
    const isValidPassword = bcryptjs.compareSync(password, user.password, 10);
    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt_Code.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.jwt_Code,
    );
    const {password: pass, ...rest} = user._doc;
    res
      .status(200)
      .cookie("Access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//For Logout
export const Logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("user has been signed out");
  } catch (error) {
    next(error);
  }
};
