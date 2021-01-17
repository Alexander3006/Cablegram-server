import { Aggregate } from '../Aggregate';
import { UserId } from './UserId.value';
import { RoomGrantId } from './RoomGrantId.value';
import { RoomId } from '../room/RoomId.value';
import { RoomGrantRole, RoomGrantRolesEnum } from './RoomGrantRole.value';

export class RoomGrant extends Aggregate<RoomGrantId> {
  public roomGrantAuthor: UserId;
  public roomId: RoomId;
  public roomGrantRole: RoomGrantRole;
  public roomGrantDelegat: UserId;

  private constructor(
    id: RoomGrantId,
    room: RoomId,
    author: UserId,
    delegat: UserId,
    role: RoomGrantRole,
  ) {
    super(id);
    this.roomGrantAuthor = author;
    this.roomGrantRole = role;
    this.roomId = room;
    this.roomGrantDelegat = delegat;
  }

  public static from(
    id: RoomGrantId,
    room: RoomId,
    author: UserId,
    delegat: UserId,
    role: RoomGrantRole,
  ): RoomGrant {
    return new RoomGrant(id, room, author, delegat, role);
  }

  public static create(
    id: number,
    room: number,
    author: string,
    delegat: string,
    role: RoomGrantRolesEnum,
  ): RoomGrant {
    return this.from(
      RoomGrantId.create(id),
      RoomId.create(room),
      UserId.create(author),
      UserId.create(delegat),
      RoomGrantRole.create(role),
    );
  }
}
