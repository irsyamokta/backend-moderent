import * as brandService from "../services/brand.service.js";

export const getBrands = async (req, res, next) => {
    try {
        const result = await brandService.getBrands();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getBrandById = async (req, res, next) => {
    try {
        const result = await brandService.getBrandById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const createBrand = async (req, res, next) => {
    try {
        const result = await brandService.createBrand(req.body, req.file);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateBrand = async (req, res, next) => {
    try {
        const result = await brandService.updateBrand(req.params.id, req.body, req.file);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteBrand = async (req, res, next) => {
    try {
        const result = await brandService.deleteBrand(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};