import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContentEntity } from './Content.entity';

@Entity({
  name: 'Messages',
})
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  author: string;
  room: number;

  @OneToMany(
    () => ContentEntity,
    content => content.message,
  )
  contents: ContentEntity[];
}
