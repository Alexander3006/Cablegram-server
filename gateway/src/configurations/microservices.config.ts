export interface MicroserviceConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  queue: string;
}

const defaultConfig = {
  host: process.env.AMQP_HOST,
  port: process.env.AMQP_PORT,
  user: process.env.AMQP_USER,
  password: process.env.AMQP_PASSWORD,
};

export default () => {
  return {
    microservices: {
      user: {
        ...defaultConfig,
        queue: process.env.USER_SERVICE_QUEUE,
      } as MicroserviceConfig,
      auth: {
        ...defaultConfig,
        queue: process.env.AUTH_SERVICE_QUEUE,
      },
      message: {
        ...defaultConfig,
        queue: process.env.MESSAGE_SERVICE_QUEUE,
      },
      room: {
        ...defaultConfig,
        queue: process.env.ROOM_SERVICE_QUEUE,
      },
    },
  };
};
