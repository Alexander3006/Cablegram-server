export class RoomTag {
  tag: string;

  private constructor(tag: string) {
    this.tag = tag;
  }

  public static create(tag: string): RoomTag {
    if (!tag) throw new Error('Rooms tag do not exist');
    if (!tag.length) throw new Error('Rooms tag is too short');
    return new RoomTag(tag);
  }
}
