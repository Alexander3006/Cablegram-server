import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INotificationService } from 'src/domain/interfaces/INotificationService';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly _logger: Logger;
  constructor(
    @Inject('NOTIFICATION_MICROSERVICE')
    private readonly _notificationMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(NotificationService.name);
  }

  async notifyUsers<D>(users: string[], event: string, data: D): Promise<void> {
    try {
      await this._notificationMicroservice
        .send({ cmd: 'notify-users' }, { users, event, data })
        .toPromise();
      return;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async notifyRoom<D>(room: number, event: string, data: D): Promise<void> {
    try {
      await this._notificationMicroservice
        .send({ cmd: 'notify-room' }, { room, event, data })
        .toPromise();
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
