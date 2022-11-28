import Role from "../models/role";
import Usuario from "../models/usuario";


export const validarRole = async (rol: String="")=>{
    const existeRol= await Role.findOne({rol});
    if (!existeRol){
      throw new Error(`el rol ${rol} no existe en la BD`);
    }  
  } 

  export const emailExiste=async (correo:String="")=>{
    const existeCorreo = await Usuario.findOne({correo});
  if (existeCorreo){
    throw new Error(`el correo ${correo} ya esta registrado`);
    }
  }

  export const existeUsuarioporID=async(id: String)=>{
    const existeID= await Usuario.findById(id);
    if (!existeID){
      throw new Error(`No existe usuario con id ${id}`);
    }
  }


