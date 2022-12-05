import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarCategoria,
  categoriaByID,
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias,
} from "../controllers/categoria";
import {
  categoriaActiva,
  categoriaExiste,
  existeCategoriaporID,
} from "../helpers/db-validators";
import { validarCampos } from "../middleware/validar-campos";
import validarJWT from "../middleware/validar-jwt";
import { esAdminRole } from "../middleware/validar-roles";

const router: Router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeCategoriaporID),
    //check("id").custom(categoriaActiva),
    validarCampos,
  ],
  categoriaByID
);
//Crear Categoria privado para cualquier usuario que tenga un token valido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(categoriaExiste),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeCategoriaporID),

    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id").custom(existeCategoriaporID),
    check("id").custom(categoriaActiva),
    validarCampos,
  ],
  eliminarCategoria
);

export default router;
