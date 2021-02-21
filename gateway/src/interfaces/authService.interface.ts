import { UserDto } from './usersService.interface';

export class AuthDto {
  constructor(public email: string, public password: string) {}
}

export class JwtTokens {
  constructor(public access: string, public refresh: string) {}
}

export interface IAuthService {
  login(authDto: AuthDto): Promise<JwtTokens>;
  updateTokens(refresh: string): Promise<JwtTokens>;
  verify(access: string): Promise<UserDto>;
}
