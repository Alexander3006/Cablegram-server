import { Injectable, Logger } from '@nestjs/common';
import {
  CreateMessageDto,
  MessageDto,
} from 'src/domain/interfaces/IMessageStorageService';
import { MessageStorageService } from 'src/infrastructure/messageStorage/messageStorage.service';
import { RoomGrantsService } from '../roomGrants/grants.service';

@Injectable()
export class MessagesService {
  private readonly _logger: Logger;
  constructor(
    private readonly _grantService: RoomGrantsService,
    private readonly _messageStorate: MessageStorageService,
  ) {
    this._logger = new Logger(MessagesService.name);
  }

  async sendMessage(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    try {
      const { author, room } = createMessageDto;
      const grant = await this._grantService.getGrantByUserAndRoom(
        room,
        author,
      );
      if (!grant) throw new Error('Permission denied');
      const message = await this._messageStorate.createMessage(
        createMessageDto,
      );
      //NOTIFY API SEND IMPLEMENT
      return message;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error sending and creating message');
    }
  }
}
