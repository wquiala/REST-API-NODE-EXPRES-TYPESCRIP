import { Router } from "express";
import { check } from "express-validator";
import validarJWT from "../middleware/validar-jwt";
import {
  emailExiste,
  existeUsuarioporID,
  validarRole,
} from "./../helpers/db-validators";

import {
  deleteUser,
  getUser,
  patchUser,
  postUser,
  putUser,
} from "../controllers/user";
import { validarCampos } from "../middleware/validar-campos";
import { tieneRole } from "../middleware/validar-roles";

const router: Router = Router();

router.get("/", getUser);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioporID),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioporID),
    validarCampos,
  ],
  deleteUser
);

router.patch("/", patchUser);

router.post("/", [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("correo", "El correo es obligatorio").not().isEmpty(),
  check("correo", "El correo no es valido").isEmail(),
  check("correo").custom(emailExiste),
  check("password", "El password es obligatorio").not().isEmpty(),
  check("password", "El password debe tener al menos 6 caracteres").isLength({
    min: 6,
  }),
  check("role").custom(validarRole),
  validarCampos,
  postUser,
]);

export default router;
