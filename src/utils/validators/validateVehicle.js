import Joi from "joi";

const statusEnum = ["Available", "Unavailable", "Rented"];

export const vehicleValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.base": "Nama kendaraan harus berupa teks!",
                "string.min": "Nama kendaraan minimal 2 karakter!",
                "string.max": "Nama kendaraan maksimal 100 karakter!",
                "any.required": "Nama kendaraan tidak boleh kosong!"
            }),

        type: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.base": "Tipe kendaraan harus berupa teks!",
                "string.min": "Tipe kendaraan minimal 2 karakter!",
                "string.max": "Tipe kendaraan maksimal 50 karakter!",
                "any.required": "Tipe kendaraan tidak boleh kosong!"
            }),

        price: Joi.number()
            .integer()
            .min(0)
            .required()
            .messages({
                "number.base": "Harga harus berupa angka!",
                "number.min": "Harga tidak boleh kurang dari 0!",
                "any.required": "Harga tidak boleh kosong!"
            }),

        status: Joi.string()
            .valid(...statusEnum)
            .default("Available")
            .messages({
                "any.only": `Status hanya boleh salah satu dari: ${statusEnum.join(", ")}`,
                "string.base": "Status harus berupa teks!"
            }),

        year: Joi.number()
            .integer()
            .min(1900)
            .max(new Date().getFullYear())
            .required()
            .messages({
                "number.base": "Tahun harus berupa angka!",
                "number.min": "Tahun minimal 1900!",
                "number.max": "Tahun tidak boleh melebihi tahun sekarang!",
                "any.required": "Tahun tidak boleh kosong!"
            }),

        seat: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.base": "Jumlah kursi harus berupa angka!",
                "number.min": "Jumlah kursi minimal 1!",
                "any.required": "Jumlah kursi tidak boleh kosong!"
            }),

        horsepower: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.base": "Horse power harus berupa angka!",
                "number.min": "Horse power minimal 1!",
                "any.required": "Horse power tidak boleh kosong!"
            }),

        description: Joi.string()
            .min(10)
            .required()
            .messages({
                "string.base": "Deskripsi harus berupa teks!",
                "string.min": "Deskripsi minimal 10 karakter!",
                "any.required": "Deskripsi tidak boleh kosong!"
            }),

        spesification: Joi.string()
            .min(5)
            .required()
            .messages({
                "string.base": "Spesifikasi harus berupa teks!",
                "string.min": "Spesifikasi minimal 5 karakter!",
                "any.required": "Spesifikasi tidak boleh kosong!"
            }),

        brandId: Joi.string()
            .uuid()
            .required()
            .messages({
                "string.guid": "ID brand harus berupa UUID yang valid!",
                "any.required": "ID brand tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};