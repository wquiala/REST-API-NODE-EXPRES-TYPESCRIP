import { Request } from "express";
// import Payload from "./Payload";
// import Usuario from "../models/usuario";

export interface User {
  nombre?: string;
  correo?: string;
  password?: string;
  img?: string;
  role?: string;
  estado?: boolean;
  google?: boolean;
}

export default interface AuthRequest extends Request {
  user?: User;
}
