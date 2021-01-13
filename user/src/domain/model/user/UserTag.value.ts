export class UserTag {
  public tag: string;

  private constructor(tag: string) {
    this.tag = tag;
  }

  public static create(tag: string): UserTag {
    if (!tag) throw new Error('Tag is null or undefined');
    return new UserTag(tag);
  }
}
