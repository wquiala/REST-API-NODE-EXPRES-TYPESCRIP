import { Request } from "express";
import Payload from "./Payload";
import Usuario from "../models/usuario";

export interface User {
  nombre?: String;
  correo?: String;
  password?: String;
  img?: String;
  role?: String;
  estado?: boolean;
  google?: boolean;
}

export default interface AuthRequest extends Request {
  user?: User;
}
