"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            msg: "Debe validar token primero",
        });
    }
    const user = req.user;
    console.log(user);
    if (user.role !== "ADMIN_ROLE") {
        res.status(401).json({
            msg: "No tiene permisos para eliminar",
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                msg: "Debe validar token primero",
            });
        }
        const user = req.user;
        if (!roles.includes(user.role)) {
            res.status(401).json({
                msg: `para eliminar debe tener alguno de estos roles ${roles} `,
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-roles.js.map