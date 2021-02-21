import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IAuthService, UserDto } from 'src/domain/interfaces/authService';

@Injectable()
export class AuthService implements IAuthService {
  private readonly _logger: Logger;
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly _authMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(AuthService.name);
  }

  async validate(accessToken: string): Promise<UserDto> {
    try {
      const userDto = await this._authMicroservice
        .send<UserDto, string>({ cmd: 'validate-token' }, accessToken)
        .toPromise();
      return userDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
