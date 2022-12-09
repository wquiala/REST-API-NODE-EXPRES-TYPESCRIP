"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const db_validators_1 = require("../helpers/db-validators");
const validar_archivosSubir_1 = require("../middleware/validar-archivosSubir");
const validar_campos_1 = require("../middleware/validar-campos");
const router = (0, express_1.Router)();
router.get("/:coleccion/:id", [
    (0, express_validator_1.check)("id", "debe ser un id valido").isMongoId(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, db_validators_1.existeColeccion)(c, ["usuarios", "productos"])),
    validar_campos_1.validarCampos,
], uploads_1.MostrarImg);
router.post("/", validar_archivosSubir_1.validarArchivos, uploads_1.upload);
router.put("/:coleccion/:id", [
    validar_archivosSubir_1.validarArchivos,
    (0, express_validator_1.check)("id", "debe ser un id valido").isMongoId(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, db_validators_1.existeColeccion)(c, ["usuarios", "productos"])),
    validar_campos_1.validarCampos,
], uploads_1.actualizarImagenCloudinary);
exports.default = router;
//# sourceMappingURL=uploads.js.map