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
  name: number;
  sceneId: string;
  caption: string;
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

  @Column({
    type: 'jsonb',
    nullable: false,
    comment: '红方脚本',
  })
  red: CampScript;

  @Column({
    type: 'jsonb',
    nullable: false,
    comment: '蓝方脚本',
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
