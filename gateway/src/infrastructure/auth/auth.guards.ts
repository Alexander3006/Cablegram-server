import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ACCESS_HEADER } from 'src/configurations/headers.config';
import { UserDto } from 'src/interfaces/usersService.interface';

const clientSymbol = Symbol('client');

export const RequestClient = createParamDecorator(
  (_, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request[clientSymbol];
  },
);

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly _logger: Logger;
  constructor(private readonly _authService: AuthService) {
    this._logger = new Logger(AuthGuard.name);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = ctx.switchToHttp().getRequest();
      const token = request.headers[ACCESS_HEADER];
      const user = await this._authService.verify(token);
      if (!user) return false;
      request[clientSymbol] = user;
      return true;
    } catch (err) {
      this._logger.error(err);
      return false;
    }
  }
}
