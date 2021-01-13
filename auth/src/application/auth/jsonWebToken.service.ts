import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtOptions {
  access_secret: string;
  access_ttl: number;
  refresh_secret: string;
  refresh_ttl: number;
}

@Injectable()
export class JsonWebTokenService<
  AccessPayload extends object,
  RefreshPayload extends object
> {
  private secret_access_token: string;
  private secret_refresh_token: string;
  private access_token_ttl: number;
  private refresh_token_ttl: number;
  private readonly _logger: Logger;
  constructor(options: JwtOptions) {
    const { access_secret, refresh_secret, access_ttl, refresh_ttl } = options;
    this.secret_access_token = access_secret;
    this.secret_refresh_token = refresh_secret;
    this.access_token_ttl = access_ttl;
    this.refresh_token_ttl = refresh_ttl;
    this._logger = new Logger(JsonWebTokenService.name);
  }

  private _sign(
    data: AccessPayload | RefreshPayload,
    secret: string,
    tokenConfiguration: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...data }, secret, tokenConfiguration, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }

  private _verify<Payload extends AccessPayload | RefreshPayload>(
    token: string,
    secret: string,
  ): Promise<Payload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) reject(err);
        else resolve(decode as Payload);
      });
    });
  }

  async createAccessToken(payload: AccessPayload): Promise<string> {
    const { secret_access_token, access_token_ttl } = this;
    try {
      const token: string = await this._sign(payload, secret_access_token, {
        expiresIn: access_token_ttl,
      } as jwt.SignOptions);
      return token;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Access token creating error');
    }
  }

  async createRefreshToken(payload: RefreshPayload): Promise<string> {
    const { secret_refresh_token, refresh_token_ttl } = this;
    try {
      const token: string = await this._sign(payload, secret_refresh_token, {
        expiresIn: refresh_token_ttl,
      } as jwt.SignOptions);
      return token;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Refresh token creating error');
    }
  }

  async verifyAccessToken(token: string): Promise<AccessPayload> {
    const { secret_access_token } = this;
    try {
      const payload = await this._verify<AccessPayload>(
        token,
        secret_access_token,
      );
      return payload;
    } catch (err) {
      this._logger.error(err);
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<RefreshPayload> {
    const { secret_refresh_token } = this;
    try {
      const payload = await this._verify<RefreshPayload>(
        token,
        secret_refresh_token,
      );
      return payload;
    } catch (err) {
      this._logger.error(err);
      return null;
    }
  }
}
