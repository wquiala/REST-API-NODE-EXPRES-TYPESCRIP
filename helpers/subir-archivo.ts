import path from "path";
import { v4 as uuidv4 } from "uuid";

export const subirArchivos = (
  files,
  extencionesPermitidas = ["jpg", "png", "pdf"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //Para restringir extensiones

    if (!extencionesPermitidas.includes(extension)) {
      return reject("Esta extencion no es permitida");
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);
    console.log(__dirname);

    //Use the mv() method to place the file somewhere on your server

    archivo.mv(uploadPath, function (err) {
      if (err) reject(err);
      resolve(nombreTemp);
    });
  });
};

// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
