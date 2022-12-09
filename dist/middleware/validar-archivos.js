"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivos = void 0;
const validarArchivos = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: "No hay archivos que subir" });
    }
    next();
};
exports.validarArchivos = validarArchivos;
//# sourceMappingURL=validar-archivos.js.map