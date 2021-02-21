import { Module } from '@nestjs/common';
import { GrantsModule } from 'src/infrastructure/grantService/grants.module';
import { ConnectionsState } from './connectionsState.service';

@Module({
  imports: [GrantsModule],
  providers: [ConnectionsState],
  exports: [ConnectionsState],
})
export class ConnectionsModule {}
