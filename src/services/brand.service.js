import * as brandRepository from "../repositories/brand.repository.js";
import { BadRequestError, NotFoundError, ForbiddenError } from "../utils/errors.utils.js";
import { brandValidator } from "../utils/validators/index.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";

export const getBrands = async () => brandRepository.getBrands();

export const getBrandById = async (id) => {
    const brand = await brandRepository.getBrandById(id);
    if (!brand) throw new NotFoundError("Brand tidak ditemukan");

    return brand;
} 

export const createBrand = async (data, file) => {
    const { error } = brandValidator(data);
    if (error) {
        throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));
    }

    const { name } = data;
    const existingBrand = await brandRepository.getBrandByName(name);
    if (existingBrand) throw new ForbiddenError("Brand sudah terdaftar");

    const { fileUrl, publicId } = await uploadImage(file, "brands");

    const payload = { name, imageUrl: fileUrl, publicId: publicId };
    const brand = await brandRepository.createBrand(payload);

    return { message: "Brand berhasil dibuat", data: brand };
};

export const updateBrand = async (id, data, file) => {
    const { error } = brandValidator(data);
    if (error) {
        throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));
    }

    const brand = await brandRepository.getBrandById(id);
    if (!brand) throw new NotFoundError("Brand tidak ditemukan");

    const { name } = data;
    const existingBrand = await brandRepository.getBrandByName(name);
    if (existingBrand && existingBrand.id !== id) throw new ForbiddenError("Brand sudah terdaftar");

    let fileUrl = brand.imageUrl;
    let publicId = brand.publicId;
    if (file) {
        await deleteImageFromCloudinary(publicId);
        const { fileUrl: newFileUrl, publicId: newPublicId } = await uploadImage(file, "brands");
        fileUrl = newFileUrl;
        publicId = newPublicId;
    }

    const payload = { name, imageUrl: fileUrl, publicId: publicId };

    const updatedBrand = await brandRepository.updateBrand(id, payload);
    
    return { message: "Brand berhasil diperbarui", data: updatedBrand };
};

export const deleteBrand = async (id) => {
    const brand = await brandRepository.getBrandById(id);
    if (!brand) throw new NotFoundError("Brand tidak ditemukan");

    if(brand.publicId) await deleteImageFromCloudinary(brand.publicId);

    await brandRepository.deleteBrand(id);

    return { message: "Brand berhasil dihapus" };
};