import { RoomGrantRolesEnum } from 'src/domain/model/roomGrant/RoomGrantRole.value';

export class createRoomGrantDto {
  author: string;
  delegat: string;
  room: number;
}

export class updateRoomGrantDto {
  author: string;
  delegat: string;
  room: number;
  role: RoomGrantRolesEnum;
}

export class DeleteRoomGrantDto {
  initiator: string;
  delegat: string;
  room: number;
}
