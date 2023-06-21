import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { History } from 'src/histories/entities/history.entity';

interface GoalCondition {
  target: string;
  action: number;
  timeLimit: number;
}

interface GoalItem {
  type: number;
  condition: GoalCondition;
}

interface GoalSource {
  items: GoalItem[];
  detail: string;
}

interface NodeSource {
  name: number;
  sceneId: string;
  caption: string;
  options: object;
}

interface RoleSource {
  id: number;
  name: string;
  control: string[];
}

class CampGoal {
  red: GoalSource[];
  blue: GoalSource[];
}

class CampNode {
  red: NodeSource[];
  blue: NodeSource[];
}

class CampRole {
  red: RoleSource[];
  blue: RoleSource[];
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
    type: 'varchar',
    nullable: true,
    default: '',
    comment: '描述',
  })
  describe: string;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: { red: null, blue: null },
    comment: '目标',
  })
  goals: CampGoal;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: { red: null, blue: null },
    comment: '节点',
  })
  nodes: CampNode;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: { red: null, blue: null },
    comment: '角色',
  })
  roles: CampRole;

  @OneToMany(() => History, (history) => history.project)
  histories: History[];

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'startTime',
    comment: '开始时间',
  })
  startTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'finishTime',
    comment: '结束时间',
  })
  finishTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;
}

export { CampGoal, CampNode, CampRole };
