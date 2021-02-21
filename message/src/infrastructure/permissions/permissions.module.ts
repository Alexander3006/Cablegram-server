import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConfig } from 'src/configuration/microservices.config';
import { PermissionsService } from './permissions.service';

const RoomMicroserviceProvider: Provider = {
  provide: 'ROOM_MICROSERVICE',
  useFactory: (configService: ConfigService) => {
    const { host, port, user, password, queue } = configService.get<
      MicroserviceConfig
    >('microservices.room');
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
  providers: [RoomMicroserviceProvider, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
