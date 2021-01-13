import { Aggregate } from '../Aggregate';
import { UserGender, UserGenderEnum } from './UserGender.value';
import { UserId } from './UserId.value';
import { UserName } from './UserName.value';
import { UserPhone } from './UserPhone.value';
import { UserSurname } from './UserSurname.value';
import { UserTag } from './UserTag.value';

export class User extends Aggregate<UserId> {
  public userTag: UserTag;
  public userName: UserName;
  public userSurname: UserSurname;
  public userPhone: UserPhone;
  public userGender: UserGender;

  private constructor(
    id: UserId,
    tag: UserTag,
    name: UserName,
    surname: UserSurname,
    phone: UserPhone,
    gender: UserGender,
  ) {
    super(id);
    this.userTag = tag;
    this.userName = name;
    this.userSurname = surname;
    this.userPhone = phone;
    this.userGender = gender;
  }

  public static from(
    id: UserId,
    tag: UserTag,
    name: UserName,
    surname: UserSurname,
    phone: UserPhone,
    gender: UserGender,
  ): User {
    return new User(id, tag, name, surname, phone, gender);
  }

  public static create(
    id: string,
    tag: string,
    name: string,
    surname: string,
    phone: string,
    gender: UserGenderEnum,
  ): User {
    return this.from(
      UserId.create(id),
      UserTag.create(tag),
      UserName.create(name),
      UserSurname.create(surname),
      UserPhone.create(phone),
      UserGender.create(gender),
    );
  }
}
