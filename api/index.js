import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import xssClean from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "../src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        res.status(429).json({
            status: "fail",
            message: "Too many requests, please try again later",
        });
    },
});

app.use(limiter);
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(morgan("dev"));
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

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