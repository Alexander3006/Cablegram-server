import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRoomDto,
  CreateRoomGrantDto,
  DeleteRoomGrantDto,
  IRoomsService,
  RoomDto,
  RoomGrantDto,
  UpdateRoomGrantDto,
} from 'src/interfaces/roomsService.interface';

@Injectable()
export class RoomsService implements IRoomsService {
  private readonly _logger: Logger;
  constructor(
    @Inject('ROOM_MICROSERVICE')
    private readonly _roomsMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(RoomsService.name);
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    try {
      const room = await this._roomsMicroservice
        .send({ cmd: 'create-room' }, createRoomDto)
        .toPromise();
      return room;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async createGrant(createGrantDto: CreateRoomGrantDto): Promise<RoomGrantDto> {
    try {
      const grant = await this._roomsMicroservice
        .send({ cmd: 'create-grant' }, createGrantDto)
        .toPromise();
      return grant;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async updateGrant(updateGrantDto: UpdateRoomGrantDto): Promise<RoomGrantDto> {
    try {
      const grant = await this._roomsMicroservice
        .send({ cmd: 'update-grant' }, updateGrantDto)
        .toPromise();
      return grant;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async deleteGrant(deleteGrantDto: DeleteRoomGrantDto): Promise<boolean> {
    try {
      const success = await this._roomsMicroservice
        .send({ cmd: 'delete-grant' }, deleteGrantDto)
        .toPromise();
      return success;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async getGrantsByDelegate(userId: string): Promise<RoomGrantDto[]> {
    try {
      const grants = await this._roomsMicroservice
        .send({ cmd: 'get-grants-by-delegate' }, userId)
        .toPromise();
      return grants;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
