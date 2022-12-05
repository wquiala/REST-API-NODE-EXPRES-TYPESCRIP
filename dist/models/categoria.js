"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario",
    },
});
exports.default = (0, mongoose_1.model)("Categoria", CategoriaSchema);
//# sourceMappingURL=categoria.js.map