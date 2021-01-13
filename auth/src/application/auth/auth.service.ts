import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/infrastructure/usersService/users.service';
import {
  AccessPayloadDto,
  AuthDto,
  JwtTokens,
  RefreshPayloadDto,
} from 'src/interfaces/auth.dto';
import { UserDto } from 'src/interfaces/usersService.interface';
import { JsonWebTokenService } from './jsonWebToken.service';

@Injectable()
export class AuthService {
  private readonly _logger: Logger;
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JsonWebTokenService<
      AccessPayloadDto,
      RefreshPayloadDto
    >,
  ) {
    this._logger = new Logger(AuthService.name);
  }

  async validate(authDto: AuthDto): Promise<UserDto> {
    try {
      const userDto = await this._usersService.validate(authDto);
      if (!userDto) return;
      return userDto;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Validation Error');
    }
  }

  async createTokens(userDto: UserDto): Promise<JwtTokens> {
    try {
      const { id, tag, phone } = userDto;
      const accessPayload = new AccessPayloadDto(id, tag, phone);
      const accessToken = await this._jwtService.createAccessToken(
        accessPayload,
      );
      if (!accessToken) return;
      const refreshPayload = new RefreshPayloadDto(id);
      const refreshToken = await this._jwtService.createRefreshToken(
        refreshPayload,
      );
      if (!refreshToken) return;
      return {
        access: accessToken,
        refresh: refreshToken,
      } as JwtTokens;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error creating tokent');
    }
  }

  async updateTokens(refresh: string): Promise<JwtTokens> {
    try {
      const { id } = await this._jwtService.verifyRefreshToken(refresh);
      const userDto = await this._usersService.getUserById(id);
      if (!userDto) return;
      const tokens = await this.createTokens(userDto);
      return tokens;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Token update error');
    }
  }

  async verify(access: string): Promise<UserDto> {
    try {
      const payload = await this._jwtService.verifyAccessToken(access);
      if (!payload) return;
      const userDto = await this._usersService.getUserById(payload.id);
      return userDto;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Token verify error');
    }
  }
}
