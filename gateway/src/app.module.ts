import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import transportConfig from './configurations/transport.config';
import microservicesConfig from './configurations/microservices.config';
import { UsersModule } from './infrastructure/usersServrice/users.module';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from './infrastructure/authService/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [transportConfig, microservicesConfig],
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
