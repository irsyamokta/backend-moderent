import { registerValidator, loginValidator } from "./validateAuth.js";
import { changePasswordValidator } from "./validatePassword.js";
import { updateProfileValidator} from "./validateUser.js";
import { brandValidator } from "./validateBrand.js";
import { vehicleValidator } from "./validateVehicle.js";

export { 
    registerValidator, 
    loginValidator, 
    changePasswordValidator, 
    updateProfileValidator,
    brandValidator,
    vehicleValidator
};