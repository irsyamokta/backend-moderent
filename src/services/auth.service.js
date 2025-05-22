import * as authRepository from "../repositories/auth.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as sessionService from "../services/session.service.js";
import * as tokenService from "../utils/token.utils.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import { registerValidator, loginValidator } from "../utils/validators/index.js";
import { BadRequestError, UnauthorizedError, ForbiddenError } from "../utils/errors.utils.js";

export const register = async (data) => {
    const { error } = registerValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { name, email, phone, password, passwordConfirmation } = data;
    const existingUser = await authRepository.getUserByEmail(email);
    if (existingUser) throw new ForbiddenError("Akun sudah terdaftar");

    const hashedPassword = await hashPassword(password);

    const registerData = {
        name,
        email,
        phone,
        password: hashedPassword,
    }

    await authRepository.createUser(registerData);

    return { message: "Akun berhasil dibuat" };
};

export const login = async (data, req, res) => {
    const { error } = loginValidator(data);
    if (error) throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));

    const { email, password } = data;
    const user = await authRepository.getUserByEmail(email);
    if (!user) throw new UnauthorizedError("Akun tidak ditemukan");

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) throw new UnauthorizedError("Kredensial tidak valid");

    const userAgent = req.get("user-agent") || "unknown";
    const ipAddress = req.ip;

    const { refreshToken } = await sessionService.createSession(user.id, userAgent, ipAddress);
    res.cookie("refreshToken", refreshToken, tokenService.cookieOptions());

    return { message: "Login berhasil", data: { id: user.id, name: user.name, role: user.role } };
};

export const logout = async (cookies) => {
    const { refreshToken } = cookies;
    if (refreshToken) await sessionService.invalidateSession(refreshToken);
    return { message: "Berhasil logout" };
};

export const refreshToken = async (cookies, req, res) => {
    const { refreshToken } = cookies;
    if (!refreshToken) throw new UnauthorizedError("Tidak ada token yang diberikan");

    const { accessToken, newRefreshToken } = await sessionService.rotateRefreshToken(refreshToken, req);
    res.cookie("refreshToken", newRefreshToken, tokenService.cookieOptions());
    return { accessToken };
};

export const me = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new UnauthorizedError("Tidak ada token yang diberikan");

    const dataUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        imageUrl: user.imageUrl,
    }

    return dataUser;
};