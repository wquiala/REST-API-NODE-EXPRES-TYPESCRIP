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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCategoria = exports.actualizarCategoria = exports.crearCategoria = exports.categoriaByID = exports.obtenerCategorias = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
//Obtener categorias -paginado - total - populate
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [categorias, cantidad] = yield Promise.all([
        categoria_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("usuario", "nombre"),
        categoria_1.default.countDocuments(query),
    ]);
    res.json({
        categorias,
        cantidad,
    });
});
exports.obtenerCategorias = obtenerCategorias;
//Obtener Categoria - populate
const categoriaByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findById(id);
    res.json({
        categoria,
    });
});
exports.categoriaByID = categoriaByID;
//Crear Categorias
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const nombre = req.body.nombre;
    const cat = yield categoria_1.default.findOne({ nombre });
    console.log(cat);
    if (cat) {
        return res.status(400).json({
            msg: "Categoria ya existe",
        });
    }
    const data = {
        nombre: nombre.toUpperCase(),
        usuario: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
    };
    const categoriaNew = new categoria_1.default(data);
    yield categoriaNew.save();
    res.json("Categoria creada");
});
exports.crearCategoria = crearCategoria;
//Actualizar Categoria
const actualizarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const _c = req.body, { estado, usuario } = _c, data = __rest(_c, ["estado", "usuario"]);
    data.nombre = data.nombre.toUpperCase();
    data.usuario = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    //const data: Category = resto;
    //data.nombre
    const catUpdate = yield categoria_1.default.findByIdAndUpdate(id, data, { new: true });
    res.json({
        catUpdate,
    });
});
exports.actualizarCategoria = actualizarCategoria;
//Eliminar categorias
const eliminarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eliminada = yield categoria_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        eliminada,
        msg: "Categoria eliminada",
    });
});
exports.eliminarCategoria = eliminarCategoria;
//# sourceMappingURL=categoria.js.map