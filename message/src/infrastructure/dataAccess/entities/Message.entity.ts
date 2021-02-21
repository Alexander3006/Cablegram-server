import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContentEntity } from './Content.entity';

@Entity({
  name: 'Messages',
})
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  author: string;

  @Column({
    nullable: false,
  })
  room: number;

  @OneToMany(
    () => ContentEntity,
    content => content.message,
  )
  contents: ContentEntity[];
}
