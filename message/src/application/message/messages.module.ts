import { Module } from '@nestjs/common';
import { DataAccess } from 'src/infrastructure/dataAccess/dataAccess.module';

@Module({
  imports: [DataAccess],
  providers: [],
  controllers: [],
  exports: [],
})
export class MessagesModule {}
