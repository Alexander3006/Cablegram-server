import { Logger } from '@nestjs/common';
import { IMessageRepository } from 'src/domain/interfaces/IMessageRepository';
import { ContentBody } from 'src/domain/model/content/ContentBody.value';
import { Message } from 'src/domain/model/message/Message.aggregate';
import { RoomId } from 'src/domain/model/message/RoomId.value';
import { UserId } from 'src/domain/model/message/UserId.value';
import { EntityManager, EntityRepository } from 'typeorm';
import { ContentEntity } from '../entities/Content.entity';
import { MessageEntity } from '../entities/Message.entity';
import { Content } from 'src/domain/model/content/Content.aggregate';

@EntityRepository()
export class MessageRepository implements IMessageRepository {
  private readonly _logger: Logger;
  constructor(private readonly _manager: EntityManager) {
    this._logger = new Logger(MessageRepository.name);
  }

  async create(
    roomId: RoomId,
    authorId: UserId,
    contentBodies: ContentBody[],
  ): Promise<Message> {
    try {
      const message = await this._manager.transaction<Message>(
        async (manager: EntityManager) => {
          const messageEntity = new MessageEntity();
          messageEntity.room = roomId.id;
          messageEntity.author = authorId.id;
          const { id: messageId, author, room } = await manager.save(
            messageEntity,
          );
          const message = Message.create(messageId, author, room);
          const contents: Content[] = await Promise.all(
            contentBodies.map((content: ContentBody) => {
              const contentEntity = new ContentEntity();
              contentEntity.type = content.type;
              contentEntity.body = content.body;
              contentEntity.message = messageId;
              return manager.save(contentEntity);
            }),
          ).then((contentEntities: ContentEntity[]) => {
            const contents = contentEntities.map(
              (contentEntity: ContentEntity): Content => {
                const { id, body, type } = contentEntity;
                const content = Content.create(id, body, type);
                return content;
              },
            );
            return contents;
          });
          message.addContents(contents);
          return message;
        },
      );
      return message;
    } catch (err) {
      this._logger.error(err);
      throw new Error('Error creating message');
    }
  }
}
