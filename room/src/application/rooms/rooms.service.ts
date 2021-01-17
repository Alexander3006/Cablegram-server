import { Injectable, Logger } from '@nestjs/common';
import { Room } from 'src/domain/model/room/Room.aggregate';
import { RoomName } from 'src/domain/model/room/RoomName.value';
import { RoomTag } from 'src/domain/model/room/RoomTag.value';
import {
  RoomGrantRole,
  RoomGrantRolesEnum,
} from 'src/domain/model/roomGrant/RoomGrantRole.value';
import { UserId } from 'src/domain/model/roomGrant/UserId.value';
import { RoomRepository } from 'src/infrastructure/dataAccess/repositories/Room.repository';
import { RoomGrantRepository } from 'src/infrastructure/dataAccess/repositories/RoomGrant.repository';
import { UnitOfWork } from 'src/infrastructure/dataAccess/UnitOfWork';
import { CreateRoomDto } from './interfaces/rooms.dto';

@Injectable()
export class RoomsService {
  private readonly _logger: Logger;
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _roomRepository: RoomRepository,
  ) {
    this._logger = new Logger(RoomsService.name);
  }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { _unitOfWork } = this;
    const { name, tag, owner } = createRoomDto;
    try {
      //Room
      const roomName = RoomName.create(name);
      const roomTag = RoomTag.create(tag);
      //RoomGrant
      const roomGrantAuthor = UserId.create(owner);
      const roomGrantRole = RoomGrantRole.create(RoomGrantRolesEnum.AUTHOR);
      const roomGrantDelegate = UserId.create(owner);
      //Start Transaction
      await _unitOfWork.startTransaction();
      const newRoom = await _unitOfWork.complete(async () => {
        const roomRepository = _unitOfWork.getRepository(RoomRepository);
        const roomGrantRepository = _unitOfWork.getRepository(
          RoomGrantRepository,
        );
        const room = await roomRepository.create(roomName, roomTag);
        if (!room)
          throw new Error(`Error creating new room: ${createRoomDto.tag}`);
        const grant = await roomGrantRepository.create(
          room.id,
          roomGrantAuthor,
          roomGrantRole,
          roomGrantDelegate,
        );
        if (!grant) throw new Error(`Error creating new grant`);
        return room;
      });
      return newRoom;
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Error creating room: ${createRoomDto}`);
    }
  }
}
