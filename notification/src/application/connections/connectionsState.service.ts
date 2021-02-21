import { Injectable, Logger, Scope } from '@nestjs/common';
import { UserDto } from 'src/domain/interfaces/authService';
import { GrantsService } from 'src/infrastructure/grantService/grants.service';
import WebSocket from 'ws';

type roomId = number;
type userId = string;

@Injectable({ scope: Scope.DEFAULT })
export class ConnectionsState {
  private readonly _logger: Logger;
  private readonly _rooms: Map<roomId, Set<WebSocket>>;
  private readonly _clients: Map<userId, WebSocket>;
  constructor(private readonly _grantsService: GrantsService) {
    this._logger = new Logger(ConnectionsState.name);
    this._rooms = new Map<roomId, Set<WebSocket>>();
    this._clients = new Map<userId, WebSocket>();
  }

  async subscribe(user: UserDto, socket: WebSocket): Promise<roomId[]> {
    try {
      const rooms = await this._grantsService.getGrantsByClientId(user.id);
      const roomsIds = rooms.map(room => room.room);
      const subRooms = roomsIds.map(roomId => {
        const subscriptions = this._rooms.get(roomId) ?? new Set();
        subscriptions.add(socket);
        this._rooms.set(roomId, subscriptions);
        return roomId;
      });
      this._clients.set(user.id, socket);
      return subRooms;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Subscription error');
    }
  }

  unsubscribe(socket: WebSocket) {
    this._rooms.forEach((subscribers, roomId, target) => {
      subscribers.delete(socket);
      if (!subscribers.size) target.delete(roomId);
    });
    this._clients.forEach((client, key, target) => {
      client === socket ? target.delete(key) : null;
    });
  }

  getSubscribers(roomId: roomId): Set<WebSocket> {
    const subscribers = this._rooms.get(roomId) ?? new Set();
    return subscribers;
  }

  getSubscriber(userId: userId): WebSocket {
    const client = this._clients.get(userId);
    return client;
  }
}
