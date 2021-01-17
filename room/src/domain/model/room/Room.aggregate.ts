import { Aggregate } from '../Aggregate';
import { RoomId } from './RoomId.value';
import { RoomName } from './RoomName.value';
import { RoomTag } from './RoomTag.value';

export class Room extends Aggregate<RoomId> {
  public roomName: RoomName;
  public roomTag: RoomTag;

  private constructor(id: RoomId, name: RoomName, tag: RoomTag) {
    super(id);
    this.roomName = name;
    this.roomTag = tag;
  }

  public static from(id: RoomId, name: RoomName, tag: RoomTag): Room {
    return new Room(id, name, tag);
  }

  public static create(id: number, name: string, tag: string): Room {
    return this.from(
      RoomId.create(id),
      RoomName.create(name),
      RoomTag.create(tag),
    );
  }
}
