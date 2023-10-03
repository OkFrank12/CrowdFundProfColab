import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";

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

      const account: any = await prisma.crowdProfile.findUnique({
        where: { id: myData?.userID },
      });

      account?.history.push(myData);

      await prisma.crowdProfile.update({
        where: { id: myData?.userID },
        data: {
          history: account?.history,
        },
      });

      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};
