import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthDto, JwtTokens } from 'src/interfaces/auth.dto';
import { UserDto } from 'src/interfaces/usersService.interface';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  private readonly _logger: Logger;
  constructor(private readonly _authService: AuthService) {
    this._logger = new Logger(AuthController.name);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() authDto: AuthDto): Promise<JwtTokens> {
    try {
      const user = await this._authService.validate(authDto);
      if (!user) return;
      const tokens = await this._authService.createTokens(user);
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'update-tokens' })
  async updateTokens(@Payload() refresh: string): Promise<JwtTokens> {
    try {
      const tokens = await this._authService.updateTokens(refresh);
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }

  @MessagePattern({ cmd: 'validate-token' })
  async vatidateToken(@Payload() access: string): Promise<UserDto> {
    try {
      const user = await this._authService.verify(access);
      return user;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
