export class ContentId {
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static create(id: number): ContentId {
    if (!id) throw new Error('ContentId do not exist');
    return new ContentId(id);
  }
}
