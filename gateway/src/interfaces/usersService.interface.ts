export class CreateUserDto {
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: string;
  email: string;
  password: string;
}

export class UserDto {
  id: string;
  tag: string;
  name: string;
  surname: string;
  phone: string;
  gender: string;
}

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<UserDto>;
  update(userDto: UserDto): Promise<UserDto>;
  delete(id: string): Promise<boolean>;
}
