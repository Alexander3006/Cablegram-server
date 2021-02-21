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
      auth: {
        ...defaultConfig,
        queue: process.env.AUTH_SERVICE_QUEUE,
      },
      rooms: {
        ...defaultConfig,
        queue: process.env.ROOM_SERVICE_QUEUE,
      },
    },
  };
};
