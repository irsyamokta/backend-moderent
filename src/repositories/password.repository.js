import prisma from "../config/database.js";

export const updateUserPassword = async (userId, data) => prisma.user.update({ where: { id: userId }, data });