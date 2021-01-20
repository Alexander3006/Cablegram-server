import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateMessageDto,
  IMessageStorageService,
  MessageDto,
} from 'src/domain/interfaces/IMessageStorageService';

@Injectable()
export class MessageStorageService implements IMessageStorageService {
  private readonly _logger: Logger;
  constructor(
    @Inject('MESSAGE_MICROSERVICE')
    private readonly _messageMicroservice: ClientProxy,
  ) {
    this._logger = new Logger(MessageStorageService.name);
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    try {
      const message = await this._messageMicroservice
        .send({ cmd: 'create-message' }, createMessageDto)
        .toPromise();
      return message;
    } catch (err) {
      this._logger.error(err);
      return;
    }
  }
}
