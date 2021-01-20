import { Message } from '../model/message/Message.aggregate';
import { RoomId } from '../model/message/RoomId.value';
import { UserId } from '../model/message/UserId.value';
import { ContentBody } from '../model/content/ContentBody.value';

export interface IMessageRepository {
  create(
    room: RoomId,
    author: UserId,
    contents: ContentBody[],
  ): Promise<Message>;
}
