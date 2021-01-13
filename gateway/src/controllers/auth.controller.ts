import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { REFRESH_HEADER } from 'src/configurations/headers.config';
import { AuthService } from 'src/infrastructure/authService/auth.service';
import { AuthDto } from 'src/interfaces/authService.interface';

@Controller('auth')
export class AuthController {
  private readonly _logger: Logger;
  constructor(private readonly _authService: AuthService) {
    this._logger = new Logger(AuthController.name);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    try {
      const tokens = await this._authService.login(authDto);
      if (!tokens) return new UnauthorizedException('Login error');
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }

  @Get('update')
  async updateTokens(@Headers(REFRESH_HEADER) refresh: string) {
    try {
      const tokens = await this._authService.updateTokens(refresh);
      if (!tokens) return new UnauthorizedException('Tokens update error');
      return tokens;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }
}
