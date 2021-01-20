export enum ContentTypeEnum {
  TEXT = 'text',
  IMAGE = 'img',
  SOUND = 'sound',
  VIDEO = 'video',
}

export class ContentBody {
  public type: ContentTypeEnum;
  public body: string;

  private constructor(body: string, type: ContentTypeEnum) {
    this.body = body;
    this.type = type;
  }

  public static create(body: string, type: ContentTypeEnum): ContentBody {
    return new ContentBody(body, type);
  }
}
