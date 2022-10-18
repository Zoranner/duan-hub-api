import { IsNotEmpty } from 'class-validator';

export class CreateNodeDto {
  @IsNotEmpty({ message: '标题为空' })
  name: string;
}
