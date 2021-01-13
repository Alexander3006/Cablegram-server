import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { userToUserDto } from 'src/tools/mappers';
import { CreateUserDto, IdentityDto, UserDto } from './interfaces/users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  private readonly _logger: Logger;
  constructor(private readonly _usersService: UsersService) {
    this._logger = new Logger(UsersController.name);
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this._usersService.createUser(createUserDto);
      const userDto = userToUserDto(user);
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload() id: string): Promise<boolean> {
    try {
      await this._usersService.deleteUser(id);
      return true;
    } catch (err) {
      this._logger.error(err);
      return false;
    }
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUserData(@Payload() userDto: UserDto): Promise<UserDto> {
    try {
      const updatedUser = await this._usersService.updateUser(userDto);
      const updatedUserDto = userToUserDto(updatedUser);
      return updatedUserDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUserById(@Payload() id: string): Promise<UserDto> {
    try {
      const user = await this._usersService.getUserById(id);
      const userDto = userToUserDto(user);
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'check-identity' })
  async checkIdentity(@Payload() identityDto: IdentityDto): Promise<UserDto> {
    try {
      const user = await this._usersService.getUserByIdentity(identityDto);
      const userDto = userToUserDto(user);
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
