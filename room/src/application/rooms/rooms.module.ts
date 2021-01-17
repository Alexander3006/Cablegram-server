import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { RoomsService } from './rooms.service';

@Module({
  imports: [DataAccess],
  providers: [RoomsService],
  exports: [],
})
export class RoomsModule {}
