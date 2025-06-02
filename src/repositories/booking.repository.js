import prisma from "../config/database.js";

export const getBookings = async ({ page = 1, limit = 10, search = "", status = "" }) => {
    const skip = (page - 1) * limit;

    const where = {
        AND: [
            search ? { fullName: { contains: search, mode: "insensitive" } } : {},
            status ? { status } : {}
        ]
    };

    const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
            where,
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        imageUrl: true
                    }
                },
                vehicle: {
                    include: {
                        brand: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.booking.count({ where })
    ]);

    return {
        bookings,
        total,
        page,
        lastPage: Math.ceil(total / limit)
    };
};

export const getBookingById = async (id) =>
    prisma.booking.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    imageUrl: true
                }
            },
            vehicle: {
                include: {
                    brand: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true
                        }
                    }
                }
            }
        }
    });

export const getBookingByFullName = async (fullName) => prisma.booking.findFirst({ where: { fullName } });

export const createBooking = async (data) => prisma.booking.create({ data });

export const updateBooking = async (id, data) => prisma.booking.update({ where: { id }, data });

export const deleteBooking = async (id) => prisma.booking.delete({ where: { id } });
