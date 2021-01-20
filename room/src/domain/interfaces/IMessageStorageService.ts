export class CreateContentDto {
  body: string;
  type: string;
}

export class CreateMessageDto {
  author: string;
  room: number;
  contents: CreateContentDto[];
}

export class ContentDto {
  id: number;
  body: string;
  type: string;
}

export class MessageDto {
  id: number;
  author: string;
  room: number;
  contents: ContentDto[];
}

export interface IMessageStorageService {
  createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto>;
}
