"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivos = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const subirArchivos = (files, extencionesPermitidas = ["jpg", "png", "pdf"], carpeta = "") => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];
        //Para restringir extensiones
        if (!extencionesPermitidas.includes(extension)) {
            return reject("Esta extencion no es permitida");
        }
        const nombreTemp = (0, uuid_1.v4)() + "." + extension;
        const uploadPath = path_1.default.join(__dirname, "../uploads/", carpeta, nombreTemp);
        console.log(__dirname);
        //Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err)
                reject(err);
            resolve(nombreTemp);
        });
    });
};
exports.subirArchivos = subirArchivos;
// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//# sourceMappingURL=subir-archivo.js.map