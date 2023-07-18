import { IsNotEmpty } from 'class-validator';
import { CampGoal, CampAgent, CampRole } from '../entities/project.entity';

export class CreateProjectDto {
  @IsNotEmpty({ message: '方案标题为空' })
  caption: string;

  @IsNotEmpty({ message: '方案描述为空' })
  describe: string;

  @IsNotEmpty({ message: '方案目标为空' })
  goals: CampGoal;

  @IsNotEmpty({ message: '方案智能体为空' })
  agents: CampAgent;

  @IsNotEmpty({ message: '方案角色为空' })
  roles: CampRole;

  @IsNotEmpty({ message: '环境变量为空' })
  environments: object;

  // @IsNotEmpty({ message: '红方脚本为空' })
  // red: CampScript;

  // @IsNotEmpty({ message: '蓝方脚本为空' })
  // blue: CampScript;
}
