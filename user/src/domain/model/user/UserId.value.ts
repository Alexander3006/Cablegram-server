export class UserId {
  public id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static create(id: string): UserId {
    if (!id) throw new Error('User id do not exist');
    return new UserId(id);
  }
}
