import { Project } from 'src/projects/entities/project.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class History {
  @PrimaryGeneratedColumn({
    comment: '唯一标识',
  })
  id: number;

  @Column()
  project: Project;
}
