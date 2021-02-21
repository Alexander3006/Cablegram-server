import { Module } from '@nestjs/common';
import { RoomGrantsModule } from '../roomGrants/grants.module';
import { MessagePermissionsService } from './messagePermissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [RoomGrantsModule],
  providers: [MessagePermissionsService],
  controllers: [PermissionsController],
  exports: [],
})
export class PermissionsModule {}
