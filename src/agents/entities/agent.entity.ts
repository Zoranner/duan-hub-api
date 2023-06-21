import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum OptionType {
  Object = 0,
  String = 1,
  Int = 2,
  Double = 3,
  Enum = 4,
  Boolean = 5,
}

export enum AgentType {
  None = 0, //无
  System = 1, //系统
  Group = 2, //群组
  Entity = 3, //实体
  Equipment = 4, //装备
  Sensor = 5, //感知
}

interface StringOption {
  current: string;
}

interface IntOption {
  min: number;
  max: number;
  current: number;
}

interface DoubleOption {
  min: number;
  max: number;
  current: number;
}

interface EnumOption {
  items: { key: number; caption: string };
  current: number;
}

interface BooleanOption {
  current: boolean;
}

interface AgentOption {
  name: string;
  caption: string;
  category: string;
  type: OptionType;
  value: StringOption | IntOption | DoubleOption | EnumOption | BooleanOption;
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
    type: 'enum',
    enum: AgentType,
    nullable: false,
    default: AgentType.None,
    comment: '类型',
  })
  type: AgentType;

  @Column({
    type: 'jsonb',
    nullable: false,
    default: [],
    comment: '配置项',
  })
  options: AgentOption[];

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
