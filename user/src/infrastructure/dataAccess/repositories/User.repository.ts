import { Logger } from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/dataAccess/entities/User.entity';
import { IUserRepository } from 'src/domain/interfaces/repositories/IUserRepository';
import { EntityManager, EntityRepository } from 'typeorm';
import { UserTag } from 'src/domain/model/user/UserTag.value';
import { UserName } from 'src/domain/model/user/UserName.value';
import { UserPhone } from 'src/domain/model/user/UserPhone.value';
import { UserGender } from 'src/domain/model/user/UserGender.value';
import { UserSurname } from 'src/domain/model/user/UserSurname.value';
import { User } from 'src/domain/model/user/User.aggregate';
import { UserId } from 'src/domain/model/user/UserId.value';

@EntityRepository(UserEntity)
export class UserRepository implements IUserRepository {
  private readonly _logger: Logger;
  constructor(private readonly _manager: EntityManager) {
    this._logger = new Logger(UserRepository.name);
  }

  async create(
    userTag: UserTag,
    userName: UserName,
    userSurname: UserSurname,
    userPhone: UserPhone,
    userGender: UserGender,
  ): Promise<User> {
    try {
      const userEntity = new UserEntity();
      userEntity.tag = userTag.tag;
      userEntity.name = userName.name;
      userEntity.surname = userSurname.surname;
      userEntity.phone = userPhone.phone;
      userEntity.gender = userGender.gender;
      const {
        id,
        tag,
        name,
        surname,
        phone,
        gender,
      } = await this._manager.save(userEntity);
      return User.create(id, tag, name, surname, phone, gender);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error creating user');
    }
  }

  async delete(user: UserId): Promise<void> {
    try {
      const userEntity = new UserEntity();
      userEntity.id = user.id;
      await this._manager.remove(user);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error deleting user');
    }
  }

  async update(user: User): Promise<User> {
    try {
      const userEntity = new UserEntity();
      const {
        id: userId,
        userTag,
        userName,
        userSurname,
        userGender,
        userPhone,
      } = user;
      userEntity.id = userId.id;
      userEntity.tag = userTag.tag;
      userEntity.name = userName.name;
      userEntity.surname = userSurname.surname;
      userEntity.phone = userPhone.phone;
      userEntity.gender = userGender.gender;
      const {
        id,
        tag,
        name,
        surname,
        phone,
        gender,
      } = await this._manager.save(userEntity);
      return User.create(id, tag, name, surname, phone, gender);
    } catch (err) {
      this._logger.error(err);
      throw new Error('User update error');
    }
  }

  async get(options: UserId): Promise<User> {
    try {
      const {
        id,
        tag,
        name,
        surname,
        phone,
        gender,
      } = await this._manager.findOne(UserEntity, {
        where: {
          id: options.id,
        },
      });
      return User.create(id, tag, name, surname, phone, gender);
    } catch (err) {
      this._logger.error(err);
      throw new Error('User search error');
    }
  }
}
