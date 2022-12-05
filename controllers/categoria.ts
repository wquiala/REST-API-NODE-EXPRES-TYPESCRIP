import { Response } from "express";
import AuthRequest, { Category } from "../helpers/types";
import Categoria from "../models/categoria";

//Obtener categorias -paginado - total - populate
export const obtenerCategorias = async (req: AuthRequest, res: Response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };
  const [categorias, cantidad] = await Promise.all([
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
    Categoria.countDocuments(query),
  ]);
  res.json({
    categorias,
    cantidad,
  });
};

//Obtener Categoria - populate

export const categoriaByID = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const categoria: Category | null = await Categoria.findById(id);

  res.json({
    categoria,
  });
};

//Crear Categorias

export const crearCategoria = async (req: AuthRequest, res: Response) => {
  const nombre: string = req.body.nombre;

  const cat = await Categoria.findOne({ nombre });
  console.log(cat);

  if (cat) {
    return res.status(400).json({
      msg: "Categoria ya existe",
    });
  }

  const data = {
    nombre: nombre.toUpperCase(),
    usuario: req.user?._id,
  };
  const categoriaNew = new Categoria(data);
  await categoriaNew.save();
  res.json("Categoria creada");
};

//Actualizar Categoria
export const actualizarCategoria = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.user?._id;

  //const data: Category = resto;
  //data.nombre

  const catUpdate = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json({
    catUpdate,
  });
};

//Eliminar categorias

export const eliminarCategoria = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const eliminada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    eliminada,
    msg: "Categoria eliminada",
  });
};
