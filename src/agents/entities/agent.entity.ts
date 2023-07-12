import { Exclude } from 'class-transformer';
import { AgentRel } from 'src/agents/entities/agent-rel.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum OptionType {
  Object = 0,
  String = 1,
  Integer = 2,
  Double = 3,
  Enum = 4,
  Boolean = 5,
  IntRange = 6,
  DoubleRange = 7,
  FrequencyBand = 8,
}

interface DisplaySetting {
  unit: string;
  factor: number;
}

interface BaseOption {
  display: DisplaySetting;
}

interface StringValue extends BaseOption {
  current: string;
}

interface NumberValue extends BaseOption {
  min: number;
  max: number;
  current: number;
}

interface EnumValueItem {
  key: number;
  caption: string;
  options: { [key: string]: AgentOptionItem };
}

interface EnumValue extends BaseOption {
  items: { [key: number]: EnumValueItem };
  current: number;
}

interface BooleanValue extends BaseOption {
  current: boolean;
}

interface NumberRangeCurrent {
  min: number;
  max: number;
}

interface NumberRangeValue extends BaseOption {
  min: number;
  max: number;
  current: NumberRangeCurrent;
}

interface FrequencyBandCurrent {
  uplink: NumberRangeCurrent;
  downlink: NumberRangeCurrent;
}

interface FrequencyBandValue extends BaseOption {
  min: number;
  max: number;
  current: FrequencyBandCurrent;
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
  value: StringValue | NumberValue | EnumValue | BooleanValue | NumberRangeValue | FrequencyBandValue;
}

interface AgentOption {
  groups: { [key: string]: AgentOptionGroup };
  items: { [key: string]: AgentOptionItem };
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
    type: 'json',
    nullable: false,
    default: {},
    comment: '配置项',
  })
  options: AgentOption;

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
