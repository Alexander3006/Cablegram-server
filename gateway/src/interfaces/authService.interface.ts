import { UserDto } from './usersService.interface';

export class AuthDto {
  email: string;
  password: string;
}

export class JwtTokens {
  access: string;
  refresh: string;
}

export interface IAuthService {
  login(authDto: AuthDto): Promise<JwtTokens>;
  updateTokens(refresh: string): Promise<JwtTokens>;
  verify(access: string): Promise<UserDto>;
}
