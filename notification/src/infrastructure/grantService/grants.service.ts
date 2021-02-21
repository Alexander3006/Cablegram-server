import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IGrantsService,
  RoomGrantDto,
} from 'src/domain/interfaces/grantsService';

@Injectable()
export class GrantsService implements IGrantsService {
  private readonly _logger: Logger;
  constructor(
    @Inject('ROOMS_MICROSERVICE')
    private readonly _grantsMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(GrantsService.name);
  }

  async getGrantsByClientId(clientId: string): Promise<RoomGrantDto[]> {
    try {
      const grants = await this._grantsMicroservice
        .send({ cmd: 'get-grants-by-delegate' }, clientId)
        .toPromise();
      return grants;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
