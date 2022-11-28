"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validar_jwt_1 = __importDefault(require("../middleware/validar-jwt"));
const db_validators_1 = require("./../helpers/db-validators");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validar_campos_1 = require("../middleware/validar-campos");
const validar_roles_1 = require("../middleware/validar-roles");
const router = (0, express_1.Router)();
router.get("/", user_1.getUser);
router.put("/:id", [
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioporID),
    validar_campos_1.validarCampos,
], user_1.putUser);
router.delete("/:id", [
    validar_jwt_1.default,
    //esAdminRole,
    (0, validar_roles_1.tieneRole)("ADMIN_ROLE", "VENTAS_ROLE"),
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioporID),
    validar_campos_1.validarCampos,
], user_1.deleteUser);
router.patch("/", user_1.patchUser);
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo no es valido").isEmail(),
    (0, express_validator_1.check)("correo").custom(db_validators_1.emailExiste),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password debe tener al menos 6 caracteres").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("role").custom(db_validators_1.validarRole),
    validar_campos_1.validarCampos,
    user_1.postUser,
]);
exports.default = router;
//# sourceMappingURL=user.js.map