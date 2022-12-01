import bcrypt from "bcryptjs";
import { Response } from "express";
import { generarJWT } from "../helpers/generarJWT";
import { googleVerify } from "../helpers/google-verify";
import AuthRequest from "../helpers/types";
import Usuario from "../models/usuario";

export const login = async (req: AuthRequest, res: Response) => {
  const { correo, password } = req.body;
  try {
    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }
    const estado = usuario.estado;

    //Si el usuario esta activo
    if (!estado) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos --Estado:false",
      });
    }

    //verificar password
    const validarPassword = bcrypt.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos --Password",
      });
    }
    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salio Mal",
    });
  }
};

export const googleSignIN = async (req: AuthRequest, res: Response) => {
  const { id_token } = req.body;
  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    console.log({ correo, nombre, img });
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "todo ok",
      id_token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de google no es correcto",
    });
  }
};
