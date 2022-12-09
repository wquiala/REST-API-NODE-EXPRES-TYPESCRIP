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
exports.MostrarImg = exports.actualizarImagenCloudinary = exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = __importDefault(require("config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloud = cloudinary_1.default.v2;
const api_key = "154251599385786";
const url = config_1.default.get("CLOUDINARY_URL");
const api_secret = "146JmG45DlCEVsRk1Ba9ZVyNsJ0";
const cloud_name = "dayu9vym7";
cloud.config({ url, api_key, api_secret, cloud_name });
const subir_archivo_1 = require("../helpers/subir-archivo");
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivo = yield (0, subir_archivo_1.subirArchivos)(req.files, ["txt", "doc"], "../../uploads/pdf/");
        return res.json({
            archivo,
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
});
exports.upload = upload;
// export const actualizarImagen = async (req: AuthRequest, res: Response) => {
//   const { coleccion, id } = req.params;
//   let modelo;
//   switch (coleccion) {
//     case "usuarios":
//       modelo = await Usuario.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: "Este usuario no existe" });
//       }
//       break;
//     case "productos":
//       modelo = await Producto.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: "Este producto no existe" });
//       }
//       break;
//     default:
//       return res.status(500).json({ msg: "Sin implementar" });
//   }
//   try {
//     //Limpiar Imagenes
//     if (modelo.img) {
//       const pathImg = path.join(
//         __dirname,
//         "../uploads/",
//         `../../uploads/${coleccion}/`,
//         modelo.img
//       );
//       //Si existe en el fs se borra para copiar la nueva
//       if (fs.existsSync(pathImg)) {
//         fs.unlinkSync(pathImg);
//       }
//     }
//     modelo.img = await subirArchivos(
//       req.files,
//       undefined,
//       `../../uploads/${coleccion}/`
//     );
//     await modelo.save();
//     res.json({
//       modelo,
//     });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };
const actualizarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: "Este usuario no existe" });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: "Este producto no existe" });
            }
            break;
        default:
            return res.status(500).json({ msg: "Sin implementar" });
    }
    try {
        //Limpiar Imagenes
        if (modelo.img) {
            const imgArr = yield modelo.img.split("/");
            const nombre = imgArr[imgArr.length - 1];
            const [public_id] = nombre.split(".");
            cloud.uploader.destroy(public_id);
        }
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.archivo) {
            const { tempFilePath } = req.files.archivo;
            const { secure_url } = yield cloud.uploader.upload(tempFilePath);
            modelo.img = secure_url;
            modelo.save();
            res.json({
                modelo,
            });
        }
        // modelo.img = await subirArchivos(
        //   req.files,
        //   undefined,
        //   `../../uploads/${coleccion}/`
        // );
        // await modelo.save();
        // res.json({
        //   modelo,
        // });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.actualizarImagenCloudinary = actualizarImagenCloudinary;
const MostrarImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: "Este usuario no existe" });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: "Este producto no existe" });
            }
            break;
        default:
            return res.status(500).json({ msg: "Sin implementar" });
    }
    try {
        //Limpiar Imagenes
        if (modelo.img) {
            const pathImg = path_1.default.join(__dirname, "../uploads/", `../../uploads/${coleccion}/`, modelo.img);
            //Si existe en el fs se borra para copiar la nueva
            if (fs_1.default.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            }
        }
        const pathImg = path_1.default.join(__dirname, "../../assets/no-image.jpg");
        console.log(pathImg);
        return res.sendFile(pathImg);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.MostrarImg = MostrarImg;
//# sourceMappingURL=uploads.js.map