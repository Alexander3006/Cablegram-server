export class RoomId {
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static create(id: number): RoomId {
    if (!id) throw new Error('RoomId do not exist');
    return new RoomId(id);
  }
}
