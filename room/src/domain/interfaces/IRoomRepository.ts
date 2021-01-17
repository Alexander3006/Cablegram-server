import { Room } from '../model/room/Room.aggregate';
import { RoomName } from '../model/room/RoomName.value';
import { RoomTag } from '../model/room/RoomTag.value';

export interface IRoomRepository {
  create(roomName: RoomName, roomTag: RoomTag): Promise<Room>;
  update(room: Room): Promise<Room>;
}
