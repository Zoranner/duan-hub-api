import { IsEnum, IsString } from 'class-validator';
import { UserGender } from '../entities/user.entity';

export class UpdateUserProfileDto {
  @IsString()
  realname: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
