import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Rooms',
})
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index({ unique: true })
  tag: string;

  @Column({ nullable: false })
  name: string;
}
