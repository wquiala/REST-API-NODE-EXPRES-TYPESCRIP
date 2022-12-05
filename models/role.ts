import { model, Schema } from "mongoose";
const RoleSchema: Schema = new Schema({
  rol: {
    type: String,
    required: true,
  },
});

export default model("Role", RoleSchema);
