import { IsEnum, IsNotEmpty } from 'class-validator';
import { HistoryState } from '../entities/history.entity';

export class UpdateHistoryDto {
  @IsNotEmpty({ message: '标题为空' })
  caption: string;

  @IsEnum(HistoryState)
  state: HistoryState;
}
