import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import transportConfig from 'src/configurations/transport.config';
import microservicesConfig from 'src/configurations/microservices.config';
import { AuthModule } from './infrastructure/authService/auth.module';
import { ConnectionsModule } from './application/connections/connections.module';
import { NotificationModule } from './application/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [transportConfig, microservicesConfig],
    }),
    ConnectionsModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
