import * as vehicleRepository from "../repositories/vehicle.repository.js";
import { vehicleValidator } from "../utils/validators/index.js";
import { BadRequestError, NotFoundError } from "../utils/errors.utils.js";
import { uploadImage, deleteImageFromCloudinary } from "../utils/upload.utils.js";

export const getVehicles = async ({ page = 1, limit = 10, search = "", status = "" }) => {
    const vehicles = await vehicleRepository.getVehicles({ page, limit, search, status });

    return vehicles;
};

export const getVehicleById = async (id) => {
    const vehicle = await vehicleRepository.getVehicleById(id);
    if (!vehicle) throw new NotFoundError("Vehicle tidak ditemukan");

    return vehicle;
};

export const createVehicle = async (data, file) => {
    const { error } = vehicleValidator(data);
    if (error) {
        throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));
    }

    const { name, type, price, status, year, seat, horsepower, description, spesification, brandId } = data;
    const parsePrice = parseInt(price.replace(/\D/g, ""));
    const parseYear = parseInt(year.replace(/\D/g, ""));
    const parseSeat = parseInt(seat.replace(/\D/g, ""));
    const parseHorsepower = parseInt(horsepower.replace(/\D/g, ""));

    const { fileUrl, publicId } = await uploadImage(file, "vehicles");

    const payload = { name, type, price: parsePrice, status, year: parseYear, seat: parseSeat, horse_power: parseHorsepower, description, spesification, imageUrl: fileUrl, publicId, brandId };
    const vehicle = await vehicleRepository.createVehicle(payload);

    return { message: "Vehicle berhasil dibuat", data: vehicle };
};

export const updateVehicle = async (id, data, file) => {
    const { error } = vehicleValidator(data);
    if (error) {
        throw new BadRequestError("Validasi gagal", error.details.map(err => err.message));
    }

    const vehicle = await vehicleRepository.getVehicleById(id);
    if (!vehicle) throw new NotFoundError("Vehicle tidak ditemukan");

    const { name, type, price, status, year, seat, horsepower, description, spesification, brandId } = data;
    const parsePrice = parseInt(price.replace(/\D/g, ""));
    const parseYear = parseInt(year.replace(/\D/g, ""));
    const parseSeat = parseInt(seat.replace(/\D/g, ""));
    const parseHorsepower = parseInt(horsepower.replace(/\D/g, ""));

    let fileUrl = vehicle.imageUrl;
    let publicId = vehicle.publicId;
    if (file) {
        await deleteImageFromCloudinary(publicId);
        const { fileUrl: newFileUrl, publicId: newPublicId } = await uploadImage(file, "vehicles");
        fileUrl = newFileUrl;
        publicId = newPublicId;
    }

    const payload = { name, type, price: parsePrice, status, year: parseYear, seat: parseSeat, horse_power: parseHorsepower, description, spesification, imageUrl: fileUrl, publicId, brandId };
    const updatedVehicle = await vehicleRepository.updateVehicle(id, payload);

    return { message: "Vehicle berhasil diperbarui", data: updatedVehicle };
};

export const deleteVehicle = async (id) => {
    const vehicle = await vehicleRepository.getVehicleById(id);
    if (!vehicle) throw new NotFoundError("Vehicle tidak ditemukan");

    if (vehicle.publicId) await deleteImageFromCloudinary(vehicle.publicId);

    await vehicleRepository.deleteVehicle(id);

    return { message: "Vehicle berhasil dihapus" };
};