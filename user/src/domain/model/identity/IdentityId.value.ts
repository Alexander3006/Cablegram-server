export class IdentityId {
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static create(id: number): IdentityId {
    return new IdentityId(id);
  }
}
