import { Response, NextFunction } from "express";
import AuthRequest, { User } from "../helpers/types";

export const esAdminRole = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      msg: "Debe validar token primero",
    });
  }

  const user = req.user;
  console.log(user);

  if (user.role !== "ADMIN_ROLE") {
    res.status(401).json({
      msg: "No tiene permisos para eliminar",
    });
  }
  next();
};

export const tieneRole = (...roles: String[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        msg: "Debe validar token primero",
      });
    }
    const user: User | any = req.user;

    if (!roles.includes(user.role)) {
      res.status(401).json({
        msg: `para eliminar debe tener alguno de estos roles ${roles} `,
      });
    }

    next();
  };
};
