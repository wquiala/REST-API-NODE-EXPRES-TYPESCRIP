import cloudinary from "cloudinary";
import config from "config";
import { Response } from "express";
import fs from "fs";
import path from "path";
const cloud = cloudinary.v2;
const api_key = "154251599385786";
const url = config.get("CLOUDINARY_URL");
const api_secret = "146JmG45DlCEVsRk1Ba9ZVyNsJ0";
const cloud_name = "dayu9vym7";

cloud.config({ url, api_key, api_secret, cloud_name });

import { subirArchivos } from "../helpers/subir-archivo";
import AuthRequest from "../helpers/types";

import Producto from "../models/producto";
import Usuario from "../models/usuario";

export const upload = async (req: AuthRequest, res: Response) => {
  try {
    const archivo = await subirArchivos(
      req.files,
      ["txt", "doc"],
      "../../uploads/pdf/"
    );
    return res.json({
      archivo,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// export const actualizarImagen = async (req: AuthRequest, res: Response) => {
//   const { coleccion, id } = req.params;
//   let modelo;
//   switch (coleccion) {
//     case "usuarios":
//       modelo = await Usuario.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: "Este usuario no existe" });
//       }
//       break;
//     case "productos":
//       modelo = await Producto.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: "Este producto no existe" });
//       }
//       break;
//     default:
//       return res.status(500).json({ msg: "Sin implementar" });
//   }

//   try {
//     //Limpiar Imagenes
//     if (modelo.img) {
//       const pathImg = path.join(
//         __dirname,
//         "../uploads/",
//         `../../uploads/${coleccion}/`,
//         modelo.img
//       );
//       //Si existe en el fs se borra para copiar la nueva
//       if (fs.existsSync(pathImg)) {
//         fs.unlinkSync(pathImg);
//       }
//     }

//     modelo.img = await subirArchivos(
//       req.files,
//       undefined,
//       `../../uploads/${coleccion}/`
//     );

//     await modelo.save();

//     res.json({
//       modelo,
//     });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

export const actualizarImagenCloudinary = async (
  req: AuthRequest,
  res: Response
) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "Este usuario no existe" });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "Este producto no existe" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Sin implementar" });
  }

  try {
    //Limpiar Imagenes

    if (modelo.img) {
      const imgArr: [] = await modelo.img.split("/");

      const nombre: string = imgArr[imgArr.length - 1];

      const [public_id] = nombre.split(".");
      cloud.uploader.destroy(public_id);
    }

    if (req.files?.archivo) {
      const { tempFilePath } = req.files.archivo;
      const { secure_url } = await cloud.uploader.upload(tempFilePath);
      modelo.img = secure_url;
      modelo.save();

      res.json({
        modelo,
      });
    }

    // modelo.img = await subirArchivos(
    //   req.files,
    //   undefined,
    //   `../../uploads/${coleccion}/`
    // );

    // await modelo.save();

    // res.json({
    //   modelo,
    // });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const MostrarImg = async (req: AuthRequest, res: Response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "Este usuario no existe" });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "Este producto no existe" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Sin implementar" });
  }

  try {
    //Limpiar Imagenes
    if (modelo.img) {
      const pathImg = path.join(
        __dirname,
        "../uploads/",
        `../../uploads/${coleccion}/`,
        modelo.img
      );
      //Si existe en el fs se borra para copiar la nueva
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
    const pathImg = path.join(__dirname, "../../assets/no-image.jpg");
    console.log(pathImg);
    return res.sendFile(pathImg);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
