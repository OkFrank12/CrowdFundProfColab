"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainError = exports.HTTP_CODE = void 0;
var HTTP_CODE;
(function (HTTP_CODE) {
    HTTP_CODE[HTTP_CODE["OK"] = 200] = "OK";
    HTTP_CODE[HTTP_CODE["CREATE"] = 201] = "CREATE";
    HTTP_CODE[HTTP_CODE["BAD"] = 404] = "BAD";
    HTTP_CODE[HTTP_CODE["DELETE"] = 204] = "DELETE";
    HTTP_CODE[HTTP_CODE["UPDATE"] = 200] = "UPDATE";
    HTTP_CODE[HTTP_CODE["INVALID_TOKEN"] = 498] = "INVALID_TOKEN";
})(HTTP_CODE || (exports.HTTP_CODE = HTTP_CODE = {}));
class mainError extends Error {
    constructor(args) {
        super(args.message);
        this.success = false;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name;
        this.message = args.message;
        this.status = args.status;
        if (this.success !== undefined) {
            this.success = args.success;
        }
        Error.captureStackTrace(this);
    }
}
exports.mainError = mainError;
