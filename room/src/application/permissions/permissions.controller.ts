import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePermissionsService } from './messagePermissions.service';
import { PermissionRequestDto } from './permissions.dto';

@Controller()
export class PermissionsController {
  private readonly _logger: Logger;
  constructor(
    private readonly _messagePermissionsService: MessagePermissionsService,
  ) {
    this._logger = new Logger(PermissionsController.name);
  }

  @MessagePattern({ cmd: 'send-message-permission' })
  async getSendMessagePermission(
    request: PermissionRequestDto,
  ): Promise<boolean> {
    try {
      const permission = await this._messagePermissionsService.canSendMessage(
        request,
      );
      return permission;
    } catch (err) {
      this._logger.error(err);
      return false;
    }
  }
}
