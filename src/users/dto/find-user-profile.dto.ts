import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserGender } from '../entities/user.entity';

export class FindUserProfileDto {
  @IsNotEmpty()
  username: string;

  @IsString()
  realname: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsDateString()
  signDate: Date;
}
