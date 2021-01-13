import { User } from '../../model/user/User.aggregate';
import { UserGender } from '../../model/user/UserGender.value';
import { UserId } from '../../model/user/UserId.value';
import { UserName } from '../../model/user/UserName.value';
import { UserPhone } from '../../model/user/UserPhone.value';
import { UserSurname } from '../../model/user/UserSurname.value';
import { UserTag } from '../../model/user/UserTag.value';

export interface IUserRepository {
  create(
    tag: UserTag,
    name: UserName,
    surname: UserSurname,
    phone: UserPhone,
    gender: UserGender,
  ): Promise<User>;
  delete(user: UserId): Promise<void>;
  update(user: User): Promise<User>;
  get(userId: UserId): Promise<User>;
}
