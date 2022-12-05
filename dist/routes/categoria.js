"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoria_1 = require("../controllers/categoria");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = require("../middleware/validar-campos");
const validar_jwt_1 = __importDefault(require("../middleware/validar-jwt"));
const validar_roles_1 = require("../middleware/validar-roles");
const router = (0, express_1.Router)();
router.get("/", categoria_1.obtenerCategorias);
router.get("/:id", [
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeCategoriaporID),
    //check("id").custom(categoriaActiva),
    validar_campos_1.validarCampos,
], categoria_1.categoriaByID);
//Crear Categoria privado para cualquier usuario que tenga un token valido
router.post("/", [
    validar_jwt_1.default,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nombre").custom(db_validators_1.categoriaExiste),
    validar_campos_1.validarCampos,
], categoria_1.crearCategoria);
router.put("/:id", [
    validar_jwt_1.default,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeCategoriaporID),
    validar_campos_1.validarCampos,
], categoria_1.actualizarCategoria);
router.delete("/:id", [
    validar_jwt_1.default,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)("id").custom(db_validators_1.existeCategoriaporID),
    (0, express_validator_1.check)("id").custom(db_validators_1.categoriaActiva),
    validar_campos_1.validarCampos,
], categoria_1.eliminarCategoria);
exports.default = router;
//# sourceMappingURL=categoria.js.map