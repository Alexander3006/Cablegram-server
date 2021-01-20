import { Module } from '@nestjs/common';
import { MessageStorageModule } from 'src/infrastructure/messageStorage/messageStorage.module';
import { RoomGrantsModule } from '../roomGrants/grants.module';
import { MessagesService } from './messages.service';

@Module({
  imports: [RoomGrantsModule, MessageStorageModule],
  providers: [MessagesService],
  controllers: [],
  exports: [MessagesService],
})
export class MessagesModule {}
