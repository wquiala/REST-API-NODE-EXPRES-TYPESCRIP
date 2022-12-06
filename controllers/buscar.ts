import { Response } from "express";
import { isValidObjectId } from "mongoose";
import AuthRequest from "../helpers/types";
import Categoria from "../models/categoria";
import Producto from "../models/producto";
import Usuario from "../models/usuario";

const coleccionesPermitidas = ["usuarios", "productos", "categorias", "roles"];

const buscarByUsuario = async (termino: string, res: Response) => {
  const esMongoID = isValidObjectId(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);

    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regExp = RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regExp }, { correo: regExp }],
    $and: [{ estado: true }],
  });

  return res.json({
    results: usuarios,
  });
};

const buscarByProductos = async (termino: string, res: Response) => {
  const esMongoID = isValidObjectId(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");

    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regExp = RegExp(termino, "i");

  const producto = await Producto.find({ nombre: regExp, estado: true })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  return res.json({
    results: producto,
  });
};

const buscarByCategorias = async (termino: string, res: Response) => {
  const esMongoID = isValidObjectId(termino);
  if (esMongoID) {
    const producto = await Categoria.findById(termino).populate(
      "usuario",
      "nombre"
    );

    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regExp = RegExp(termino, "i");

  const categoria = await Categoria.find({
    nombre: regExp,
    estado: true,
  }).populate("usuario", "nombre");

  return res.json({
    results: categoria,
  });
};

export const buscar = (req: AuthRequest, res: Response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Esta criterio de busqueda no esta permitido las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarByUsuario(termino, res);
      break;
    case "productos":
      buscarByProductos(termino, res);
      break;
    case "categorias":
      buscarByCategorias(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Faltan opciones",
      });
      break;
  }
};
