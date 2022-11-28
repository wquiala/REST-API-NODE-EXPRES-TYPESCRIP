import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";
import { validarCampos } from "../middleware/validar-campos";



const router: Router = Router();

router.post("/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contrasenna es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

export default router;
