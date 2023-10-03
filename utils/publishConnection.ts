import amqplib from "amqplib";

const amqplibServer = "amqps://ytczyrcc:VVy6y7RE1kt3-FCMs_kV1621467bNh0t@whale.rmq.cloudamqp.com/ytczyrcc";

export const publishConnection = async (queue: string, data: any) => {
  try {
    const connnect = await amqplib.connect(amqplibServer);
    const channel = await connnect.createChannel();

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    
  } catch (error) {
    console.log(error);
  }
};
