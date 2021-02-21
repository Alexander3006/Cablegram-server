import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessageBody } from '@nestjs/websockets';
import { RoomNotificationDto, UserNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  private readonly _logger: Logger;
  constructor(private readonly _notificationService: NotificationService) {
    this._logger = new Logger(NotificationController.name);
  }

  @MessagePattern({ cmd: 'notify-users' })
  notifyUser(@MessageBody() notification: UserNotificationDto) {
    try {
      const { event, users, data } = notification;
      users.map(user => {
        this._notificationService.notifyClient(user, event, data);
      });
      return true;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'notify-room' })
  notifyRoom(@MessageBody() notification: RoomNotificationDto) {
    try {
      const { event, room, data } = notification;
      this._notificationService.notifyClients(room, event, data);
      return true;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
