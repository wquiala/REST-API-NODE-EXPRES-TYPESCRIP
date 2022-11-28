"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: true,
    },
});
const Role = (0, mongoose_1.model)("Role", RoleSchema);
exports.default = Role;
//# sourceMappingURL=role.js.map