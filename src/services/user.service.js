import * as userRepository from "../repositories/user.repository.js";
import { NotFoundError, BadRequestError } from "../utils/errors.utils.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";
import { updateProfileValidator } from "../utils/validators/index.js";

export const getUsers = async ({ page = 1, limit = 10, search = "", role = "" }) => {
    const users = await userRepository.getUsers({ page, limit, search, role });
    return users;
};

export const getUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
    return user;
};

export const updateUser = async (userId, data, file) => {
    const { error } = updateProfileValidator(data);
    if (error) throw new BadRequestError("Validation failed", error.details.map(err => err.message));

    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const { name, email, phone } = data;
    if (email !== user.email) {
        const existingUser = await userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new BadRequestError("Email already exists");
        }
    }

    let fileUrl = user.imageUrl;
    let publicId = user.publicId;

    if (file) {
        if (publicId) {
            await deleteImageFromCloudinary(publicId);
        }
        const { fileUrl: newFileUrl, publicId: newPublicId } = await uploadImage(file, "users");

        fileUrl = newFileUrl;
        publicId = newPublicId;
    }

    const payload = { name, email, phone, imageUrl: fileUrl, publicId };
    const updatedUser = await userRepository.updateUser(userId, payload);
    return updatedUser;
};

export const deleteUser = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    if (user.publicId) await deleteImageFromCloudinary(user.publicId);

    await userRepository.deleteUser(userId);

    return { message: "User berhasil dihapus" };
};

