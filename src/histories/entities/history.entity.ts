import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum HistoryState {
  Unknown = 0,
  NotStarted = 1,
  Waiting = 2,
  InProgress = 3,
  Finished = 4,
}

@Entity()
export class History {
  @PrimaryGeneratedColumn({
    comment: '唯一标识',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '标题',
  })
  caption: string;

  @ManyToOne(() => Project, (project) => project.histories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column({
    type: 'enum',
    enum: HistoryState,
    nullable: false,
    default: HistoryState.NotStarted,
    comment: '状态',
  })
  state: HistoryState;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;
  history: Promise<Project>;
}
