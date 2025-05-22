import express from "express";
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
import { multerUpload } from "../config/multer.js";

const router = express.Router();

router.get("/all", getVehicles);
router.get("/:id", getVehicleById);
router.post("/create-vehicle", authMiddleware, hasRole("ADMIN"), multerUpload, createVehicle);
router.patch("/update-vehicle/:id", authMiddleware, hasRole("ADMIN"), multerUpload, updateVehicle);
router.delete("/delete-vehicle/:id", authMiddleware, hasRole("ADMIN"), deleteVehicle);

export default router;