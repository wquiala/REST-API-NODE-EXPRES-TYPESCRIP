import mongoose from "mongoose";


//configuracion de coneccion a la Base de datos
export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("coneccion establecida");
  } catch (error) {
    throw new Error("Error al iniciar BD");
  }
};
