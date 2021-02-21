export class ContentDto {
  constructor(public id: number, public body: string, public type: string) {}
}

export class CreateContentDto {
  constructor(public body: string, public type: string) {}
}

export class SendMessageDto {
  constructor(
    public author: string,
    public room: number,
    public contents: CreateContentDto[],
  ) {}
}

export class MessageDto {
  constructor(
    public id: number,
    public author: string,
    public room: number,
    public contents: ContentDto[],
  ) {}
}

export interface IMessagesService {
  sendMessage(mes: SendMessageDto): Promise<MessageDto>;
}
