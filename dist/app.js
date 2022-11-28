"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("./models/server");
const server = new server_1.Server();
server.Listen();
// import express from "express";
// const app = express();
// app.set("port", process.env.PORT || 5000);
// app.get('/', (req, res) => {
//     res.send("Hello world");
// })
// const port = app.get("port");
// const server = app.listen(port, () =>
//   console.log(`Server started on port $`)
// );
exports.default = server;
//# sourceMappingURL=app.js.map