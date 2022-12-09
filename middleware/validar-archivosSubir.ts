import { NextFunction, Response } from "express";
import AuthRequest from "../helpers/types";

export const validarArchivos = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos que subir" });
  }
  next();
};
