import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import xssClean from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "../src/routes/auth.route.js";
import brandRoutes from "../src/routes/brand.route.js";
import vehicleRoutes from "../src/routes/vehicle.route.js";
import userRoutes from "../src/routes/user.route.js";
import passwordRoutes from "../src/routes/password.route.js";

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (/^http:\/\/localhost:\d+$/.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
};

app.set('trust proxy', 1);

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);

app.use((req, res, next) => res.status(404).json({ message: "Route not found" }));

app.get("/", (req, res) => res.send("Server is running"));

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Terjadi kesalahan pada server",
        errors: err.details || undefined,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});