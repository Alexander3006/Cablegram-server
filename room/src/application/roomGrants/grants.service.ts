import { Injectable, Logger } from '@nestjs/common';
import { RoomId } from 'src/domain/model/room/RoomId.value';
import { RoomGrant } from 'src/domain/model/roomGrant/RoomGrant.aggregate';
import {
  RoomGrantRole,
  RoomGrantRolesEnum,
} from 'src/domain/model/roomGrant/RoomGrantRole.value';
import { UserId } from 'src/domain/model/roomGrant/UserId.value';
import { RoomGrantRepository } from 'src/infrastructure/dataAccess/repositories/RoomGrant.repository';
import {
  CreateRoomGrantDto,
  DeleteRoomGrantDto,
  UpdateRoomGrantDto,
} from './interfaces/roomGrants.dto';

const DEFAULT_ROLE = RoomGrantRolesEnum.USER;

@Injectable()
export class RoomGrantsService {
  private readonly _logger: Logger;
  constructor(private readonly _roomGrantRepository: RoomGrantRepository) {
    this._logger = new Logger(RoomGrantsService.name);
  }

  async create(roomGrantDto: CreateRoomGrantDto): Promise<RoomGrant> {
    try {
      const { author, delegat, room } = roomGrantDto;
      const roomId = RoomId.create(room);
      const delegatId = UserId.create(delegat);
      const delegatGrant = await this._roomGrantRepository.get(
        roomId,
        delegatId,
      );
      if (delegatGrant) throw new Error('Grant already exist');
      const authorId = UserId.create(author);
      const authorGrant = await this._roomGrantRepository.get(roomId, authorId);
      if (!authorGrant) throw new Error('Do not have permission');
      const grantRole = RoomGrantRole.create(DEFAULT_ROLE);
      const newRoomGrant = await this._roomGrantRepository.create(
        roomId,
        authorId,
        grantRole,
        delegatId,
      );
      return newRoomGrant;
    } catch (err) {
      this._logger.error(err);
      throw new Error('RoomGrant creating error');
    }
  }

  async update(roomGrantDto: UpdateRoomGrantDto): Promise<RoomGrant> {
    try {
      const { author, delegat, room, role } = roomGrantDto;
      const roomId = RoomId.create(room);
      const authorId = UserId.create(author);
      const delegatId = UserId.create(delegat);
      const authorGrant = await this._roomGrantRepository.get(roomId, authorId);
      if (!authorGrant) throw new Error(`Do not exist grant: ${author}`);
      const delegatGrant = await this._roomGrantRepository.get(
        roomId,
        delegatId,
      );
      if (!delegatGrant) throw new Error(`Do not exist grant: ${delegat}`);
      const grantRole = RoomGrantRole.create(role);
      const authorRole = authorGrant.roomGrantRole;
      if (!authorRole.canUpdate(grantRole, delegatGrant.roomGrantRole)) {
        throw new Error(
          `You do not have permission to create new RoomGrant with role: ${grantRole.role}`,
        );
      }
      delegatGrant.roomGrantRole = grantRole;
      const updatedGrant = await this._roomGrantRepository.update(delegatGrant);
      return updatedGrant;
    } catch (err) {
      this._logger.error(err);
      throw new Error('RoomGrant updating error');
    }
  }

  async delete(deleteGrant: DeleteRoomGrantDto): Promise<void> {
    try {
      const { initiator, delegat, room } = deleteGrant;
      const roomId = RoomId.create(room);
      const initiatorId = UserId.create(initiator);
      const delegatId = UserId.create(delegat);
      const delegatGrant = await this._roomGrantRepository.get(
        roomId,
        delegatId,
      );
      if (!delegatGrant) throw new Error('Delegat grant do not exist');
      const initiatorGrant = await this._roomGrantRepository.get(
        roomId,
        initiatorId,
      );
      if (!initiatorGrant) throw new Error('Do not have permission');
      if (
        !initiatorGrant.roomGrantRole.canDelete(delegatGrant.roomGrantRole) ||
        initiator !== delegat
      ) {
        throw new Error('Do not have permission');
      }
      await this._roomGrantRepository.delete(delegatGrant.id);
    } catch (err) {
      this._logger.error(err);
      throw new Error('RoomGrant deleting error');
    }
  }

  async getGrantByUserAndRoom(
    room: number,
    delegat: string,
  ): Promise<RoomGrant> {
    try {
      const roomId = RoomId.create(room);
      const userId = UserId.create(delegat);
      const roomGrant = await this._roomGrantRepository.get(roomId, userId);
      return roomGrant;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error finding room grant');
    }
  }
}
