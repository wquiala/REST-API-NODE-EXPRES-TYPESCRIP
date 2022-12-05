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
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "Sin autorizacion, NO JWT",
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.get("SECRETORPRIVATEKEY"));
        const usuario = yield usuario_1.default.findById(payload.uid);
        req.user = usuario;
        //console.log(req.user);
        next();
        // console.log(!user);
        // if (!user){
        //   return res.status(401).json({
        //     msg: 'Este usuario no existe '
        //   });
        // }
        // if  (!user.estado){
        //   return res.status(401).json({
        //   msg: 'Este usuario se ha eliminado '
        // });
        //}
        //Verificar si el usuario con ese id no ha sido borrado
        //const usuario= Usuario.findById(uid);
    }
    catch (error) {
        res.status(401).json({
            msg: "token no valido",
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map