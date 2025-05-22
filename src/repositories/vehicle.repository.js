import prisma from "../config/database.js";

export const getVehicles = async ({ page = 1, limit = 10, search = "", status = "" }) => {
    const skip = (page - 1) * limit;

    const where = {
        AND: [
            search ? { name: { contains: search, mode: "insensitive" } } : {},
            status ? { status } : {}
        ]
    };

    const [vehicles, total] = await Promise.all([
        prisma.vehicle.findMany({
            where,
            skip,
            take: limit,
            include: {
                brand: {
                    select: {
                        name: true
                    }
                }
            }
        }),
        prisma.vehicle.count({ where })
    ]);

    return {
        vehicles,
        total,
        page,
        lastPage: Math.ceil(total / limit)
    };
};

export const getVehicleById = async (id) => prisma.vehicle.findUnique({ where: { id }, include: { brand: { select: { name: true } } } });

export const createVehicle = async (data) => prisma.vehicle.create({ data });

export const updateVehicle = async (id, data) => prisma.vehicle.update({ where: { id }, data });

export const deleteVehicle = async (id) => prisma.vehicle.delete({ where: { id } });