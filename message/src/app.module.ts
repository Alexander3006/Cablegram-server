import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { getOrmConfig } from './configuration/orm.config';

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
        const options = configService.get<ConnectionOptions>('db.options');
        return options;
      },
    } as TypeOrmModuleAsyncOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
