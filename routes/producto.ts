import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
  productoByID,
} from "../controllers/producto";
import {
  existeCategoriaporID,
  existeProductoporID,
  productoActivo,
  productoExiste,
} from "../helpers/db-validators";
import { validarCampos } from "../middleware/validar-campos";
import validarJWT from "../middleware/validar-jwt";
import { esAdminRole } from "../middleware/validar-roles";
const router: Router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoporID),
    //check("id").custom(categoriaActiva),
    validarCampos,
  ],
  productoByID
);
//Crear Categoria privado para cualquier usuario que tenga un token valido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(productoExiste),
    //check("estado", "Tiene que definir el estado").not().isEmpty(),
    check("categoria", "debe especificar la categoria").not().isEmpty(),
    check("categoria").custom(existeCategoriaporID),

    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoporID),
    //check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //check("nombre").custom(productoExiste),
    //check("categoria", "Tiene que proporcionar la categoria").not().isEmpty(),
    check("categoria").custom(existeCategoriaporID),

    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeProductoporID),
    check("id").custom(productoActivo),
    validarCampos,
  ],
  eliminarProducto
);

export default router;
