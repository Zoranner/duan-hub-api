import { Agent } from 'src/agents/entities/agent.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AgentRel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agent, agent => agent.parentRels, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  parent: Agent;

  @ManyToOne(() => Agent, agent => agent.childRels, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  child: Agent;
}
