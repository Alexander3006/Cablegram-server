import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import microservicesConfig from './configurations/microservices.config';
import jwtOptions from './configurations/auth.config';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtOptions, microservicesConfig],
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
