import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConfig } from 'src/configurations/microservices.config';
import { GrantsService } from './grants.service';

const RoomsMicroserviceProvider: Provider = {
  provide: 'ROOMS_MICROSERVICE',
  useFactory: (configService: ConfigService) => {
    const { host, port, user, password, queue } = configService.get<
      MicroserviceConfig
    >('microservices.rooms');
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

const GrantsServiceProvider: Provider = {
  provide: GrantsService,
  useClass: GrantsService,
};

@Module({
  imports: [ConfigModule],
  providers: [RoomsMicroserviceProvider, GrantsServiceProvider],
  exports: [RoomsMicroserviceProvider, GrantsServiceProvider],
})
export class GrantsModule {}
