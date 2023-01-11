import { IsEnum, IsNotEmpty } from 'class-validator';
import { HistoryState } from '../entities/history.entity';

export class CreateHistoryDto {
  @IsNotEmpty({ message: '标题为空' })
  caption: string;

  @IsEnum(HistoryState)
  state: HistoryState;

  @IsNotEmpty({ message: '仿真方案ID为空' })
  projectId: number;
}
