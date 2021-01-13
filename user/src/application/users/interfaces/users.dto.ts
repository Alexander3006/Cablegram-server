import { UserGenderEnum } from 'src/domain/model/user/UserGender.value';

export class CreateUserDto {
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: UserGenderEnum;
  email: string;
  password: string;
}

export class IdentityDto {
  email: string;
  password: string;
}

export class UserDto {
  id: string;
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: UserGenderEnum;
}
