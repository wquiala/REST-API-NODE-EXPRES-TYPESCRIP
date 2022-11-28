import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import config from "config";
import AuthRequest, { User } from "../helpers/types";
import Payload from "../helpers/Payload";
import Usuario, { IUser } from "../models/usuario";

const validarJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Sin autorizacion, NO JWT",
    });
  }

  try {
    const payload: Payload | any = jwt.verify(
      token,
      config.get("SECRETORPRIVATEKEY")
    );
    const usuario: User | any = await Usuario.findById(payload.uid);
    req.user = usuario;
    console.log(req.user);

    next();
    // console.log(!user);
    // if (!user){
    //   return res.status(401).json({
    //     msg: 'Este usuario no existe '
    //   });
    // }

    // if  (!user.estado){
    //   return res.status(401).json({
    //   msg: 'Este usuario se ha eliminado '
    // });

    //}

    //Verificar si el usuario con ese id no ha sido borrado
    //const usuario= Usuario.findById(uid);
  } catch (error) {
    res.status(401).json({
      msg: "token no valido",
    });
  }
};

export default validarJWT;
