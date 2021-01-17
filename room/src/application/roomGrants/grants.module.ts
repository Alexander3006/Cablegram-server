import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { RoomGrantsService } from './grants.service';

@Module({
  imports: [DataAccess],
  providers: [RoomGrantsService],
  exports: [],
})
export class RoomGrantsModule {}
