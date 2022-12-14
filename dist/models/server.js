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
exports.Server = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = require("../database/config");
const auth_1 = __importDefault(require("../routes/auth"));
const buscar_1 = __importDefault(require("../routes/buscar"));
const categoria_1 = __importDefault(require("../routes/categoria"));
const producto_1 = __importDefault(require("../routes/producto"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.userPath = "/api/user";
        this.authPath = "/api/auth";
        this.categoriasPath = "/api/categorias";
        this.productosPath = "/api/productos";
        this.buscarPath = "/api/buscar";
        this.uploadPath = "/api/upload";
        // DB connetct
        this.dbConnection();
        //Middlewares
        this.Middlewares();
        this.Routes();
    }
    Middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true,
        }));
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    Routes() {
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.userPath, user_1.default); //("/api/user", require("../routes/user"));
        this.app.use(this.categoriasPath, categoria_1.default);
        this.app.use(this.productosPath, producto_1.default);
        this.app.use(this.buscarPath, buscar_1.default);
        this.app.use(this.uploadPath, uploads_1.default);
    }
    Listen() {
        this.app.listen(8080, () => {
            console.log(`Server started on port 8080`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map