import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
} from '@nestjs/common';
import { UsersService } from '../infrastructure/usersServrice/users.service';
import { CreateUserDto } from '../interfaces/usersService.interface';

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

  @Get('hello')
  async sayHello() {
    console.dir('ok');
    return 'Hello';
  }
}
