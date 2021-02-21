export class UserDto {
  id: string;
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: string;
}

export interface IAuthService {
  validate(accessToken: string): Promise<UserDto>;
}
