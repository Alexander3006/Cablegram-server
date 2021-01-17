import { Logger } from '@nestjs/common';
import { IRoomRepository } from 'src/domain/interfaces/IRoomRepository';
import { Room } from 'src/domain/model/room/Room.aggregate';
import { RoomName } from 'src/domain/model/room/RoomName.value';
import { RoomTag } from 'src/domain/model/room/RoomTag.value';
import { EntityManager, EntityRepository } from 'typeorm';
import { RoomEntity } from '../entities/Room.entity';

@EntityRepository(RoomEntity)
export class RoomRepository implements IRoomRepository {
  private readonly _logger: Logger;
  constructor(private readonly _manager: EntityManager) {
    this._logger = new Logger(RoomRepository.name);
  }

  async create(roomName: RoomName, roomTag: RoomTag): Promise<Room> {
    try {
      const roomEntity = new RoomEntity();
      roomEntity.name = roomName.name;
      roomEntity.tag = roomTag.tag;
      const { id, tag, name } = await this._manager.save(roomEntity);
      return Room.create(id, tag, name);
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Error creating user`);
    }
  }

  async update(room: Room): Promise<Room> {
    try {
      const { id: roomId, roomName, roomTag } = room;
      const roomEntity = new RoomEntity();
      roomEntity.id = roomId.id;
      roomEntity.name = roomName.name;
      roomEntity.tag = roomTag.tag;
      const { id, tag, name } = await this._manager.save(roomEntity);
      return Room.create(id, tag, name);
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Room update error`);
    }
  }
}
