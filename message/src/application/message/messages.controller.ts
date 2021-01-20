import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from './interfaces/messages.dto';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  private readonly _logger: Logger;
  constructor(private readonly _messagesService: MessagesService) {
    this._logger = new Logger(MessagesController.name);
  }

  @MessagePattern({ cmd: 'create-message' })
  async createMessage(@Payload() createMessageDto: CreateMessageDto) {
    try {
      const message = await this._messagesService.createMessage(
        createMessageDto,
      );
      return message;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
