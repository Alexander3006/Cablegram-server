import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entities/Content.entity';
import { MessageEntity } from './entities/Message.entity';
import { MessageRepository } from './repositories/Message.repository';

const MessageRepositoryProvider: Provider = {
  provide: MessageRepository,
  useClass: MessageRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ContentEntity])],
  providers: [MessageRepositoryProvider],
  exports: [MessageRepositoryProvider],
})
export class DataAccess {}
