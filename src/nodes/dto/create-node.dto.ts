import { IsNotEmpty } from 'class-validator';
import { NodeOption, NodeType } from '../entities/node.entity';

export class CreateNodeDto {
  @IsNotEmpty({ message: '标识符为空' })
  name: string;

  @IsNotEmpty({ message: '标题为空' })
  caption: string;

  @IsNotEmpty({ message: '类型为空' })
  type: NodeType;

  @IsNotEmpty({ message: '配置项为空' })
  options: NodeOption[];
}
