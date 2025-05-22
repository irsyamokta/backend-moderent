import * as vehicleService from "../services/vehicle.service.js";


export const getVehicles = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = "", status = "" } = req.query;
        const params = { page, limit, search, status };

        const vehicles = await vehicleService.getVehicles(params);
        res.status(200).json(vehicles);
    } catch (error) {
        next(error);
    }
};

export const getVehicleById = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.getVehicleById(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
};

export const createVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body, req.file);
        res.status(201).json(vehicle);
    } catch (error) {
        next(error);
    }
};

export const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.updateVehicle(req.params.id, req.body, req.file);
        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
};

export const deleteVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.deleteVehicle(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
};