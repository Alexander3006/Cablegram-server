import { AuthDto } from './auth.dto';

export class UserDto {
  id: string;
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: string;
}

export interface IUserService {
  validate(authDto: AuthDto): Promise<UserDto>;
  getUserById(id: string): Promise<UserDto>;
}
