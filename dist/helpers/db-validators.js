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
exports.existeUsuarioporID = exports.emailExiste = exports.validarRole = void 0;
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarRole = (rol = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield role_1.default.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no existe en la BD`);
    }
});
exports.validarRole = validarRole;
const emailExiste = (correo = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeCorreo = yield usuario_1.default.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`el correo ${correo} ya esta registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioporID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeID = yield usuario_1.default.findById(id);
    if (!existeID) {
        throw new Error(`No existe usuario con id ${id}`);
    }
});
exports.existeUsuarioporID = existeUsuarioporID;
//# sourceMappingURL=db-validators.js.map