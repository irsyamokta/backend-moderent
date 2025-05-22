import * as passwordRepository from "../repositories/password.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as passwordUtils from "../utils/password.utils.js";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../utils/errors.utils.js";
import { changePasswordValidator } from "../utils/validators/index.js";

export const changePassword = async (userId, data) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const { error } = changePasswordValidator(data);
    if (error) throw new BadRequestError("Validation failed", error.details.map(err => err.message));

    const { currentPassword, newPassword } = data;
    
    const isPasswordMatch = await passwordUtils.verifyPassword(currentPassword, user.password);
    if (!isPasswordMatch) throw new UnauthorizedError("Password saat ini salah!");

    const hashedPassword = await passwordUtils.hashPassword(newPassword);
    await passwordRepository.updateUserPassword(userId, { password: hashedPassword });

    return { message: "Password berhasil diubah" };
};
