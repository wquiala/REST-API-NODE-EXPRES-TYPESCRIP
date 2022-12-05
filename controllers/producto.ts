import { Response } from "express";
import AuthRequest from "../helpers/types";
import Producto from "../models/producto";
//Obtener productos -paginado - total - populate
export const obtenerProductos = async (req: AuthRequest, res: Response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };
  const [productos, cantidad] = await Promise.all([
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
    Producto.countDocuments(query),
  ]);
  res.json({
    productos,
    cantidad,
  });
};

//Obtener Producto - populate

export const productoByID = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const categoria = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    categoria,
  });
};

//Crear Productos

export const crearProducto = async (req: AuthRequest, res: Response) => {
  const { estado, usuario, ...body } = req.body;

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.user?._id,
  };
  const categoriaNew = new Producto(data);
  await categoriaNew.save();
  res.json("Producto creado");
};

//Actualizar Producto
export const actualizarProducto = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (req.body.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.user?._id;

  //const data: Category = resto;
  //data.nombre

  const catUpdate = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json({
    catUpdate,
  });
};

//Producto

export const eliminarProducto = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const eliminada = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    eliminada,
    msg: "Producto eliminado",
  });
};
