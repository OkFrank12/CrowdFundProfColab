import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const amqpServer: string =
  "amqps://ytczyrcc:VVy6y7RE1kt3-FCMs_kV1621467bNh0t@whale.rmq.cloudamqp.com/ytczyrcc";
const prisma = new PrismaClient();

export const consumeAbegConnection = async (queue: string) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, async (message: any) => {
      const myData = JSON.parse(message.content.toString());

      const knowUser = await axios
        .get(
          `https://crowded-auth.onrender.com/api/${myData.userID}/single-account`
        )
        .then((res) => {
          return res.data.data.profile;
        });
      console.log();
      const account: any = await prisma.crowdProfile.findUnique({
        where: { id: knowUser[0].id },
      });
      account?.history.push(myData);

      const updated = await prisma.crowdProfile.update({
        where: { id: knowUser[0].id },
        data: {
          history: account?.history,
        },
      });
      console.log(updated);
      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};
