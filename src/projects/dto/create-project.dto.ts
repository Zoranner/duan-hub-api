import { IsNotEmpty } from 'class-validator';
import { CampScript } from '../entities/project.entity';

export class CreateProjectDto {
  @IsNotEmpty({ message: '标题为空' })
  caption: string;

  @IsNotEmpty({ message: '红方脚本为空' })
  red: CampScript;

  @IsNotEmpty({ message: '蓝方脚本为空' })
  blue: CampScript;
}
