import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import transportConfig from './configurations/transport.config';
import microservicesConfig from './configurations/microservices.config';
import { UsersModule } from './infrastructure/users/users.module';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { RoomsController } from './controllers/rooms.controller';
import { MessagesController } from './controllers/messages.controller';
import { MessagesModule } from './infrastructure/messages/messages.module';
import { RoomsModule } from './infrastructure/rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [transportConfig, microservicesConfig],
    }),

    UsersModule,
    AuthModule,
    MessagesModule,
    RoomsModule,
  ],
  controllers: [
    UsersController,
    AuthController,
    RoomsController,
    MessagesController,
  ],
  providers: [],
})
export class AppModule {}
