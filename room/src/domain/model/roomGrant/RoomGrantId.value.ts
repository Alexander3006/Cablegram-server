export class RoomGrantId {
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static create(id: number): RoomGrantId {
    if (!id) throw new Error('RoomGrantId do not exist');
    return new RoomGrantId(id);
  }
}
