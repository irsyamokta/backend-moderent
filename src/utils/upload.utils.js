import cloudinary from "../config/cloudinary.js";
import { BadRequestError } from "./errors.utils.js";

export const uploadImage = async (file, category) => {
    if (!file) return { message: "No file uploaded" };

    const allowedImageTypes = ["image/png", "image/jpeg"];
    if (!allowedImageTypes.includes(file.mimetype)) {
        throw new BadRequestError("Hanya file gambar yang diperbolehkan!", ["Upload image error"]);
    }

    let folder = "moderent";
    if (category === "profile") folder = `${folder}/profile`;
    if (category === "brands") folder = `${folder}/brands`;
    if (category === "vehicles") folder = `${folder}/vehicles`;

    const result = await uploadToCloudinary(file, folder);
    return {
        fileUrl: result.secure_url,
        publicId: result.public_id
    };
};

const uploadToCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    return reject(new BadRequestError("Upload ke Cloudinary gagal", [error.message]));
                }

                return resolve(result);
            }
        );
        stream.end(file.buffer);
    });
};

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        throw new BadRequestError("Gagal menghapus gambar!", ["Delete image error"]);
    }
};