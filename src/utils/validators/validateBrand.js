import Joi from "joi";

export const brandValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
            .messages({
                "string.min": "Nama minimal harus 3 karakter!",
                "string.max": "Nama maksimal 50 karakter!",
                "any.required": "Nama tidak boleh kosong!"
            }),
    });

    return schema.validate(data, { abortEarly: false });
};