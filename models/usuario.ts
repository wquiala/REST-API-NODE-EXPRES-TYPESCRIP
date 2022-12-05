import { model, Schema } from "mongoose";

// export type TUser = {
//   nombre: String;
//   correo: string;
//   password: string;
//   img: string;
//   role: String;
//   estado: String;
// };

//export interface IUser extends TUser, Document {}

const usuarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: [true, "El  nombre es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { password, __v, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("Usuario", usuarioSchema);
/*{
    'nombre': 'Wilfredo',
        'correo': 'wilfredoquiala@gmail.com',
        'password': '1234',
        'img': '243434322',
        'rol': 'ajhjahsj',
        'estado': boolean,
            'google': boolean    
}*/
