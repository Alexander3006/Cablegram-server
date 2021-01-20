import { ContentTypeEnum } from 'src/domain/model/content/ContentBody.value';

export class ContentDto {
  body: string;
  type: ContentTypeEnum;
}

export class CreateMessageDto {
  author: string;
  room: number;
  contents: ContentDto[];
}
