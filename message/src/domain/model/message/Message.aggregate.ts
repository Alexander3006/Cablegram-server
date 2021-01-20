import { Aggregate } from '../Aggregate';
import { RoomId } from './RoomId.value';
import { UserId } from './UserId.value';
import { Content } from '../content/Content.aggregate';
import { MessageId } from './MessageId.value';

export class Message extends Aggregate<MessageId> {
  public roomId: RoomId;
  public messageAuthor: UserId;
  public messageContent: Content[];

  private constructor(id: MessageId, room: RoomId, author: UserId) {
    super(id);
    this.messageAuthor = author;
    this.messageContent = [];
    this.roomId = room;
  }

  public static from(id: MessageId, room: RoomId, author: UserId): Message {
    return new Message(id, room, author);
  }

  public static create(id, userId, roomId): Message {
    const message = this.from(
      MessageId.create(id),
      RoomId.create(roomId),
      UserId.create(userId),
    );
    return message;
  }

  public addContent(content: Content): this {
    this.messageContent.push(content);
    return this;
  }

  public addContents(contents: Content[]): this {
    this.messageContent = [...this.messageContent, ...contents];
    return this;
  }
}
