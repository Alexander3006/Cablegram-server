import { ContentTypeEnum } from '../../../domain/model/content/ContentBody.value';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MessageEntity } from './Message.entity';

@Entity({
  name: 'Contents',
})
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ContentTypeEnum,
  })
  type: ContentTypeEnum;

  @Column({
    type: 'text',
  })
  body: string;

  @ManyToOne(
    () => MessageEntity,
    mes => mes.contents,
  )
  message: number;
}
