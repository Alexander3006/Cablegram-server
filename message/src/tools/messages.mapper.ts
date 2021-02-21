import { Message } from 'src/domain/model/message/Message.aggregate';
import {
  ContentDto,
  MessageDto,
} from '../application/message/interfaces/messages.dto';

export const messageToMessageDto = (message: Message): MessageDto => {
  const { id, messageAuthor, messageContent, roomId } = message;
  const contents = messageContent.map(content => {
    const {
      id,
      contentBody: { type, body },
    } = content;
    return new ContentDto(id.id, body, type);
  });
  const messageDto = new MessageDto(
    id.id,
    messageAuthor.id,
    roomId.id,
    contents,
  );
  return messageDto;
};
