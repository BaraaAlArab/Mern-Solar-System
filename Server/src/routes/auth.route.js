import express from "express";
import {Logout, register, signin} from "../Controllers/UserRegister.js";

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/Logout", Logout);

export default router;
