import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { getOrmConfig } from 'src/configurations/orm.config';
import { RoomGrantsModule } from './application/roomGrants/grants.module';
import { RoomsModule } from './application/rooms/rooms.module';
import { PermissionsModule } from './application/permissions/permissions.module';

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

    RoomGrantsModule,
    RoomsModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
