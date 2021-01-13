import { UserDto } from 'src/application/users/interfaces/users.dto';
import { User } from 'src/domain/model/user/User.aggregate';

export const userToUserDto = (user: User): UserDto => {
  const { id, userName, userSurname, userTag, userGender, userPhone } = user;
  const userDto = new UserDto();
  userDto.id = id.id;
  userDto.name = userName.name;
  userDto.surname = userSurname.surname;
  userDto.phone = userPhone.phone;
  userDto.tag = userTag.tag;
  userDto.gender = userGender.gender;
  return userDto;
};
