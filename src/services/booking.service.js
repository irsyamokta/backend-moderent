import * as booking from "../repositories/booking.repository.js";
import { BadRequestError, NotFoundError, ForbiddenError } from "../utils/errors.utils.js";

export const getBookings = async ({ page = 1, limit = 10, search = "", status = "" }) => {
    const bookings = await booking.getBookings({ page, limit, search, status });

    return bookings;
};

export const getBookingById = async (id) => {
    const booking = await booking.getBookingById(id);
    if (!booking) throw new NotFoundError("Booking tidak ditemukan");

    return booking;
};

export const createBooking = async (data) => {
    const {
        userId,
        vehicleId,
        fullName,
        deliveryAddress,
        phoneNumber,
        rentDate,
        returnDate,
        paymentMethod
    } = data;

    const existingBooking = await booking.getBookingByFullName(fullName);
    if (existingBooking) throw new ForbiddenError("Booking sudah terdaftar");

    const newBooking = await booking.createBooking({
        userId,
        vehicleId,
        fullName,
        deliveryAddress,
        phoneNumber,
        rentDate: new Date(rentDate),
        returnDate: new Date(returnDate),
        paymentMethod,
        status: "PENDING"
    });

    return newBooking;
};

export const updateBooking = async (id, data) => {
    const booking = await booking.getBookingById(id);
    if (!booking) throw new NotFoundError("Booking tidak ditemukan");

    return await booking.updateBooking(id, data);
};