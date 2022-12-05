import { model, Schema } from "mongoose";

const ProductoSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: { type: String },
  disponible: { type: Boolean, defult: true },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...producto } = this.toObject();
  return producto;
};

export default model("Producto", ProductoSchema);
