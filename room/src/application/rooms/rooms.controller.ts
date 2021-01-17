import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Room } from 'src/domain/model/room/Room.aggregate';
import { roomToRoomDto } from 'src/tools/mappers';
import { CreateRoomDto, RoomDto } from './interfaces/rooms.dto';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  private readonly _logger: Logger;
  constructor(private readonly _roomsService: RoomsService) {
    this._logger = new Logger(RoomsController.name);
  }

  @MessagePattern({ cmd: 'create-room' })
  async createRoom(@Payload() roomDto: CreateRoomDto): Promise<RoomDto> {
    try {
      const room = await this._roomsService.create(roomDto);
      return roomToRoomDto(room);
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
