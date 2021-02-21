import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IPermissionsService,
  PermissionsRequestDto,
} from 'src/domain/interfaces/IPermissionsService';

@Injectable()
export class PermissionsService implements IPermissionsService {
  private readonly _logger: Logger;
  constructor(
    @Inject('ROOM_MICROSERVICE')
    private readonly _roomMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(PermissionsService.name);
  }

  async canMessageSend(request: PermissionsRequestDto): Promise<boolean> {
    try {
      const permission = await this._roomMicroservice
        .send({ cmd: 'send-message-permission' }, request)
        .toPromise();
      return permission;
    } catch (err) {
      this._logger.error(err);
      return false;
    }
  }
}
