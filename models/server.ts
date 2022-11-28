import express from "express";
import cors from "cors";
import auth from "../routes/auth";
import user from "../routes/user";
import { dbConnection } from "../database/config";

export class Server {
  public app;
  public routerPath;
  public authPath

  constructor() {
    this.app = express();
    this.routerPath = "/api/user";
    this.authPath = "/api/auth";
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
    this.app.use(this.routerPath, user); //("/api/user", require("../routes/user"));
  }

  public Listen(): void {
    const server = this.app.listen(5000, () =>{
      console.log(`Server started on port 5000`);
         
    }
      
    );
  }
}
