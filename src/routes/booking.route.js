import express from "express";
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from "../controllers/brand.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
import { multerUpload } from "../config/multer.js";

const router = express.Router();

router.get("/all", getBrands);
router.get("/:id", getBrandById);
router.post("/create-brand", authMiddleware, hasRole("ADMIN"), multerUpload, createBrand);
router.patch("/update-brand/:id", authMiddleware, hasRole("ADMIN"), multerUpload, updateBrand);
router.delete("/delete-brand/:id", authMiddleware, hasRole("ADMIN"), deleteBrand);

export default router;