import { RoomGrantRolesEnum } from 'src/domain/model/roomGrant/RoomGrantRole.value';

export class CreateRoomGrantDto {
  author: string;
  delegat: string;
  room: number;
}

export class UpdateRoomGrantDto {
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

export class RoomGrantDto {
  id: number;
  author: string;
  delegat: string;
  room: number;
  role: RoomGrantRolesEnum;
}
