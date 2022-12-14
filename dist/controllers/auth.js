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
exports.googleSignIN = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = require("../helpers/generarJWT");
const google_verify_1 = require("../helpers/google-verify");
const usuario_1 = __importDefault(require("../models/usuario"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //Verificar si el correo existe
        const usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/password no son correctos",
            });
        }
        const estado = usuario.estado;
        //Si el usuario esta activo
        if (!estado) {
            return res.status(400).json({
                msg: "Usuario/Password no son correctos --Estado:false",
            });
        }
        //verificar password
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "Usuario/Password no son correctos --Password",
            });
        }
        //Generar JWT
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Algo salio Mal",
        });
    }
});
exports.login = login;
const googleSignIN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = yield (0, google_verify_1.googleVerify)(id_token);
        console.log({ correo, nombre, img });
        let usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ":P",
                img,
                google: true,
            };
            usuario = new usuario_1.default(data);
            yield usuario.save();
        }
        // Si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado",
            });
        }
        // Generar el JWT
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            msg: "todo ok",
            id_token,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Token de google no es correcto",
        });
    }
});
exports.googleSignIN = googleSignIN;
//# sourceMappingURL=auth.js.map