import { Exclude } from 'class-transformer';
import { AgentRel } from 'src/agents/entities/agent-rel.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum OptionType {
  Object = 0,
  String = 1,
  Int = 2,
  Double = 3,
  Enum = 4,
  Boolean = 5,
  IntRange = 6,
  DoubleRange = 7,
}

interface StringValue {
  current: string;
}

interface NumberValue {
  min: number;
  max: number;
  current: number;
}

interface EnumValue {
  items: { key: number; caption: string };
  current: number;
}

interface BooleanValue {
  current: boolean;
}

interface NumberRangeValue {
  min: number;
  max: number;
  current: number[];
}

interface AgentOptionGroup {
  name: string;
  caption: string;
}

interface AgentOptionItem {
  name: string;
  caption: string;
  type: OptionType;
  group: string;
  condition: string;
  value: StringValue | NumberValue | EnumValue | BooleanValue | NumberRangeValue;
}

interface AgentOption {
  groups: AgentOptionGroup[];
  items: AgentOptionItem[];
}

@Entity()
export class Agent {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    comment: '标识符',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '默认名称',
    comment: '标题',
  })
  caption: string;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: [],
    comment: '配置项',
  })
  options: AgentOption[];

  @OneToMany(() => AgentRel, agentRel => agentRel.child)
  parentRels: AgentRel[];

  @OneToMany(() => AgentRel, agentRel => agentRel.parent)
  childRels: AgentRel[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;
}

export { AgentOption };
