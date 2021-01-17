import { RoomGrantDto } from 'src/application/roomGrants/interfaces/roomGrants.dto';
import { RoomDto } from 'src/application/rooms/interfaces/rooms.dto';
import { Room } from 'src/domain/model/room/Room.aggregate';
import { RoomGrant } from 'src/domain/model/roomGrant/RoomGrant.aggregate';

export const roomToRoomDto = (room: Room): RoomDto => {
  const { id, roomTag, roomName } = room;
  const roomDto = new RoomDto();
  roomDto.id = id.id;
  roomDto.name = roomName.name;
  roomDto.tag = roomTag.tag;
  return roomDto;
};

export const roomGrantToRoomGrantDto = (roomGrant: RoomGrant): RoomGrantDto => {
  const {
    id,
    roomGrantAuthor,
    roomGrantDelegat,
    roomGrantRole,
    roomId,
  } = roomGrant;
  const roomGrantDto = new RoomGrantDto();
  roomGrantDto.id = id.id;
  roomGrantDto.author = roomGrantAuthor.id;
  roomGrantDto.delegat = roomGrantDelegat.id;
  roomGrantDto.role = roomGrantRole.role;
  roomGrantDto.room = roomId.id;
  return roomGrantDto;
};
