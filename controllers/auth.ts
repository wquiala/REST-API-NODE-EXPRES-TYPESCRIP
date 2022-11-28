import { request, response } from "express";
import Usuario from "../models/usuario";
import bcrypt from 'bcryptjs';
import { generarJWT } from "../helpers/generarJWT";

export const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos --Estado:false",
      });
    }

    //verificar password
    const validarPassword=bcrypt.compareSync(password, usuario.password);
if (!validarPassword){
    return res.status(400).json({
        msg: "Usuario/Password no son correctos --Password",
      });
}
        //Generar JWT
    const token=await generarJWT(usuario.id);
    
    res.json({
        usuario,
        token
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salio Mal",
    });
  }
};
