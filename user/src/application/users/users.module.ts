import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DataAccess],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
