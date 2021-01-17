import { RoomGrantRolesEnum } from '../../../domain/model/roomGrant/RoomGrantRole.value';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './Room.entity';

@Entity({
  name: 'RoomGrants',
})
export class RoomGrantEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
  })
  role: RoomGrantRolesEnum;

  @Column({
    nullable: false,
  })
  delegat: string;

  @Column({
    nullable: false,
  })
  author: string;

  @ManyToOne(() => RoomEntity)
  room: RoomEntity;
}
