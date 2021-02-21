import { RoomGrant } from '../model/roomGrant/RoomGrant.aggregate';
import { RoomGrantId } from '../model/roomGrant/RoomGrantId.value';
import { RoomId } from '../model/room/RoomId.value';
import { RoomGrantRole } from '../model/roomGrant/RoomGrantRole.value';
import { UserId } from '../model/roomGrant/UserId.value';

export interface IRoomGrantRepository {
  create(
    roomId: RoomId,
    roomGrantAuthor: UserId,
    roomGrantRole: RoomGrantRole,
    roomGrantDelegat: UserId,
  ): Promise<RoomGrant>;
  delete(roomGrant: RoomGrantId): Promise<void>;
  update(roomGrant: RoomGrant): Promise<RoomGrant>;
  get(roomId: RoomId, delegatId: UserId): Promise<RoomGrant>;
  getAll(options: UserId): Promise<RoomGrant[]>;
}
