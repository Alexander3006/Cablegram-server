import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConfig } from 'src/configurations/microservices.config';
import { AuthGuard } from './auth.guards';
import { AuthService } from './auth.service';

const AuthMicroserviceProvider: Provider = {
  provide: 'AUTH_MICROSERVICE',
  useFactory: (configService: ConfigService) => {
    const { host, port, user, password, queue } = configService.get<
      MicroserviceConfig
    >('microservices.auth');
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

const AuthServiceProvider: Provider = {
  provide: AuthService,
  useClass: AuthService,
};

@Module({
  imports: [ConfigModule],
  providers: [AuthMicroserviceProvider, AuthServiceProvider, AuthGuard],
  exports: [AuthMicroserviceProvider, AuthServiceProvider],
})
export class AuthModule {}
