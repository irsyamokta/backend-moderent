import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
import { multerUpload } from "../config/multer.js";

const router = express.Router();

router.get("/all", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.patch("/update-user/:id", authMiddleware, multerUpload, updateUser);
router.delete("/delete-user/:id", authMiddleware, hasRole("ADMIN"), deleteUser);

export default router;