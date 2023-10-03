"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errField = void 0;
const errField = (err, res) => {
    return res.status(404).json({
        name: err.name,
        message: err.message,
        status: err.status,
        success: err.success,
        stack: err.stack,
        err,
    });
};
exports.errField = errField;
const errorHandler = (err, req, res, next) => {
    (0, exports.errField)(err, res);
};
exports.errorHandler = errorHandler;
