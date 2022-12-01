//import { validarCampos } from "./../middleware/validar-campos";
//import  Request from '../helpers/types';
//import { Usuario } from '../models/usuario';
// import { existeUsuarioporID } from "../helpers/db-validators";
// import usuario from "../models/usuario";

import bcrypt from "bcryptjs";
import { Response } from "express";
import AuthRequest from "../helpers/types";
import Usuario from "../models/usuario";

export const getUser = async (req: AuthRequest, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  //Borrado  en la BD
  const { id } = req.params;
  //const usuario= await Usuario.findByIdAndDelete(id);
  const eliminado = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuario = req.user;

  res.json({
    eliminado,
    usuario,
  });
};

export const putUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { _id, correo, google, password, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    resto,
  });
};

export const patchUser = (req: AuthRequest, res: Response): void => {
  res.json({
    msg: "probando api con patch",
  });
};

export const postUser = async (req: AuthRequest, res: Response) => {
  // Importar la funcion que valida los campos
  // validarCampos(req, res);
  //Obteniendo lo que viene en el request
  //const body = req.body;
  const { nombre, correo, password, role } = req.body;

  //Creando la instancia del usuario con la info del reques
  const usuario = new Usuario({ nombre, correo, password, role });
  //verificando que el correo existe

  //encriptar la contrasenna
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Salvando en la base de datos
  await usuario.save();

  res.json({
    usuario,
  });
};
