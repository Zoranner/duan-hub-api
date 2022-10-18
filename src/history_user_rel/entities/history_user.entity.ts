import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class HistoryUserRel {
  @PrimaryGeneratedColumn({
    comment: '唯一标识',
  })
  id: number;

  @Column()
  project: Project;

  @Column()
  user: User;
}
