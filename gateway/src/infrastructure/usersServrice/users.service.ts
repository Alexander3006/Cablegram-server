import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  IUsersService,
  UserDto,
} from '../../interfaces/usersService.interface';

@Injectable()
export class UsersService implements IUsersService {
  private readonly _logger: Logger;
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly _usersMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(UsersService.name);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const userDto = await this._usersMicroservice
        .send<UserDto, CreateUserDto>({ cmd: 'create-user' }, createUserDto)
        .toPromise();
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async update(userDto: UserDto): Promise<UserDto> {
    try {
      const updatedUserDto = await this._usersMicroservice
        .send<UserDto, UserDto>({ cmd: 'update-user' }, userDto)
        .toPromise();
      return updatedUserDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const isDeleted = await this._usersMicroservice
        .send<boolean, string>({ cmd: 'delete-user' }, id)
        .toPromise();
      return isDeleted;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
