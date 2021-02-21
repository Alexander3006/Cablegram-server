export class CreateUserDto {
  constructor(
    public tag: string,
    public name: string,
    public surname: string,
    public phone: string,
    public gender: string,
    public email: string,
    public password: string,
  ) {}
}

export class UserDto {
  constructor(
    public id: string,
    public tag: string,
    public name: string,
    public surname: string,
    public phone: string,
    public gender: string,
  ) {}
}

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<UserDto>;
  update(userDto: UserDto): Promise<UserDto>;
  delete(id: string): Promise<boolean>;
}
