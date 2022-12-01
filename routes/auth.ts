import { Router } from "express";
import { check } from "express-validator";
import { googleSignIN, login } from "../controllers/auth";
import { validarCampos } from "../middleware/validar-campos";

const router: Router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contrasenna es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSignIN
);

export default router;
