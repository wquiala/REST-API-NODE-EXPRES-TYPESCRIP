import Categoria from "../models/categoria";
import Producto from "../models/producto";
import Role from "../models/role";
import Usuario from "../models/usuario";

export const validarRole = async (rol: String = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`el rol ${rol} no existe en la BD`);
  }
};

export const emailExiste = async (correo: String = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`el correo ${correo} ya esta registrado`);
  }
};

export const productoExiste = async (name: String) => {
  const nombre = name.toUpperCase();
  const existenombre = await Producto.findOne({ nombre });
  if (existenombre) {
    throw new Error(`el producto ${nombre} ya esta registrado`);
  }
};

export const categoriaExiste = async (name: String) => {
  const nombre = name.toUpperCase();
  const existenombre = await Categoria.findOne({ nombre });
  if (existenombre) {
    throw new Error(`La categoria ${nombre} ya esta registrado`);
  }
};

export const existeUsuarioporID = async (id: string) => {
  const existeID = await Usuario.findById(id);
  if (!existeID) {
    throw new Error(`No existe usuario con id ${id}`);
  }
};

export const existeCategoriaporID = async (id: string) => {
  const existeID = await Categoria.findById(id);
  if (!existeID) {
    throw new Error(`No existe categoria con id ${id}`);
  }
};

export const existeProductoporID = async (id: string) => {
  const existeID = await Producto.findById(id);
  if (!existeID) {
    throw new Error(`No existe producto con id ${id}`);
  }
};

export const categoriaActiva = async (id: string) => {
  const cat = await Categoria.findById(id);
  if (cat !== null) {
    if (!cat.estado) throw new Error(`esta categoria eliminada`);
  }
};

export const productoActivo = async (id: string) => {
  const prod = await Producto.findById(id);
  if (prod !== null) {
    if (!prod.estado) throw new Error(`esta categoria eliminada`);
  }
};
