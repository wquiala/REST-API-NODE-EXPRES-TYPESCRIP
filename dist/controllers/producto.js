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
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.productoByID = exports.obtenerProductos = void 0;
const producto_1 = __importDefault(require("../models/producto"));
//Obtener productos -paginado - total - populate
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [productos, cantidad] = yield Promise.all([
        producto_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("usuario", "nombre")
            .populate("categoria", "nombre"),
        producto_1.default.countDocuments(query),
    ]);
    res.json({
        productos,
        cantidad,
    });
});
exports.obtenerProductos = obtenerProductos;
//Obtener Producto - populate
const productoByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield producto_1.default.findById(id)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre");
    res.json({
        categoria,
    });
});
exports.productoByID = productoByID;
//Crear Productos
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { estado, usuario } = _b, body = __rest(_b, ["estado", "usuario"]);
    const data = Object.assign(Object.assign({}, body), { nombre: body.nombre.toUpperCase(), usuario: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const categoriaNew = new producto_1.default(data);
    yield categoriaNew.save();
    res.json("Producto creado");
});
exports.crearProducto = crearProducto;
//Actualizar Producto
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const _d = req.body, { estado, usuario } = _d, data = __rest(_d, ["estado", "usuario"]);
    if (req.body.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    //const data: Category = resto;
    //data.nombre
    const catUpdate = yield producto_1.default.findByIdAndUpdate(id, data, { new: true });
    res.json({
        catUpdate,
    });
});
exports.actualizarProducto = actualizarProducto;
//Producto
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eliminada = yield producto_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        eliminada,
        msg: "Producto eliminado",
    });
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=producto.js.map