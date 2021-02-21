import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from 'src/infrastructure/notification/notification.service';
import { messageToMessageDto } from 'src/tools/messages.mapper';
import { CreateMessageDto, MessageEvent } from './interfaces/messages.dto';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger: Logger;
  constructor(
    private readonly _messagesService: MessagesService,
    private readonly _notificationService: NotificationService,
  ) {
    this._logger = new Logger(MessagesController.name);
  }

  @MessagePattern({ cmd: 'create-message' })
  async createMessage(@Payload() createMessageDto: CreateMessageDto) {
    try {
      const message = await this._messagesService.createMessage(
        createMessageDto,
      );
      const messageDto = messageToMessageDto(message);
      await this._notificationService.notifyRoom(
        messageDto.room,
        MessageEvent.NewMessage,
        messageDto,
      );
      return messageDto;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
