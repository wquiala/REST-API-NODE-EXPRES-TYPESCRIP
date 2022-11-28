import { Schema, model } from "mongoose";
const RoleSchema: Schema = new Schema({
    rol: {
        type: String,
        required: true,
      },
});

const Role = model("Role", RoleSchema);
export default Role;