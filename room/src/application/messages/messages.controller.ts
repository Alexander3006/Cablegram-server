import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateMessageDto,
  MessageDto,
} from 'src/domain/interfaces/IMessageStorageService';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger: Logger;
  constructor(private readonly _messagesService: MessagesService) {
    this._logger = new Logger(MessagesController.name);
  }

  @MessagePattern({ cmd: 'send-message' })
  async sendMessage(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    try {
      const message = await this._messagesService.sendMessage(createMessageDto);
      return message;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
