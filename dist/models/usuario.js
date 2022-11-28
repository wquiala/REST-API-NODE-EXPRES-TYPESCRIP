"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: [true, "El  nombre es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});
usuarioSchema.methods.toJSON = function () {
    const _a = this.toObject(), { password, __v, _id } = _a, usuario = __rest(_a, ["password", "__v", "_id"]);
    usuario.uid = _id;
    return usuario;
};
exports.default = (0, mongoose_1.model)("Usuario", usuarioSchema);
;
/*{
    'nombre': 'Wilfredo',
        'correo': 'wilfredoquiala@gmail.com',
        'password': '1234',
        'img': '243434322',
        'rol': 'ajhjahsj',
        'estado': boolean,
            'google': boolean
}*/
//# sourceMappingURL=usuario.js.map