export class MessageId {
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static create(id: number): MessageId {
    if (!id) throw new Error('MessageId do not exist');
    return new MessageId(id);
  }
}
