import Joi from "joi";

export const changePasswordValidator = (data) => {
    const schema = Joi.object({
        currentPassword: Joi.string()
            .min(8)
            .required()
            .messages({
                "any.required": "Password saat ini tidak boleh kosong!"
            }),

        newPassword: Joi.string()
            .min(8)
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                "string.min": "Password minimal harus 8 karakter!",
                "string.pattern.base": "Password harus mengandung huruf, angka, dan karakter spesial!",
                "any.required": "Password tidak boleh kosong!"
            })
    });

    return schema.validate(data, { abortEarly: false });
};