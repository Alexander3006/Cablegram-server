import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestClient } from 'src/infrastructure/auth/auth.guards';
import { UsersService } from '../infrastructure/users/users.service';
import { CreateUserDto, UserDto } from '../interfaces/usersService.interface';

@Controller('user')
export class UsersController {
  private readonly _logger: Logger;
  constructor(private readonly _usersService: UsersService) {
    this._logger = new Logger(UsersController.name);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const userDto = await this._usersService.create(createUserDto);
      if (!userDto) return new BadRequestException('User not created');
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteUser(@RequestClient() user: UserDto) {
    try {
      const success = await this._usersService.delete(user.id);
      if (!success) return new BadRequestException('User not deleted');
      return success;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateUser(
    @RequestClient() user: UserDto,
    @Body('tag') tag?: string,
    @Body('name') name?: string,
    @Body('surname') surname?: string,
    @Body('phone') phone?: string,
    @Body('gender') gender?: string,
  ) {
    try {
      const updateUserDto = new UserDto(
        user.id,
        tag ?? user.tag,
        name ?? user.name,
        surname ?? user.surname,
        phone ?? user.phone,
        gender ?? user.gender,
      );
      const userDto = await this._usersService.update(updateUserDto);
      if (!userDto) return new BadRequestException('User not updated');
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }
}
