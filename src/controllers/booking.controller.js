import * as bookingService from "../services/booking.service.js";

export const getBookings = async (req, res, next) => {
    try {
        const { page = "1", limit = "10", search = "", status = "" } = req.query;
        const params = {
            page: parseInt(page),
            limit: parseInt(limit),
            search,
            role
        };

        const result = await bookingService.getBookings(params);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const result = await bookingService.getBookingById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const createBooking = async (req, res, next) => {
    try {
        const result = await bookingService.createBooking(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        const result = await bookingService.updateBooking(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}