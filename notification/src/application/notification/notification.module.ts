import { Module } from '@nestjs/common';
import { ConnectionsModule } from '../connections/connections.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [ConnectionsModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [],
})
export class NotificationModule {}
