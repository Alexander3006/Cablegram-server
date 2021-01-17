import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { RoomGrantsController } from './grants.controller';
import { RoomGrantsService } from './grants.service';

@Module({
  imports: [DataAccess],
  providers: [RoomGrantsService],
  controllers: [RoomGrantsController],
  exports: [],
})
export class RoomGrantsModule {}
