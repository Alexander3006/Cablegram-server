import { UserGenderEnum } from '../../../domain/model/user/UserGender.value';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  tag: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  surname: string;

  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
  })
  gender: UserGenderEnum;
}
