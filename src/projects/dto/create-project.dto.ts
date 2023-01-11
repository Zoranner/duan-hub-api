import { IsNotEmpty } from 'class-validator';
import { CampGoal, CampNode, CampRole } from '../entities/project.entity';

export class CreateProjectDto {
  @IsNotEmpty({ message: '方案标题为空' })
  caption: string;

  @IsNotEmpty({ message: '方案描述为空' })
  describe: string;

  @IsNotEmpty({ message: '方案目标为空' })
  goals: CampGoal;

  @IsNotEmpty({ message: '方案节点为空' })
  nodes: CampNode;

  @IsNotEmpty({ message: '方案角色为空' })
  roles: CampRole;

  // @IsNotEmpty({ message: '红方脚本为空' })
  // red: CampScript;

  // @IsNotEmpty({ message: '蓝方脚本为空' })
  // blue: CampScript;
}
