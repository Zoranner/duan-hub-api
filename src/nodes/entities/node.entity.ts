import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Node {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    comment: '标题',
  })
  name: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;
}
