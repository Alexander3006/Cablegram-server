import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConfig } from 'src/configurations/microservices.config';
import { UsersService } from './users.service';

const UserMicroserviceProvider: Provider = {
  provide: 'USER_MICROSERVICE',
  useFactory: (configService: ConfigService) => {
    const { host, port, user, password, queue } = configService.get<
      MicroserviceConfig
    >('microservices.user');
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

const UsersServiceProvider: Provider = {
  provide: UsersService,
  useClass: UsersService,
};

@Module({
  imports: [ConfigModule],
  providers: [UserMicroserviceProvider, UsersServiceProvider],
  exports: [UserMicroserviceProvider, UsersServiceProvider],
})
export class UsersModule {}
