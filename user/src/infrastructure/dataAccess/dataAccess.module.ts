import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity } from 'src/infrastructure/dataAccess/entities/Identity.entity';
import { UserEntity } from 'src/infrastructure/dataAccess/entities/User.entity';
import { UserRepository } from './repositories/User.repository';
import { IdentityRepository } from './repositories/Identity.repository';

import { UnitOfWork } from './UnitOfWork';

const UserRepositoryProvider: Provider = {
  provide: UserRepository,
  useClass: UserRepository,
};
const IdentityRepositoryProvider: Provider = {
  provide: IdentityRepository,
  useClass: IdentityRepository,
};

const repositories = [UserRepositoryProvider, IdentityRepositoryProvider];
@Module({
  imports: [TypeOrmModule.forFeature([IdentityEntity, UserEntity])],
  providers: [...repositories, UnitOfWork],
  exports: [...repositories, UnitOfWork],
})
export class DataAccess {}
