"use strict";
//import { validarCampos } from "./../middleware/validar-campos";
//import  Request from '../helpers/types';
//import { Usuario } from '../models/usuario';
// import { existeUsuarioporID } from "../helpers/db-validators";
// import usuario from "../models/usuario";
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
exports.postUser = exports.patchUser = exports.putUser = exports.deleteUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    res.json({
        total,
        usuarios,
    });
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Borrado  en la BD
    const { id } = req.params;
    //const usuario= await Usuario.findByIdAndDelete(id);
    const eliminado = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    const usuario = req.user;
    res.json({
        eliminado,
        usuario,
    });
});
exports.deleteUser = deleteUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, correo, google, password } = _a, resto = __rest(_a, ["_id", "correo", "google", "password"]);
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, resto);
    res.json({
        resto,
    });
});
exports.putUser = putUser;
const patchUser = (req, res) => {
    res.json({
        msg: "probando api con patch",
    });
};
exports.patchUser = patchUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Importar la funcion que valida los campos
    // validarCampos(req, res);
    //Obteniendo lo que viene en el request
    //const body = req.body;
    const { nombre, correo, password, role } = req.body;
    //Creando la instancia del usuario con la info del reques
    const usuario = new usuario_1.default({ nombre, correo, password, role });
    //verificando que el correo existe
    //encriptar la contrasenna
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    //Salvando en la base de datos
    yield usuario.save();
    res.json({
        usuario,
    });
});
exports.postUser = postUser;
//# sourceMappingURL=user.js.map