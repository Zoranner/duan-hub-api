import { IsNotEmpty } from 'class-validator';
import { AgentOption } from '../entities/agent.entity';

export class CreateAgentDto {
  @IsNotEmpty({ message: '标识符为空' })
  name: string;

  @IsNotEmpty({ message: '标题为空' })
  caption: string;

  @IsNotEmpty({ message: '配置项为空' })
  options: AgentOption;
}
