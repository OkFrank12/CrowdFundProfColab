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
exports.consumeAbegConnection = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const amqpServer = "amqps://ytczyrcc:VVy6y7RE1kt3-FCMs_kV1621467bNh0t@whale.rmq.cloudamqp.com/ytczyrcc";
const prisma = new client_1.PrismaClient();
const consumeAbegConnection = (queue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connect = yield amqplib_1.default.connect(amqpServer);
        const channel = yield connect.createChannel();
        yield channel.assertQueue(queue);
        yield channel.consume(queue, (message) => __awaiter(void 0, void 0, void 0, function* () {
            const myData = JSON.parse(message.content.toString());
            const knowUser = yield axios_1.default
                .get(`https://crowded-auth.onrender.com/api/${myData.userID}/single-account`)
                .then((res) => {
                return res.data.data.profile;
            });
            console.log();
            const account = yield prisma.crowdProfile.findUnique({
                where: { id: knowUser[0].id },
            });
            account === null || account === void 0 ? void 0 : account.history.push(myData);
            const updated = yield prisma.crowdProfile.update({
                where: { id: knowUser[0].id },
                data: {
                    history: account === null || account === void 0 ? void 0 : account.history,
                },
            });
            console.log(updated);
            yield channel.ack(message);
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.consumeAbegConnection = consumeAbegConnection;
