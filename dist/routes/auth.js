"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middleware/validar-campos");
const router = (0, express_1.Router)();
router.post("/login", [
    (0, express_validator_1.check)("correo", "El correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contrasenna es obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map