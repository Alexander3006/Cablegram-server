import { ContentTypeEnum } from 'src/domain/model/content/ContentBody.value';

export enum MessageEvent {
  NewMessage = 'new-message',
}

export class CreateContentDto {
  constructor(public body: string, public type: ContentTypeEnum) {}
}

export class ContentDto {
  constructor(
    public id: number,
    public body: string,
    public type: ContentTypeEnum,
  ) {}
}

export class CreateMessageDto {
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
