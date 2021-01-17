export class RoomName {
  public name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): RoomName {
    if (!name) throw new Error('Rooms name do not exist');
    if (!name.length) throw new Error('Rooms name is too short');
    return new RoomName(name);
  }
}
