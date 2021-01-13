import { IdentityEntity } from 'src/infrastructure/dataAccess/entities/Identity.entity';
import { EntityManager, EntityRepository } from 'typeorm';
import { IIdentityRepository } from 'src/domain/interfaces/repositories/IIdentityRepository';
import { Logger } from '@nestjs/common';
import { Identity } from 'src/domain/model/identity/Identity.aggregate';
import { IdentityEmail } from 'src/domain/model/identity/IdentityEmail.value';
import { IdentityHash } from 'src/domain/model/identity/IdentityHash.value';
import { IdentitySalt } from 'src/domain/model/identity/IdentitySalt.value';
import { UserId } from 'src/domain/model/user/UserId.value';
import { UserEntity } from '../entities/User.entity';
import { IdentityId } from 'src/domain/model/identity/IdentityId.value';

@EntityRepository(IdentityEntity)
export class IdentityRepository implements IIdentityRepository {
  private readonly _logger: Logger;
  constructor(private readonly _manager: EntityManager) {
    this._logger = new Logger(IdentityRepository.name);
  }

  async create(
    identityEmail: IdentityEmail,
    identityHash: IdentityHash,
    identitySalt: IdentitySalt,
    userId: UserId,
  ): Promise<Identity> {
    try {
      const identityEntity = new IdentityEntity();
      const userEntity = new UserEntity();
      userEntity.id = userId.id;
      identityEntity.user = userEntity;
      identityEntity.email = identityEmail.email;
      identityEntity.hash = identityHash.hash;
      identityEntity.salt = identitySalt.salt;
      const { id, user, email, hash, salt } = await this._manager.save(
        identityEntity,
      );
      return Identity.create(id, user.id, email, hash, salt);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error creating identity');
    }
  }

  async delete(identity: IdentityId): Promise<void> {
    try {
      const identityEntity = new IdentityEntity();
      identityEntity.id = identity.id;
      await this._manager.remove(identityEntity);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error deleting identity');
    }
  }

  async update(identity: Identity): Promise<Identity> {
    try {
      const {
        id: identityId,
        userId,
        identityEmail,
        identityHash,
        identitySalt,
      } = identity;
      const identityEntity = new IdentityEntity();
      const userEntity = new UserEntity();
      userEntity.id = userId.id;
      identityEntity.id = identityId.id;
      identityEntity.user = userEntity;
      identityEntity.email = identityEmail.email;
      identityEntity.hash = identityHash.hash;
      identityEntity.salt = identitySalt.salt;
      const { id, user, email, hash, salt } = await this._manager.save(
        identityEntity,
      );
      return Identity.create(id, user.id, email, hash, salt);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Identity update error');
    }
  }

  async get(options: IdentityEmail): Promise<Identity> {
    try {
      const { id, user, email, hash, salt } = await this._manager.findOne(
        IdentityEntity,
        {
          where: {
            email: options.email,
          },
        },
      );
      return Identity.create(id, user.id, email, hash, salt);
    } catch (err) {
      this._logger.error(err);
      throw new Error('Identity search error');
    }
  }
}
