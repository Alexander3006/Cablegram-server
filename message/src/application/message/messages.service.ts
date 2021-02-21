import { Injectable, Logger } from '@nestjs/common';
import { PermissionsRequestDto } from 'src/domain/interfaces/IPermissionsService';
import { ContentBody } from 'src/domain/model/content/ContentBody.value';
import { Message } from 'src/domain/model/message/Message.aggregate';
import { RoomId } from 'src/domain/model/message/RoomId.value';
import { UserId } from 'src/domain/model/message/UserId.value';
import { MessageRepository } from 'src/infrastructure/dataAccess/repositories/Message.repository';
import { PermissionsService } from 'src/infrastructure/permissions/permissions.service';
import { ContentDto, CreateMessageDto } from './interfaces/messages.dto';

@Injectable()
export class MessagesService {
  private readonly _logger: Logger;
  constructor(
    private readonly _messageRepository: MessageRepository,
    private readonly _permissionsService: PermissionsService,
  ) {
    this._logger = new Logger(MessagesService.name);
  }

  async createMessage(messageDto: CreateMessageDto): Promise<Message> {
    try {
      const { author, room } = messageDto;
      const permissionsRequestDto = new PermissionsRequestDto(author, room);
      const permission = await this._permissionsService.canMessageSend(
        permissionsRequestDto,
      );
      if (!permission) throw new Error('Permission denied');
      const authorId = UserId.create(author);
      const roomId = RoomId.create(room);
      const contents = messageDto.contents.map(({ body, type }: ContentDto) => {
        return ContentBody.create(body, type);
      });
      const createdMessage = await this._messageRepository.create(
        roomId,
        authorId,
        contents,
      );
      return createdMessage;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error creating message');
    }
  }
}
