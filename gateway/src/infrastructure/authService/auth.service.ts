import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthDto,
  IAuthService,
  JwtTokens,
} from 'src/interfaces/authService.interface';
import { UserDto } from 'src/interfaces/usersService.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly _logger: Logger;
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly _authMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(AuthService.name);
  }

  async login(authDto: AuthDto): Promise<JwtTokens> {
    try {
      const tokens = await this._authMicroservice
        .send<JwtTokens, AuthDto>({ cmd: 'login' }, authDto)
        .toPromise();
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async updateTokens(refresh: string): Promise<JwtTokens> {
    try {
      const tokens = await this._authMicroservice
        .send<JwtTokens, string>({ cmd: 'update-tokens' }, refresh)
        .toPromise();
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  async verify(access: string): Promise<UserDto> {
    try {
      const userDto = await this._authMicroservice
        .send<UserDto, string>({ cmd: 'validate-token' }, access)
        .toPromise();
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
