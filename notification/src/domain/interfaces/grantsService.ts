export class RoomGrantDto {
  id: number;
  author: string;
  delegat: string;
  room: number;
  role: string;
}

export interface IGrantsService {
  getGrantsByClientId(clientId: string): Promise<RoomGrantDto[]>;
}
