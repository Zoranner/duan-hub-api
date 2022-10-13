import { IsNotEmpty } from 'class-validator';
import { CampScript } from '../entities/project.entity';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  red: CampScript;

  @IsNotEmpty()
  blue: CampScript;
}
