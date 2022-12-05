"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const producto_1 = require("../controllers/producto");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = require("../middleware/validar-campos");
const validar_jwt_1 = __importDefault(require("../middleware/validar-jwt"));
const validar_roles_1 = require("../middleware/validar-roles");
const router = (0, express_1.Router)();
router.get("/", producto_1.obtenerProductos);
router.get("/:id", [
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeProductoporID),
    //check("id").custom(categoriaActiva),
    validar_campos_1.validarCampos,
], producto_1.productoByID);
//Crear Categoria privado para cualquier usuario que tenga un token valido
router.post("/", [
    validar_jwt_1.default,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nombre").custom(db_validators_1.productoExiste),
    //check("estado", "Tiene que definir el estado").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "debe especificar la categoria").not().isEmpty(),
    (0, express_validator_1.check)("categoria").custom(db_validators_1.existeCategoriaporID),
    validar_campos_1.validarCampos,
], producto_1.crearProducto);
router.put("/:id", [
    validar_jwt_1.default,
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeProductoporID),
    //check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //check("nombre").custom(productoExiste),
    //check("categoria", "Tiene que proporcionar la categoria").not().isEmpty(),
    (0, express_validator_1.check)("categoria").custom(db_validators_1.existeCategoriaporID),
    validar_campos_1.validarCampos,
], producto_1.actualizarProducto);
router.delete("/:id", [
    validar_jwt_1.default,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)("id", "No es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeProductoporID),
    (0, express_validator_1.check)("id").custom(db_validators_1.productoActivo),
    validar_campos_1.validarCampos,
], producto_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.js.map