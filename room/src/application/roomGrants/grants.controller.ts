import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { roomGrantToRoomGrantDto } from 'src/tools/mappers';
import { RoomGrantsService } from './grants.service';
import {
  CreateRoomGrantDto,
  DeleteRoomGrantDto,
  RoomGrantDto,
  UpdateRoomGrantDto,
} from './interfaces/roomGrants.dto';

@Controller()
export class RoomGrantsController {
  private readonly _logger: Logger;
  constructor(private readonly _roomGrantsService: RoomGrantsService) {
    this._logger = new Logger(RoomGrantsController.name);
  }

  @MessagePattern({ cmd: 'create-grant' })
  async createGrant(
    @Payload() roomGrantDto: CreateRoomGrantDto,
  ): Promise<RoomGrantDto> {
    try {
      const roomGrant = await this._roomGrantsService.create(roomGrantDto);
      return roomGrantToRoomGrantDto(roomGrant);
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'update-grant' })
  async updateGrant(
    @Payload() roomGrantDto: UpdateRoomGrantDto,
  ): Promise<RoomGrantDto> {
    try {
      const roomGrant = await this._roomGrantsService.update(roomGrantDto);
      return roomGrantToRoomGrantDto(roomGrant);
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'delete-grant' })
  async deleteGrant(
    @Payload() roomGrantDto: DeleteRoomGrantDto,
  ): Promise<boolean> {
    try {
      await this._roomGrantsService.delete(roomGrantDto);
      return true;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'get-grants-by-delegate' })
  async getGrantsByDelegate(
    @Payload() delegateId: string,
  ): Promise<RoomGrantDto[]> {
    try {
      const grants = await this._roomGrantsService.getGrantsByUser(delegateId);
      return grants.map(grant => roomGrantToRoomGrantDto(grant));
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
