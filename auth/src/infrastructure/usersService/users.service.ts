import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from 'src/interfaces/auth.dto';
import { IUserService, UserDto } from 'src/interfaces/usersService.interface';

@Injectable()
export class UsersService implements IUserService {
  private readonly _logger: Logger;
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly _usersMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(UsersService.name);
  }

  async validate(authDto: AuthDto): Promise<UserDto> {
    try {
      const userDto = await this._usersMicroservice
        .send<UserDto, AuthDto>({ cmd: 'check-identity' }, authDto)
        .toPromise();
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    try {
      const userDto = await this._usersMicroservice
        .send<UserDto, string>({ cmd: 'get-user' }, id)
        .toPromise();
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
