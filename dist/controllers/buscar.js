"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const categoria_1 = __importDefault(require("../models/categoria"));
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const coleccionesPermitidas = ["usuarios", "productos", "categorias", "roles"];
const buscarByUsuario = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoID) {
        const usuario = yield usuario_1.default.findById(termino);
        return res.json({
            results: usuario ? [usuario] : [],
        });
    }
    const regExp = RegExp(termino, "i");
    const usuarios = yield usuario_1.default.find({
        $or: [{ nombre: regExp }, { correo: regExp }],
        $and: [{ estado: true }],
    });
    return res.json({
        results: usuarios,
    });
});
const buscarByProductos = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoID) {
        const producto = yield producto_1.default.findById(termino)
            .populate("usuario", "nombre")
            .populate("categoria", "nombre");
        return res.json({
            results: producto ? [producto] : [],
        });
    }
    const regExp = RegExp(termino, "i");
    const producto = yield producto_1.default.find({ nombre: regExp, estado: true })
        .populate("usuario", "nombre")
        .populate("categoria", "nombre");
    return res.json({
        results: producto,
    });
});
const buscarByCategorias = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoID) {
        const producto = yield categoria_1.default.findById(termino).populate("usuario", "nombre");
        return res.json({
            results: producto ? [producto] : [],
        });
    }
    const regExp = RegExp(termino, "i");
    const categoria = yield categoria_1.default.find({
        nombre: regExp,
        estado: true,
    }).populate("usuario", "nombre");
    return res.json({
        results: categoria,
    });
});
const buscar = (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Esta criterio de busqueda no esta permitido las colecciones permitidas son ${coleccionesPermitidas}`,
        });
    }
    switch (coleccion) {
        case "usuarios":
            buscarByUsuario(termino, res);
            break;
        case "productos":
            buscarByProductos(termino, res);
            break;
        case "categorias":
            buscarByCategorias(termino, res);
            break;
        default:
            res.status(500).json({
                msg: "Faltan opciones",
            });
            break;
    }
};
exports.buscar = buscar;
//# sourceMappingURL=buscar.js.map