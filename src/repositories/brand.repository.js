import prisma from "../config/database.js";

export const getBrands = async () => prisma.brand.findMany();

export const getBrandById = async (id) => prisma.brand.findUnique({ where: { id } });

export const getBrandByName = async (name) => prisma.brand.findUnique({ where: { name } });

export const createBrand = async (data) => prisma.brand.create({ data });

export const updateBrand = async (id, data) => prisma.brand.update({ where: { id }, data });

export const deleteBrand = async (id) => prisma.brand.delete({ where: { id } });