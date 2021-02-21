export class RoomDto {
  constructor(public id: number, public name: string, public tag: string) {}
}

export class CreateRoomDto {
  constructor(public name: string, public tag: string, public owner: string) {}
}

export class RoomGrantDto {
  constructor(
    public id: number,
    public author: string,
    public delegat: string,
    public room: number,
    public role: string,
  ) {}
}

export class CreateRoomGrantDto {
  constructor(
    public author: string,
    public delegat: string,
    public room: number,
  ) {}
}

export class UpdateRoomGrantDto {
  constructor(
    public author: string,
    public delegat: string,
    public room: number,
    public role: string,
  ) {}
}

export class DeleteRoomGrantDto {
  constructor(
    public initiator: string,
    public delegat: string,
    public room: number,
  ) {}
}

export interface IRoomsService {
  createRoom(room: CreateRoomDto): Promise<RoomDto>;
  createGrant(grant: CreateRoomGrantDto): Promise<RoomGrantDto>;
  updateGrant(grant: UpdateRoomGrantDto): Promise<RoomGrantDto>;
  deleteGrant(grant: DeleteRoomGrantDto): Promise<boolean>;
  getGrantsByDelegate(user: string): Promise<RoomGrantDto[]>;
}
