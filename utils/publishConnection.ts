import amqplib from "amqplib";

const amqplibServer = "amqp://localhost:5672";

export const publishConnection = async (queue: string, data: any) => {
  try {
    const connnect = await amqplib.connect(amqplibServer);
    const channel = await connnect.createChannel();

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};
