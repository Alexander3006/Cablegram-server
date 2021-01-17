import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [DataAccess],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [],
})
export class RoomsModule {}
