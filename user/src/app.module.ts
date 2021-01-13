import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { UsersModule } from './application/users/users.module';
import { getOrmConfig } from './configurations/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getOrmConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: ConnectionOptions = configService.get<ConnectionOptions>(
          'db.options',
        );
        return options;
      },
    } as TypeOrmModuleAsyncOptions),

    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
