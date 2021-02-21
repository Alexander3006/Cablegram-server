import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestClient } from 'src/infrastructure/auth/auth.guards';
import { RoomsService } from 'src/infrastructure/rooms/rooms.service';
import {
  CreateRoomDto,
  CreateRoomGrantDto,
  DeleteRoomGrantDto,
  UpdateRoomGrantDto,
} from 'src/interfaces/roomsService.interface';
import { UserDto } from 'src/interfaces/usersService.interface';

@UseGuards(AuthGuard)
@Controller('room')
export class RoomsController {
  private readonly _logger: Logger;
  constructor(private readonly _roomsService: RoomsService) {
    this._logger = new Logger(RoomsController.name);
  }

  @Post('create')
  async createRoom(
    @RequestClient() user: UserDto,
    @Body('name') name: string,
    @Body('tag') tag: string,
  ) {
    try {
      const createRoomDto = new CreateRoomDto(name, tag, user.id);
      const room = await this._roomsService.createRoom(createRoomDto);
      if (!room) return new BadRequestException('Room not created');
      return room;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Post('grant/create')
  async createGrant(
    @RequestClient() user: UserDto,
    @Body('delegat') delegat: string,
    @Body('room') room: number,
  ) {
    try {
      const createGrantDto = new CreateRoomGrantDto(user.id, delegat, room);
      const grant = await this._roomsService.createGrant(createGrantDto);
      if (!grant) return new BadRequestException('Grant not created');
      return grant;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Post('grant/update')
  async updateGrant(
    @RequestClient() user: UserDto,
    @Body('delegat') delegat: string,
    @Body('room') room: number,
    @Body('role') role: string,
  ) {
    try {
      const updateGrantDto = new UpdateRoomGrantDto(
        user.id,
        delegat,
        room,
        role,
      );
      const grant = await this._roomsService.updateGrant(updateGrantDto);
      if (!grant) return new BadRequestException('Grant not updated');
      return grant;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Delete('grant')
  async deleteGrant(
    @RequestClient() user: UserDto,
    @Body('delegat') delegat: string,
    @Body('room') room: number,
  ) {
    try {
      const deleteGrantDto = new DeleteRoomGrantDto(user.id, delegat, room);
      const success = await this._roomsService.deleteGrant(deleteGrantDto);
      if (!success) return new BadRequestException('Grant not deleted');
      return success;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Get('grant')
  async getAllUsersGrants(@RequestClient() user: UserDto) {
    try {
      const grants = await this._roomsService.getGrantsByDelegate(user.id);
      if (!grants) return new BadRequestException();
      return grants;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }
}
