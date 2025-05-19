import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, role: user.role, status: user.status },
        ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );
};

export const refreshTokens = (user) => {
    return generateTokens(user);
};

export const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
});
