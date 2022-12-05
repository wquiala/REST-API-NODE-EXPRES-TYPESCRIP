import { model, Schema } from "mongoose";
const CategoriaSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
});

export default model("Categoria", CategoriaSchema);
