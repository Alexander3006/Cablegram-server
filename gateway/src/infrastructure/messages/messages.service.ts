import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SendMessageDto,
  MessageDto,
  IMessagesService,
} from 'src/interfaces/messagesService.interface';

@Injectable()
export class MessagesService implements IMessagesService {
  private readonly _logger: Logger;
  constructor(
    @Inject('MESSAGE_MICROSERVICE')
    private readonly _messagesMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(MessagesService.name);
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<MessageDto> {
    try {
      const message = await this._messagesMicroservice
        .send({ cmd: 'create-message' }, sendMessageDto)
        .toPromise();
      return message;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
