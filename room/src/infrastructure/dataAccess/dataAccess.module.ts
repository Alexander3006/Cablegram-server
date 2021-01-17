import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/Room.entity';
import { RoomGrantEntity } from './entities/RoomGrant.entity';
import { RoomRepository } from './repositories/Room.repository';
import { RoomGrantRepository } from './repositories/RoomGrant.repository';
import { UnitOfWork } from './UnitOfWork';

const RoomRepositoryProvider: Provider = {
  provide: RoomRepository,
  useClass: RoomRepository,
};

const RoomGrantRepositoryProvider: Provider = {
  provide: RoomGrantRepository,
  useClass: RoomGrantRepository,
};

const repositories = [RoomRepositoryProvider, RoomGrantRepositoryProvider];

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, RoomGrantEntity])],
  providers: [UnitOfWork, ...repositories],
  exports: [UnitOfWork, ...repositories],
})
export class DataAccess {}
