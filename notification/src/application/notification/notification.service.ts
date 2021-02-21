import { Injectable, Logger } from '@nestjs/common';
import { ConnectionsState } from '../connections/connectionsState.service';

@Injectable()
export class NotificationService {
  private readonly _logger: Logger;
  constructor(private readonly _connectionsState: ConnectionsState) {
    this._logger = new Logger(NotificationService.name);
  }

  notifyClient<D>(userId: string, event: string, data: D) {
    try {
      const subscriber = this._connectionsState.getSubscriber(userId);
      if (!subscriber) return;
      const message = {
        event: event,
        data: data,
      };
      const messageJson = JSON.stringify(message);
      subscriber.send(messageJson);
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  notifyClients<D>(roomId: number, event: string, data: D) {
    try {
      const subscribers = this._connectionsState.getSubscribers(roomId);
      if (!subscribers.size) return;
      const message = {
        event: event,
        data: data,
      };
      const messageJson = JSON.stringify(message);
      subscribers.forEach(subscriber => {
        subscriber.send(messageJson);
      });
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
