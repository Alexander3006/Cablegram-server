import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConfig } from 'src/configurations/microservices.config';

const MessageMicroserviceProvider: Provider = {
  provide: 'MESSAGE_MICROSERVICE',
  useFactory: (configService: ConfigService) => {
    const { host, port, user, password, queue } = configService.get<
      MicroserviceConfig
    >('microservices.message');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}:${port}`],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [MessageMicroserviceProvider],
  exports: [MessageMicroserviceProvider],
})
export class MessageStorageModule {}
