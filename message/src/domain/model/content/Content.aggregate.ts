import { Aggregate } from '../Aggregate';
import { ContentBody, ContentTypeEnum } from './ContentBody.value';
import { ContentId } from './ContentId.value';

export class Content extends Aggregate<ContentId> {
  public contentBody: ContentBody;

  private constructor(id: ContentId, body: ContentBody) {
    super(id);
    this.contentBody = body;
  }

  public static from(id: ContentId, body: ContentBody): Content {
    return new Content(id, body);
  }

  public static create(
    id: number,
    body: string,
    type: ContentTypeEnum,
  ): Content {
    const content = this.from(
      ContentId.create(id),
      ContentBody.create(body, type),
    );
    return content;
  }
}
