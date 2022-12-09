import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarImagenCloudinary,
  MostrarImg,
  upload,
} from "../controllers/uploads";
import { existeColeccion } from "../helpers/db-validators";
import { validarArchivos } from "../middleware/validar-archivosSubir";
import { validarCampos } from "../middleware/validar-campos";

const router = Router();

router.get(
  "/:coleccion/:id",
  [
    check("id", "debe ser un id valido").isMongoId(),
    check("coleccion").custom((c) =>
      existeColeccion(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  MostrarImg
);

router.post("/", validarArchivos, upload);

router.put(
  "/:coleccion/:id",
  [
    validarArchivos,
    check("id", "debe ser un id valido").isMongoId(),
    check("coleccion").custom((c) =>
      existeColeccion(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

export default router;
