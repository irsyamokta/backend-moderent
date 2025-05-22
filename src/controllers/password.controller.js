import * as passwordService from "../services/password.service.js";

export const changePassword = async (req, res, next) => {
    try {
        const result = await passwordService.changePassword(req.user.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};