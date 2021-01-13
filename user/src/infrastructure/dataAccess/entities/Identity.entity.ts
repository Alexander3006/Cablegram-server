import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity({
  name: 'Identities',
})
export class IdentityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  hash: string;

  @Column()
  salt: string;

  @OneToOne(
    () => UserEntity,
    user => user.id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: UserEntity;
}
