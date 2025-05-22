import express from "express";
import { changePassword } from "../controllers/password.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/change-password", authMiddleware, changePassword);

export default router;