import { Injectable, Logger } from '@nestjs/common';
import { RoomGrantsService } from '../roomGrants/grants.service';
import { PermissionRequestDto } from './permissions.dto';

@Injectable()
export class MessagePermissionsService {
  private readonly _logger: Logger;
  constructor(private readonly _roomGrantsService: RoomGrantsService) {
    this._logger = new Logger(MessagePermissionsService.name);
  }

  async canSendMessage(request: PermissionRequestDto): Promise<boolean> {
    try {
      const { author, room } = request;
      const grant = await this._roomGrantsService.getGrantByUserAndRoom(
        room,
        author,
      );
      return !!grant;
    } catch (err) {
      this._logger.error(err);
      return false;
    }
  }
}
