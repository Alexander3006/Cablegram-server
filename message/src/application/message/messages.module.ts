import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';
import { NotificationModule } from 'src/infrastructure/notification/notification.module';
import { PermissionsModule } from 'src/infrastructure/permissions/permissions.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [DataAccess, PermissionsModule, NotificationModule],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [],
})
export class MessagesModule {}
