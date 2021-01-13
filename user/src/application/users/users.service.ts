import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/dataAccess/repositories/User.repository';
import { CreateUserDto, IdentityDto, UserDto } from './interfaces/users.dto';
import { UnitOfWork } from 'src/infrastructure/dataAccess/UnitOfWork';
import { UserTag } from 'src/domain/model/user/UserTag.value';
import { UserName } from 'src/domain/model/user/UserName.value';
import { UserSurname } from 'src/domain/model/user/UserSurname.value';
import { UserPhone } from 'src/domain/model/user/UserPhone.value';
import { UserGender } from 'src/domain/model/user/UserGender.value';
import { User } from 'src/domain/model/user/User.aggregate';
import { UserId } from 'src/domain/model/user/UserId.value';
import { IdentitySalt } from 'src/domain/model/identity/IdentitySalt.value';
import { IdentityHash } from 'src/domain/model/identity/IdentityHash.value';
import { IdentityEmail } from 'src/domain/model/identity/IdentityEmail.value';
import { IdentityRepository } from 'src/infrastructure/dataAccess/repositories/Identity.repository';
import { Identity } from 'src/domain/model/identity/Identity.aggregate';

@Injectable()
export class UsersService {
  private readonly _logger: Logger;
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _userRepository: UserRepository,
    private readonly _identityRepository: IdentityRepository,
  ) {
    this._logger = new Logger(UsersService.name);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { _unitOfWork } = this;
    const {
      tag,
      name,
      surname,
      phone,
      gender,
      password,
      email,
    } = createUserDto;
    //User
    const userTag = UserTag.create(tag);
    const userName = UserName.create(name);
    const userSurname = UserSurname.create(surname);
    const userPhone = UserPhone.create(phone);
    const userGender = UserGender.create(gender);
    //Identity
    const identitySalt = IdentitySalt.generate();
    const identityHash = IdentityHash.generate(password, identitySalt);
    const identityEmail = IdentityEmail.create(email);
    try {
      await _unitOfWork.startTransaction();
      const user = await _unitOfWork.complete(async () => {
        const userRepository = _unitOfWork.getRepository(UserRepository);
        const identityRepository = _unitOfWork.getRepository(
          IdentityRepository,
        );
        const user = await userRepository.create(
          userTag,
          userName,
          userSurname,
          userPhone,
          userGender,
        );
        if (!user) throw new Error(`Error creating user: ${createUserDto}`);
        const identity = await identityRepository.create(
          identityEmail,
          identityHash,
          identitySalt,
          user.id,
        );
        if (!identity)
          throw new Error(`Error creating identity: ${createUserDto}`);
        return user;
      });
      return user;
    } catch (err) {
      this._logger.error(err);
      throw new Error(`User and Identity not created`);
    }
  }

  async getUserById(id: string): Promise<User> {
    const { _userRepository } = this;
    try {
      const userId = UserId.create(id);
      const user = await _userRepository.get(userId);
      return user;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error searching for user by id');
    }
  }

  async deleteUser(id: string): Promise<void> {
    const { _userRepository } = this;
    try {
      const userId = UserId.create(id);
      await _userRepository.delete(userId);
      return;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error deleting user');
    }
  }

  async updateUser(userDto: UserDto): Promise<User> {
    const { _userRepository } = this;
    try {
      const { id, name, surname, phone, gender, tag } = userDto;
      const user = User.create(id, tag, name, surname, phone, gender);
      const updatedUser = await _userRepository.update(user);
      return updatedUser;
    } catch (err) {
      this._logger.error(err);
      throw new Error('The user has not been updated');
    }
  }

  async updatePassword(userIdentityDto: IdentityDto): Promise<void> {
    const { _identityRepository } = this;
    try {
      const { email, password } = userIdentityDto;
      const identityEmail = IdentityEmail.create(email);
      const identity = await _identityRepository.get(identityEmail);
      if (!identity)
        throw new Error(`Identity with email: ${email} do not exist`);
      const newSalt = IdentitySalt.generate();
      identity.identitySalt = newSalt;
      identity.identityHash = IdentityHash.generate(password, newSalt);
      await _identityRepository.update(identity);
      return;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Failed to change');
    }
  }

  async getIdentityByEmail(email: string): Promise<Identity> {
    const { _identityRepository } = this;
    try {
      const identityEmail = IdentityEmail.create(email);
      const identity = await _identityRepository.get(identityEmail);
      return identity;
    } catch (err) {
      this._logger.error(err);
      throw new Error(`Error searching identity by email`);
    }
  }

  async getUserByIdentity(identityDto: IdentityDto): Promise<User> {
    const { email, password } = identityDto;
    try {
      const identity = await this.getIdentityByEmail(email);
      if (!identity) throw new Error(`Email does not exist ${identity}`);
      const { identitySalt, identityHash, userId } = identity;
      const hash = IdentityHash.generate(password, identitySalt);
      const isEqual = identityHash.equals(hash);
      if (!isEqual) throw new Error('Invalid password');
      const user = await this.getUserById(userId.id);
      return user;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
