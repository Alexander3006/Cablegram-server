import { Logger } from '@nestjs/common';
import { RoomGrantEntity } from 'src/infrastructure/dataAccess/entities/RoomGrant.entity';
import { IRoomGrantRepository } from 'src/domain/interfaces/IRoomGrantRepository';
import { EntityManager, EntityRepository } from 'typeorm';
import { RoomGrant } from 'src/domain/model/roomGrant/RoomGrant.aggregate';
import { RoomGrantId } from 'src/domain/model/roomGrant/RoomGrantId.value';
import { UserId } from 'src/domain/model/roomGrant/UserId.value';
import { RoomId } from 'src/domain/model/room/RoomId.value';
import { RoomGrantRole } from 'src/domain/model/roomGrant/RoomGrantRole.value';
import { RoomEntity } from '../entities/Room.entity';

@EntityRepository(RoomGrantEntity)
export class RoomGrantRepository implements IRoomGrantRepository {
  private readonly _logger: Logger;
  constructor(private readonly _manager: EntityManager) {
    this._logger = new Logger(RoomGrantRepository.name);
  }

  async create(
    roomId: RoomId,
    roomGrantAuthor: UserId,
    roomGrantRole: RoomGrantRole,
    roomGrantDelegat: UserId,
  ): Promise<RoomGrant> {
    try {
      const roomGrantEntity = new RoomGrantEntity();
      const roomEntity = new RoomEntity();
      roomEntity.id = roomId.id;
      roomGrantEntity.room = roomEntity;
      roomGrantEntity.author = roomGrantAuthor.id;
      roomGrantEntity.delegat = roomGrantDelegat.id;
      roomGrantEntity.role = roomGrantRole.role;
      const { id, room, author, delegat, role } = await this._manager.save(
        roomGrantEntity,
      );
      return RoomGrant.create(id, room.id, author, delegat, role);
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Error creating RoomGrant`);
    }
  }

  async update(roomGrant: RoomGrant): Promise<RoomGrant> {
    try {
      const {
        id: roomGrantId,
        roomId,
        roomGrantAuthor,
        roomGrantDelegat,
        roomGrantRole,
      } = roomGrant;
      const roomGrantEntity = new RoomGrantEntity();
      const roomEntity = new RoomEntity();
      roomEntity.id = roomId.id;
      roomGrantEntity.id = roomGrantId.id;
      roomGrantEntity.room = roomEntity;
      roomGrantEntity.author = roomGrantAuthor.id;
      roomGrantEntity.delegat = roomGrantDelegat.id;
      roomGrantEntity.role = roomGrantRole.role;
      const { id, room, author, delegat, role } = await this._manager.save(
        roomGrantEntity,
      );
      return RoomGrant.create(id, room.id, author, delegat, role);
    } catch (err) {
      this._logger.error(err);
      throw new Error(`RoomGrant update error`);
    }
  }

  async delete(roomGrant: RoomGrantId): Promise<void> {
    try {
      const roomGrantEntity = new RoomGrantEntity();
      roomGrantEntity.id = roomGrant.id;
      await this._manager.remove(roomGrantEntity);
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Error deleting RoomGrant`);
    }
  }

  async get(roomId: RoomId, delegatId: UserId): Promise<RoomGrant> {
    try {
      const grantDto = await this._manager.findOne(RoomGrantEntity, {
        relations: ['room'],
        where: {
          room: roomId.id,
          delegat: delegatId.id,
        },
      });
      if (!grantDto) return;
      const { id, room, author, delegat, role } = grantDto;
      const roomGrant = RoomGrant.create(id, room.id, author, delegat, role);
      return roomGrant;
    } catch (err) {
      this._logger.error(err);
      throw new Error(`GrantRoom search error`);
    }
  }

  async getAll(options: UserId): Promise<RoomGrant[]> {
    try {
      const roomGrantEntities = await this._manager.find(RoomGrantEntity, {
        relations: ['room'],
        where: {
          delegat: options.id,
        },
      });
      const roomGrants = roomGrantEntities.map(roomGrantEntity => {
        const { id, room, author, delegat, role } = roomGrantEntity;
        return RoomGrant.create(id, room.id, author, delegat, role);
      });
      return roomGrants;
    } catch (err) {
      this._logger.error(err);
      throw new Error(`RoomGrants search error`);
    }
  }
}
