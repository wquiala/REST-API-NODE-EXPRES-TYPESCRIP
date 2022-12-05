import { Request } from "express";
// import Payload from "./Payload";
// import Usuario from "../models/usuario";

export interface User {
  _id?: string;
  nombre?: string;
  correo?: string;
  password?: string;
  img?: string;
  role?: string;
  estado?: boolean;
  google?: boolean;
}

export interface Category {
  _id?: string;
  nombre?: string;
  estado?: boolean;
  usuario?: Object;
}

export interface Product {
  _id?: string;
  nombre?: string;
  estado?: boolean;
  usuario?: Object;
  categoria?: Object;
  descripcion?: string;
}

export default interface AuthRequest extends Request {
  user?: User;
  categoria?: Category;
}
