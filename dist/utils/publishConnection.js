"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishConnection = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
// const amqplibServer =
//   "amqps://ytczyrcc:VVy6y7RE1kt3-FCMs_kV1621467bNh0t@whale.rmq.cloudamqp.com/ytczyrcc";
const amqplibServer = "amqps://ytczyrcc:VVy6y7RE1kt3-FCMs_kV1621467bNh0t@whale.rmq.cloudamqp.com/ytczyrcc";
const publishConnection = (queue, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connnect = yield amqplib_1.default.connect(amqplibServer);
        const channel = yield connnect.createChannel();
        yield channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    }
    catch (error) {
        console.log(error);
    }
});
exports.publishConnection = publishConnection;
