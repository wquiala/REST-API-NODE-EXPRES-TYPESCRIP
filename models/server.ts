import cors from "cors";
import express from "express";
import { dbConnection } from "../database/config";
import auth from "../routes/auth";
import buscar from "../routes/buscar";
import categorias from "../routes/categoria";
import producto from "../routes/producto";
import user from "../routes/user";

export class Server {
  public app: any;
  public userPath: string;
  public authPath: string;
  public categoriasPath: string;
  public productosPath: string;
  public buscarPath: string;

  constructor() {
    this.app = express();
    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.buscarPath = "/api/buscar";
    // DB connetct
    this.dbConnection();
    //Middlewares
    this.Middlewares();

    this.Routes();
  }

  public Middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  public async dbConnection() {
    await dbConnection();
  }

  public Routes(): void {
    this.app.use(this.authPath, auth);
    this.app.use(this.userPath, user); //("/api/user", require("../routes/user"));
    this.app.use(this.categoriasPath, categorias);
    this.app.use(this.productosPath, producto);
    this.app.use(this.buscarPath, buscar);
  }

  public Listen(): void {
    this.app.listen(8080, () => {
      console.log(`Server started on port 8080`);
    });
  }
}
