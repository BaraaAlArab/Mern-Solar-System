import jwt from "jsonwebtoken";
import {errorHandler} from "../Utils/errors.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Fixed typo
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_Code, (err, decoded) => {
      if (err) {
        return next(errorHandler(401, "Unauthorized"));
      }

      req.user = decoded; // Assign the decoded user to req.user
      next();
    });
  } catch (error) {
    next(error);
  }
};
