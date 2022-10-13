import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface GoalCondition {
  target: string;
  action: number;
  timeLimit: number;
}

interface CampGoal {
  type: number;
  condition: GoalCondition;
}

interface NodeOption {
  name: string;
  current: any;
}

interface CampNode {
  id: number;
  sceneId: string;
  name: string;
  options: NodeOption[];
}

interface CampRole {
  id: number;
  name: string;
  control: string[];
}

class CampScript {
  detail: string;
  goals: CampGoal[];
  nodes: CampNode[];
  roles: CampRole[];
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'json',
  })
  red: CampScript;

  @Column({
    type: 'json',
  })
  blue: CampScript;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;
}

export { GoalCondition, CampGoal, NodeOption, CampNode, CampRole, CampScript };
